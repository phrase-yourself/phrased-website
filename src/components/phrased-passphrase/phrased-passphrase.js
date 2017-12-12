let template = (phrase) => {
  return `
    <div class="phrased-passphrase-phrase">
      <span>${phrase}</span>
    </div>
  `
}

class PhrasedPassphrase extends window.HTMLElement {
  static get observedAttributes () {
    return ['phrase']
  }

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
  }

  attributeChangedCallback () {
    this.shadow.innerHTML = template(this.phrase)
  }

  set phrase (value) {
    this.setAttribute('phrase', value)
  }

  get phrase () {
    return this.getAttribute('phrase')
  }
}

window.customElements.define('phrased-passphrase', PhrasedPassphrase)
