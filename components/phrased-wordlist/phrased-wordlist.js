const currentScript = document.currentScript || document._currentScript
const doc = currentScript.ownerDocument
const templateElement = doc.getElementById('phrased-wordlist-template')

const template = (node) => {
  return templateElement.innerHTML
}

class PhrasedWordlist extends window.HTMLElement {
  static get observedAttributes () {
    return ['selected', 'name']
  }

  constructor () {
    super()
    this.root = this.attachShadow({mode: 'open'})
  }

  connectedCallback () {
    this.render()
    this.root.addEventListener('click', (evt) => {
      evt.preventDefault()
      this.triggerSelection()
    })
  }

  attributeChangedCallback () {
    this.render()
  }

  render () {
    if (this.root.innerHTML === '') {
      this.root.innerHTML = template(this)
    }
    const e = this.root.querySelector('.phrased-wordlist')
    e.setAttribute('name', this.name)
    if (this.selected) {
      e.setAttribute('selected', '')
    } else {
      e.removeAttribute('selected')
    }
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

  select () {
    this.selected = true
  }

  deselect () {
    this.selected = false
  }

  set selected (value) {
    if (value) {
      this.setAttribute('selected', '')
    } else {
      this.removeAttribute('selected')
    }
  }

  get selected () {
    return this.hasAttribute('selected')
  }

  set name (value) {
    this.setAttribute('name', value)
  }

  get name () {
    return this.getAttribute('name')
  }
}

window.customElements.define('phrased-wordlist', PhrasedWordlist)
