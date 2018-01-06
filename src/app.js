import '@webcomponents/webcomponentsjs'
import './components/phrased-passphrase/phrased-passphrase.js'
import './components/phrased-wordlists/phrased-wordlists.js'
import phrased from 'phrased'

window.addEventListener('WebComponentsReady', () => {
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
})
