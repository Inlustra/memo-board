import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './containers/App'
import registerServiceWorker from './registerServiceWorker'
import setupStore from './store'
import { Provider } from 'react-redux'
import { InMemMemoService } from './common/services/MemoService/InMemMemoService'

const memoService = new InMemMemoService()

const dependencies = {
  memoService,
}

const store = setupStore(dependencies)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
)
registerServiceWorker()
