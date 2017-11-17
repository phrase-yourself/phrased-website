import React from 'react'
import PropTypes from 'prop-types'

class Button extends React.Component {
  name () {
    const baseClass = this.props.small ? 'button-small' : 'u-full-width'
    const activeClass = this.props.active ? 'button-primary' : ''

    return `${baseClass} ${activeClass}`
  }

  onClick () {
    if (this.props.onClick) {
      return this.props.onClick(this.props.value || this.props.label)
    }
  }

  render () {
    return (
      <input
        className={this.name()}
        value={this.props.label}
        onClick={this.onClick.bind(this)}
        type='button' />
    )
  }
}

class PhrasedSettings extends React.Component {
  settings () {
    return this.props.settings
  }

  selection () {
    return this.props.selection
  }

  availableWordlists () {
    return this.settings().wordlists[this.selection().language]
  }

  switchLanguage (shortCode) {
    this.props.switchLanguage(shortCode)
  }

  switchWordlist (name) {
    this.props.switchWordlist(name)
  }

  isWordlistActive (i, wordlist) {
    if (this.selection().wordlist !== undefined) {
      return wordlist.name === this.selection().wordlist
    } else {
      return i === 0
    }
  }

  render () {
    return (
      <section className='settings'>
        <div className='row'>
          <div className='four columns'>
            <h4>Language</h4>
            {this.settings().languages.map((lang) =>
              <Button
                active={lang.shortCode === this.selection().language}
                label={lang.name}
                value={lang.shortCode}
                onClick={this.switchLanguage.bind(this)}
                key={lang.shortCode} />
            )}
          </div>
          <div className='four columns'>
            <h4>Wordlist</h4>
            {this.availableWordlists().map((wordlist, i) =>
              <Button
                active={this.isWordlistActive(i, wordlist)}
                label={wordlist.summary}
                value={wordlist.name}
                onClick={this.switchWordlist.bind(this)}
                key={wordlist.name} />
            )}
          </div>
          <div className='four columns'>
            <h4>Settings</h4>
            <div className='u-full-width'>
              <label>Phrase Length</label>
              <Button small label={2} />
              <Button small label={3} />
              <Button small label={4} />
              <Button small label={5} active />
              <Button small label={6} />
              <Button small label={7} />
            </div>
            <div className='u-full-width'>
              <label>Separator</label>
              <Button small label='.' />
              <Button small label=',' />
              <Button small label='" "' active />
              <Button small label='_' />
            </div>
            <div className='u-full-width'>
              <label>Additions</label>
              <Button small label='Add Numbers' />
              <Button small label='Add Symbols' />
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
