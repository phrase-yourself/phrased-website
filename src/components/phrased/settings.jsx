import React from 'react'

class PhrasedSettings extends React.Component {
  render () {
    return (
      <section className='settings'>
        <div className='row'>
          <div className='four columns'>
            <h4>Language</h4>
            <input className='u-full-width' value='English' type='button' />
            <input className='u-full-width button-primary' value='German' type='button' />
            <input className='u-full-width' value='Español' type='button' />
          </div>
          <div className='four columns'>
            <h4>Wordlist</h4>
            <input className='u-full-width' value='Goethe' type='button' />
            <input className='u-full-width' value='EFF Kurzwörter' type='button' />
            <input className='u-full-width' value='Marvel Universe' type='button' />
            <input className='u-full-width button-primary' value='Kafka' type='button' />
            <input className='u-full-width' value='Schimpwörter' type='button' />
          </div>
          <div className='four columns'>
            <h4>Settings</h4>
            <div className='u-full-width'>
              <label>Phrase Length</label>
              <input className='button-small button-primary' value='2' type='button' />
              <input className='button-small' value='3' type='button' />
              <input className='button-small' value='4' type='button' />
              <input className='button-small' value='5' type='button' />
              <input className='button-small' value='6' type='button' />
              <input className='button-small' value='7' type='button' />
            </div>
            <div className='u-full-width'>
              <label>Separator</label>
              <input className='button-small' value='.' type='button' />
              <input className='button-small' value=',' type='button' />
              <input className='button-small button-primary' value='" "' type='button' />
              <input className='button-small' value='_' type='button' />
            </div>
            <div className='u-full-width'>
              <label>Additions</label>
              <input className='button-small' value='Add Numbers' type='button' />
              <input className='button-small' value='Add Symbols' type='button' />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default PhrasedSettings
