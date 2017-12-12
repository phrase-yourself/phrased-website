let template = () => {
  return `
    <div class="phrased-passphrase-phrase">
      <span>zieren wirke herab plump lassen lampe stift 286</span>
    </div>
  `
}

class PhrasedPassphrase extends window.HTMLElement {
  constructor () {
    super()
    let shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = template()
  }
}

window.customElements.define('phrased-passphrase', PhrasedPassphrase)
