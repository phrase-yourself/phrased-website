const currentScript = document.currentScript || document._currentScript
const doc = currentScript.ownerDocument
const templateElement = doc.getElementById('phrased-app-template')
const phrased = require('phrased')

const template = () => {
  return document.importNode(templateElement.content, true)
}

class PhrasedApp extends window.HTMLElement {
  constructor () {
    super()
    this.root = this.attachShadow({mode: 'open'})
    this.root.addEventListener('wordlist-selected', (evt) => {
      phrased.generate(evt.detail.name, 5).then((phrase) => {
        this.root.querySelector('phrased-phrase').innerHTML = phrase
      })
    })
  }

  connectedCallback () {
    this.root.appendChild(template())
  }
}

window.customElements.define('phrased-app', PhrasedApp)
