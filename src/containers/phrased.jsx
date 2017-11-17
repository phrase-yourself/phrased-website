import React from 'react'
import {connect} from 'react-redux'

import PhrasedHeader from '../components/phrased/header.jsx'
import PhrasedSettings from '../components/phrased/settings.jsx'

const Phrased = ({phrase, settings}) => (
  <div className='phrased'>
    <PhrasedHeader phrase={phrase} />
    <PhrasedSettings settings={settings} />
  </div>
)

const languages = {
  en: 'English',
  de: 'Deutsch'
}

const mapSettings = (settings) => {
  return Object.assign(settings, {
    languages: settings.languages.map((shortCode) => {
      return {
        name: languages[shortCode],
        shortCode: shortCode
      }
    })
  })
}

const mapStateToProps = (state) => {
  console.log(state.currentPhrase)
  return {
    phrase: state.currentPhrase,
    settings: mapSettings(state.settings)
  }
}

export default connect(mapStateToProps)(Phrased)
