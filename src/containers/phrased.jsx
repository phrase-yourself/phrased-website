import React from 'react'
import {connect} from 'react-redux'
import { bindActionCreators } from 'redux'

import PhrasedHeader from '../components/phrased/header.jsx'
import PhrasedSettings from '../components/phrased/settings.jsx'
import * as PhrasedActions from '../actions/'

const Phrased = ({phrase, selection, settings, switchLanguage, switchWordlist}) => (
  <div className='phrased'>
    <PhrasedHeader phrase={phrase} />
    <PhrasedSettings selection={selection} settings={settings} switchLanguage={switchLanguage} switchWordlist={switchWordlist} />
  </div>
)

const languages = {
  en: 'English',
  de: 'Deutsch'
}

const mapSettings = (settings) => {
  return Object.assign({}, settings, {
    languages: settings.languages.map((shortCode) => {
      return {
        name: languages[shortCode],
        shortCode: shortCode
      }
    })
  })
}

const mapStateToProps = (state) => {
  return {
    phrase: state.currentPhrase,
    settings: mapSettings(state.settings),
    selection: state.selection
  }
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(PhrasedActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps, undefined, {pure: false})(Phrased)
