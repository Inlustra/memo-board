import { applyMiddleware, combineReducers, createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { combineEpics, createEpicMiddleware } from 'redux-observable'

import memosReducer, {
  moduleName as memosModuleName,
  epics as memosEpics,
} from './modules/memos/memos.module'

const rootReducer = combineReducers({
  [memosModuleName]: memosReducer
})

// Epics

const epics = [...memosEpics]

// Setup Store

const setupStore = dependencies => {
  const epicMiddleware = createEpicMiddleware({ dependencies })
  const middleware = composeWithDevTools(applyMiddleware(epicMiddleware))
  const store = createStore(rootReducer, middleware)
  epicMiddleware.run(combineEpics(...epics))

  return store
}

export default setupStore
