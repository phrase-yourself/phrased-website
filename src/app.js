import '@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'
import '@webcomponents/webcomponentsjs'

window.addEventListener('WebComponentsReady', () => {
  console.log('sad')

  const i18n = require('./i18n.js')
  const phrased = require('phrased')
  require('./components/phrased-passphrase/phrased-passphrase.js')
  require('./components/phrased-wordlists/phrased-wordlists.js')
  require('./components/language-picker/language-picker.js')

  function fillWordlists (wordlists, lang) {
    wordlists.innerHTML = ''
    phrased.wordlistsByLanguage(lang).forEach((wordlist) => {
      let list = document.createElement('phrased-wordlist-selector')
      list.setAttribute('wordlist-key', wordlist.key)
      list.innerHTML = wordlist.name
      wordlists.appendChild(list)
    })
  }

  let languagePicker = document.querySelector('language-picker')
  let passphrase = document.querySelector('phrased-passphrase')
  let wordlists = document.querySelector('phrased-wordlists')

  const currentLanguage = languagePicker.getAttribute('selection')
  fillWordlists(wordlists, currentLanguage)

  wordlists.addEventListener('selected', (wordlist) => {
    passphrase.pending = true
    phrased.generate(wordlist.detail.wordlist_key, 5).then((phrase) => {
      passphrase.pending = false
      passphrase.phrase = phrase
    })
  })

  i18n.translateDocument(document, currentLanguage)
  languagePicker.addEventListener('selected', (evt) => {
    const lang = evt.detail.key
    wordlists.setAttribute('language', lang)
    passphrase.setAttribute('language', lang)
    i18n.translateDocument(document, lang)
    fillWordlists(wordlists, lang)
  })
})
