import React from 'react'
import PropTypes from 'prop-types'

const PhrasedHeader = ({phrase}) => (
  <section className='header'>
    <h2>Tired of boring passwords?</h2>
    <section className='main-input'>
      <input
        className='phrase u-full-width'
        placeholder={phrase}
        type='text' />
    </section>
  </section>
)

PhrasedHeader.propTypes = {
  phrase: PropTypes.string.isRequired
}

export default PhrasedHeader
