import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
  name () {
    const baseClass = this.props.small ? 'button-small' : 'u-full-width'
    const activeClass = this.props.active ? 'button-primary' : ''

    return `${baseClass} ${activeClass}`
  }
  render () {
    return (
      <input
        className={this.name()}
        value={this.props.value}
        type='button' />
    )
  }
}

class PhrasedSettings extends React.Component {
  settings () {
    return this.props.settings
  }

  availableWordlists () {
    return this.settings().wordlists[this.settings().selectedLanguage]
  }

  render () {
    return (
      <section className='settings'>
        <div className='row'>
          <div className='four columns'>
            <h4>Language</h4>
            {this.settings().languages.map((lang) =>
              <Button
                active={lang.shortCode === this.settings().selectedLanguage}
                value={lang.name}
                key={lang.shortCode} />
            )}
          </div>
          <div className='four columns'>
            <h4>Wordlist</h4>
            {this.availableWordlists().map((wordlist) =>
              <Button
                active={wordlist.name === this.settings().selectedWordlist}
                value={wordlist.summary}
                key={wordlist.name} />
            )}
          </div>
          <div className='four columns'>
            <h4>Settings</h4>
            <div className='u-full-width'>
              <label>Phrase Length</label>
              <Button small value={2} />
              <Button small value={3} />
              <Button small value={4} />
              <Button small value={5} active />
              <Button small value={6} />
              <Button small value={7} />
            </div>
            <div className='u-full-width'>
              <label>Separator</label>
              <Button small value='.' />
              <Button small value=',' />
              <Button small value='" "' active />
              <Button small value='_' />
            </div>
            <div className='u-full-width'>
              <label>Additions</label>
              <Button small value='Add Numbers' />
              <Button small value='Add Symbols' />
            </div>
          </div>
        </div>
      </section>
    )
  }
}

PhrasedSettings.propTypes = {
  settings: PropTypes.object.isRequired
}

export default PhrasedSettings
