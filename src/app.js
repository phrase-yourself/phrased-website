import '@webcomponents/webcomponentsjs'
import i18n from './i18n.js'
import './components/phrased-passphrase/phrased-passphrase.js'
import './components/phrased-wordlists/phrased-wordlists.js'
import './components/language-picker/language-picker.js'
import phrased from 'phrased'

window.addEventListener('WebComponentsReady', () => {
  let languagePicker = document.querySelector('language-picker')
  let passphrase = document.querySelector('phrased-passphrase')
  let wordlists = document.querySelector('phrased-wordlists')

  phrased.wordlists().forEach((wordlist) => {
    let list = document.createElement('phrased-wordlist-selector')
    list.setAttribute('wordlist-key', wordlist.key)
    list.innerHTML = wordlist.name
    wordlists.appendChild(list)
  })

  wordlists.addEventListener('selected', (wordlist) => {
    passphrase.pending = true
    phrased.generate(wordlist.detail.wordlist_key, 5).then((phrase) => {
      passphrase.pending = false
      passphrase.phrase = phrase
    })
  })

  i18n.translateDocument(document, languagePicker.getAttribute('selection'))
  languagePicker.addEventListener('selected', (language) => {
    const lang = language.detail.key
    wordlists.setAttribute('language', lang)
    passphrase.setAttribute('language', lang)
    i18n.translateDocument(document, lang)
  })
})
