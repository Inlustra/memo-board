import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import memoBoardReducer, {
  moduleName as memoBoardModuleName,
  epics as memoBoardEpics,
} from './containers/MemoBoard/MemoBoard.module'

import entitiesReducer, {
  moduleName as entitiesModuleName,
} from './modules/entities/entities.module'

const rootReducer = combineReducers({
  [entitiesModuleName]: entitiesReducer,
  [memoBoardModuleName]: memoBoardReducer,
})

// Epics

const epics = [
  ...memoBoardEpics
]

// Setup Store

const setupStore = dependencies => {
  const epicMiddleware = createEpicMiddleware()
  epicMiddleware.run(combineEpics(...epics), dependencies)

  const middleware = composeWithDevTools(applyMiddleware(epicMiddleware))

  return createStore(rootReducer, middleware)
}

export default setupStore
