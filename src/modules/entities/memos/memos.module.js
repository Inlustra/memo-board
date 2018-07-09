import { denormalize, schema } from 'normalizr'
import { ADD_ENTITIES } from '../entities.module'

export const moduleName = 'memos'

const reducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_ENTITIES:
      return Object.entries(action.payload.memos).reduce(
        (mergedMemos, [id, memo]) => {
          return {
            ...mergedMemos,
            [id]: {
              ...(mergedMemos[id] || {}),
              ...memo,
            },
          }
        },
        state,
      )
    default:
      return state
  }
}

export const selectHydrated = (state, id) =>
  denormalize(id, new schema.Entity(moduleName), state)

export default reducer
