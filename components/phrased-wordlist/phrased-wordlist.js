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
    this.root.addEventListener('click', (evt) => {
      evt.preventDefault()
      this.triggerSelection()
    })
  }

  triggerSelection () {
    this.dispatchEvent(new window.CustomEvent(
      'wordlist-selected',
      {
        bubbles: true,
        detail: {name: this.name}
      }
    ))
  }

  set name (value) {
    this.setAttribute('name', value)
  }

  get name () {
    return this.getAttribute('name')
  }
}

window.customElements.define('phrased-wordlist', PhrasedWordlist)
