import React from 'react'
import ReactDOM from 'react-dom'
import {createStore} from 'redux'
import {Provider} from 'react-redux'

import Phrased from './containers/phrased.jsx'

const store = createStore(() => {
  return {
    currentPhrase: 'prosit moor hemd august nadeln',
    settings: {
      selectedLanguage: 'de',
      selectedWordlist: 'lord-of-the-rings',
      languages: [
        'de',
        'en'
      ],
      wordlists: {
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
      }
    }
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
