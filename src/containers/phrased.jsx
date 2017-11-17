import React from 'react'
import {connect} from 'react-redux'

import PhrasedHeader from '../components/phrased/header.jsx'
import PhrasedSettings from '../components/phrased/settings.jsx'

const Phrased = ({phrase}) => (
  <div className='phrased'>
    <PhrasedHeader phrase={phrase} />
    <PhrasedSettings />
  </div>
)

const mapStateToProps = (state) => {
  console.log(state.currentPhrase)
  return {
    phrase: state.currentPhrase
  }
}

export default connect(mapStateToProps)(Phrased)
