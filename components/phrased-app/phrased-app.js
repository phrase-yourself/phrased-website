const currentScript = document.currentScript || document._currentScript
const doc = currentScript.ownerDocument
const templateElement = doc.getElementById('template')

const template = () => {
  return document.importNode(templateElement.content, true)
}

class PhrasedApp extends window.HTMLElement {
  constructor () {
    super()
    this.root = this.attachShadow({mode: 'open'})
  }

  connectedCallback () {
    this.root.appendChild(template())
  }
}

window.customElements.define('phrased-app', PhrasedApp)
