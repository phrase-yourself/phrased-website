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
    this.root.addEventListener('wordlist-selected', (evt) => {
      const selectedName = evt.detail.name
      this.selectedName = selectedName
      this.root.host.querySelectorAll('phrased-wordlist').forEach((e) => {
        e.deselect()
      })
      this.root.host.querySelector('phrased-wordlist[name=' + selectedName + ']').select()
    })
    phrased.wordlists().forEach((wordlist) => {
      let list = document.createElement('phrased-wordlist')
      list.setAttribute('name', wordlist.key)
      list.innerHTML = wordlist.name + ' (' + wordlist.languages.join(', ') + ')'
      this.root.host.appendChild(list)
    })
    this.root.host.querySelector('phrased-wordlist').triggerSelection()
  }

  set selectedName (value) {
    this.setAttribute('selected-name', value)
  }

  get selectedName () {
    return this.getAttribute('selected-name')
  }
}

window.customElements.define('phrased-wordlists', PhrasedWordlists)
