const currentScript = document.currentScript || document._currentScript
const doc = currentScript.ownerDocument
const templateElement = doc.getElementById('phrased-wordlists-template')
const phrased = require('phrased')

const template = () => {
  return document.importNode(templateElement.content, true)
}

class PhrasedWordlists extends window.HTMLElement {
  constructor () {
    super()
    this.root = this.attachShadow({mode: 'open'})
  }

  connectedCallback () {
    this.root.appendChild(template())
    phrased.wordlists().forEach((wordlist) => {
	let list = document.createElement('phrased-wordlist')
	list.setAttribute('name', wordlist.key)
	list.innerHTML = wordlist.name + ' (' + wordlist.languages.join(', ') + ')'
	this.root.host.appendChild(list)
    })
  }
}

window.customElements.define('phrased-wordlists', PhrasedWordlists)
