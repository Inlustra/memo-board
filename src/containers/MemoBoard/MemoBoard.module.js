export const moduleName = 'memoBoard'

// Action Names
const EDIT_MEMO = 'pages/board/EDIT_MEMO'

// Reducer
const initState = {
  error: null,
  editedTitle: null,
  editedBody: null,
  editedId: null,
}

const reducer = (state = initState, action) => {
  switch (action.type) {
    case EDIT_MEMO:
      return state
    default:
      return state
  }
}

// Selectors

export const getState = state => state[moduleName]

// Actions

export const editMemo = id => ({
  type: EDIT_MEMO,
  payload: { id },
})

// Epics 

export const epics = [];

export default reducer;