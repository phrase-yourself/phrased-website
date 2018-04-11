const currentScript = document.currentScript || document._currentScript
const doc = currentScript.ownerDocument
const templateElement = doc.getElementById('phrased-wordlist-template')

const template = () => {
  return document.importNode(templateElement.content, true)
}

class PhrasedWordlist extends window.HTMLElement {
  constructor () {
    super()
    this.root = this.attachShadow({mode: 'open'})
  }

  connectedCallback () {
    this.root.appendChild(template())
  }
}

window.customElements.define('phrased-wordlist', PhrasedWordlist)
