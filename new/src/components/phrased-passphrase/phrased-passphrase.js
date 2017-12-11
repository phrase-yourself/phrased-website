let template = () => {
  return `
    <style>
      phrased-passphrase {
        text-align: center;
        font-size: 2em;
      }

      phrased-passphrase span {
        border-bottom: 1px solid lightblue;
        padding: 0.1em 0;
      }
    </style>
    <div class="phrased-passphrase-phrase">
      <span>
        zieren wirke herab plump lassen lampe stift 286
      </span>
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
