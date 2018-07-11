import { createSelector } from 'reselect'
import { of } from 'rxjs'
import { switchMap, flatMap, map, catchError } from 'rxjs/operators'

export const moduleName = 'memos'

// Action Types

export const LOAD_REQUEST = 'memo-board/memos/LOAD_REQUEST'
export const LOAD_SUCCESS = 'memo-board/memos/LOAD_SUCCESS'
export const LOAD_ERROR = 'memo-board/memos/LOAD_ERROR'

export const CREATE_REQUEST = 'memo-board/memos/CREATE_REQUEST'
export const CREATE_SUCCESS = 'memo-board/memos/CREATE_SUCCESS'
export const CREATE_ERROR = 'memo-board/memos/CREATE_ERROR'

export const UPDATE_REQUEST = 'memo-board/memos/UPDATE_REQUEST'
export const UPDATE_SUCCESS = 'memo-board/memos/UPDATE_SUCCESS'
export const UPDATE_ERROR = 'memo-board/memos/UPDATE_ERROR'

export const DELETE_REQUEST = 'memo-board/memos/DELETE_REQUEST'
export const DELETE_SUCCESS = 'memo-board/memos/DELETE_SUCCESS'
export const DELETE_ERROR = 'memo-board/memos/DELETE_ERROR'

export const CLEAR_ERRORS = 'memo-board/memos/CLEAR_ERRORS'

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
      const memoIdx = state.memos.findIndex(
        memo => memo.id === action.payload.id,
      )
      return memoIdx === -1
        ? {
            ...state,
            error: { message: 'Attempted to update a memo that was not found' },
          }
        : {
            ...state,
            memos: Object.assign([], state.memos, {
              [memoIdx]: { ...state.memos[memoIdx], ...action.payload },
            }),
          }
    }
    case DELETE_SUCCESS:
      const memoIdx = state.memos.findIndex(memo => memo.id === action.payload)
      return memoIdx === -1
        ? state
        : {
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
      return {
        ...state,
        error: action.payload,
        loading: { ...state.loading, load: false },
      }

    case UPDATE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: { ...state.loading, update: false },
      }

    case DELETE_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: { ...state.loading, delete: false },
      }
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
export const updateError = error => ({ type: UPDATE_ERROR, payload: error })

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
    flatMap(() =>
      memoService.createMemo().pipe(
        map(memo => createSuccess(memo)),
        catchError(error => of(createError(error))),
      ),
    ),
  )

export const updateRequest$ = (action$, _, { memoService }) =>
  action$.ofType(UPDATE_REQUEST).pipe(
    map(action => action.payload),
    flatMap(memo =>
      memoService.updateMemo(memo).pipe(
        map(updatedMemo => updateSuccess(updatedMemo)),
        catchError(error => of(updateError(error))),
      ),
    ),
  )

export const deleteRequest$ = (action$, _, { memoService }) =>
  action$.ofType(DELETE_REQUEST).pipe(
    map(action => action.payload),
    flatMap(id =>
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
