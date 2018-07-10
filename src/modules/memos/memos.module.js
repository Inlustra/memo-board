import { createSelector } from 'reselect'
import { of } from 'rxjs'
import { switchMap, map, catchError, tap } from 'rxjs/operators'

export const moduleName = 'memos'

// Action Types

const LOAD_REQUEST = 'memo-board/memos/LOAD_REQUEST'
const LOAD_SUCCESS = 'memo-board/memos/LOAD_SUCCESS'
const LOAD_ERROR = 'memo-board/memos/LOAD_ERROR'

const CREATE_REQUEST = 'memo-board/memos/CREATE_REQUEST'
const CREATE_SUCCESS = 'memo-board/memos/CREATE_SUCCESS'
const CREATE_ERROR = 'memo-board/memos/CREATE_ERROR'

const UPDATE_REQUEST = 'memo-board/memos/UPDATE_REQUEST'
const UPDATE_SUCCESS = 'memo-board/memos/UPDATE_SUCCESS'
const UPDATE_ERROR = 'memo-board/memos/UPDATE_ERROR'

const DELETE_REQUEST = 'memo-board/memos/DELETE_REQUEST'
const DELETE_SUCCESS = 'memo-board/memos/DELETE_SUCCESS'
const DELETE_ERROR = 'memo-board/memos/DELETE_ERROR'

const CLEAR_ERRORS = 'memo-board/memos/CLEAR_ERRORS'

// Reducer

const initState = {
  loading: {
    load: false,
    create: false,
    update: false,
    delete: false,
  },
  memos: [],
  error: null,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case LOAD_SUCCESS:
      return {
        ...state,
        memos: action.payload,
      }
    case CREATE_REQUEST:
      return {
        ...state,
        loading: { ...state.loading, create: true },
      }
    case CREATE_SUCCESS:
      return {
        ...state,
        memos: [...state.memos, action.payload],
        loading: { ...state.loading, create: false },
      }
    case UPDATE_SUCCESS: {
      const memoIdx = state.memos.findIndex(memo => memo.id === action.payload.id)
      return {
        ...state,
        memos: Object.assign([], state.memos, { [memoIdx]: action.payload }),
      }
    }
    case DELETE_SUCCESS:
      const memoIdx = state.memos.findIndex(memo => memo.id === action.payload)
      return {
        ...state,
        memos: [
          ...state.memos.slice(0, memoIdx),
          ...state.memos.slice(memoIdx + 1),
        ],
      }
    case CLEAR_ERRORS:
      return { ...state, error: null }
    case CREATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: { ...state.loading, create: false },
      }
    case LOAD_ERROR:
    case UPDATE_ERROR:
    case DELETE_ERROR:
      return { ...state, error: action.payload }
    default:
      return state
  }
}

// Selectors

export const getState = state => state[moduleName]
export const getMemos = createSelector(getState, state => state.memos)
export const getError = createSelector(getState, state => state.error)
export const isLoadingCreate = createSelector(
  getState,
  state => state.loading.create,
)
// Actions

export const loadRequest = () => ({ type: LOAD_REQUEST })
export const loadSuccess = memos => ({ type: LOAD_SUCCESS, payload: memos })
export const loadError = error => ({ type: LOAD_ERROR, payload: error })

export const createRequest = () => ({ type: CREATE_REQUEST })
export const createSuccess = memo => ({ type: CREATE_SUCCESS, payload: memo })
export const createError = error => ({ type: CREATE_ERROR, payload: error })

export const updateRequest = memo => ({ type: UPDATE_REQUEST, payload: memo })
export const updateSuccess = memo => ({ type: UPDATE_SUCCESS, payload: memo })
export const updateError = error => ({ type: UPDATE_REQUEST, payload: error })

export const deleteRequest = id => ({ type: DELETE_REQUEST, payload: id })
export const deleteSuccess = id => ({ type: DELETE_SUCCESS, payload: id })
export const deleteError = error => ({ type: DELETE_ERROR, payload: error })

export const clearErrors = () => ({ tyoe: CLEAR_ERRORS })

// Epics

export const loadRequest$ = (action$, _, deps) => {
  console.log(deps)
  return action$.ofType(LOAD_REQUEST).pipe(
    switchMap(() =>
      deps.memoService.getMemos().pipe(
        map(memos => loadSuccess(memos)),
        catchError(error => of(loadError(error))),
      ),
    ),
  )
}

export const createRequest$ = (action$, _, { memoService }) =>
  action$.ofType(CREATE_REQUEST).pipe(
    switchMap(() =>
      memoService.createMemo().pipe(
        map(memo => createSuccess(memo)),
        catchError(error => of(createError(error))),
      ),
    ),
  )

export const updateRequest$ = (action$, _, { memoService }) =>
  action$.ofType(UPDATE_REQUEST).pipe(
    map(action => action.payload),
    switchMap(memo =>
      memoService.updateMemo(memo).pipe(
        map(updatedMemo => updateSuccess(updatedMemo)),
        catchError(error => of(updateError(error))),
      ),
    ),
  )

export const deleteRequest$ = (action$, _, { memoService }) =>
  action$.ofType(DELETE_REQUEST).pipe(
    map(action => action.payload),
    switchMap(id =>
      memoService.deleteMemo(id).pipe(
        map(() => deleteSuccess(id)),
        catchError(error => of(deleteError(error))),
      ),
    ),
  )

export const epics = [
  loadRequest$,
  createRequest$,
  updateRequest$,
  deleteRequest$,
]

export default reducer
