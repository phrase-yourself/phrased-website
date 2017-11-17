import crypto from 'crypto'

import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import Phrased from './containers/phrased.jsx'
import reducer from './reducers'
import {generatePhrase, newPhrase} from './actions'

const phrased = {
  languages: () => (
    [ 'de', 'en' ]
  ),

  wordlists: () => ({
    'en': [
      {
        language: 'en',
        name: 'shakespear',
        summary: 'Best of Shakespear'
      },
      {
        language: 'en',
        name: 'marvel',
        summary: 'Marvel Universe'
      },
      {
        language: 'en',
        name: 'lord-of-the-rings',
        summary: 'Lord of the Rings'
      },
      {
        language: 'en',
        name: 'eff-shortlist',
        summary: 'EFF: Short Words'
      },
      {
        language: 'en',
        name: 'diceware',
        summary: 'Original Diceware'
      }
    ],
    'de': [
      {
        language: 'de',
        name: 'goethe',
        summary: 'Goethes Werke'
      },
      {
        language: 'de',
        name: 'lord-of-the-rings',
        summary: 'Herr der Ringe'
      },
      {
        language: 'de',
        name: 'eff-shortlist',
        summary: 'EFF: Kurze Wörter'
      },
      {
        language: 'de',
        name: 'diceware',
        summary: 'Original Diceware'
      }
    ]
  }),

  generate: (language, wordlist, callback) => {
    crypto.randomBytes(10, (err, buffer) => {
      if (err) {
        callback(err)
      } else {
        callback(false, buffer.toString('hex'))
      }
    })
  }
}

const initialState = {
  currentPhrase: 'prosit moor hemd august nadeln',
  selection: {
    language: 'de'
  },
  settings: {
    languages: phrased.languages(),
    wordlists: phrased.wordlists()
  }
}

const store = createStore(
  reducer,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

let currentSelection
function handleChange () {
  let previousSelection = currentSelection
  currentSelection = store.getState().selection

  if (currentSelection !== previousSelection) {
    store.dispatch(generatePhrase(currentSelection.language, currentSelection.wordlist))
    phrased.generate(currentSelection.language, currentSelection.wordlist, (err, phrase) => {
      if (err) throw err
      store.dispatch(newPhrase(phrase))
    })
  }
}
store.subscribe(handleChange)

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Phrased />
    </Provider>,
    document.getElementById('app')
  )
})
