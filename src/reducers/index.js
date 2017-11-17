import { combineReducers } from 'redux'
import * as Actions from '../actions'

const phraseReducer = (state = {}, _action) => state

const settingsReducer = (state = {}, _action) => state

const selectionReducer = (state = {}, action) => {
  switch (action.type) {
    case Actions.SWITCH_LANGUAGE:
      return Object.assign({}, state, {language: action.payload, wordlist: undefined})
    case Actions.SWITCH_WORDLIST:
      return Object.assign({}, state, {wordlist: action.payload})
    default:
      return state
  }
}

const rootReducer = combineReducers({
  currentPhrase: phraseReducer,
  settings: settingsReducer,
  selection: selectionReducer
})

export default rootReducer
