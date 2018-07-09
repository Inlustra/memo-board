import { combineReducers } from 'redux'
import { normalize } from 'normalizr'

import memosReducer, {
  selectHydrated as selectMemos,
  moduleName as memosModuleName,
} from './memos/memos.module'

export const moduleName = 'entities'

// Action Types
export const ADD_ENTITIES = moduleName + '/ADD_ENTITIES'

// Reducer
const entityReducer = combineReducers({
  [memosModuleName]: memosReducer,
})

// Selectors
export const getEntitiesState = state => state[moduleName]
export const getMemoEntity = (state, id) =>
  selectMemos(getEntitiesState(state), id)

// Actions

export const addEntities = (data, schema) => ({
  type: ADD_ENTITIES,
  payload: normalize(data, schema).entities,
})

export default entityReducer
