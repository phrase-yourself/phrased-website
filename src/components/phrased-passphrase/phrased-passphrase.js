let template = (phrase, isPending) => {
  const spanClass = isPending === true ? 'phrased-passphrase-pending' : ''
  return `
    <div class="phrased-passphrase-phrase">
      <span class="${spanClass}">${phrase}</span>
    </div>
  `
}

class PhrasedPassphrase extends window.HTMLElement {
  static get observedAttributes () {
    return ['phrase', 'pending']
  }

  constructor () {
    super()
    this.phrase = 'generating new passphrase'
    this.pending = true
    this.shadow = this.attachShadow({mode: 'open'})
    this.renderPhrase()
  }

  attributeChangedCallback () {
    this.renderPhrase()
  }

  set phrase (value) {
    this.setAttribute('phrase', value)
  }

  get phrase () {
    return this.getAttribute('phrase')
  }

  set pending (value) {
    if (value) {
      this.setAttribute('pending', '')
    } else {
      this.removeAttribute('pending')
    }
  }

  get pending () {
    return this.hasAttribute('pending')
  }

  renderPhrase () {
    this.shadow.innerHTML = template(this.phrase, this.pending)
  }
}

window.customElements.define('phrased-passphrase', PhrasedPassphrase)
