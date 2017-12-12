import '@webcomponents/webcomponentsjs'
import './components/phrased-passphrase/phrased-passphrase.js'
import './components/phrased-wordlists/phrased-wordlists.js'

window.addEventListener('WebComponentsReady', () => {
  let passphrase = document.querySelector('phrased-passphrase')
  let wordlists = document.querySelector('phrased-wordlists')

  wordlists.addEventListener('WordlistSelected', (wordlist) => {
    console.log(wordlist.detail.key)
  })
})
