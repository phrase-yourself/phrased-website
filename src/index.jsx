import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import Phrased from './containers/phrased.jsx'

const store = createStore(() => {
  return {
    currentPhrase: 'prosit moor hemd august nadeln'
  }
})

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Phrased />
    </Provider>,
    document.getElementById('app')
  )
})
