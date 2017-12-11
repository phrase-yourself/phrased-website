class Passphrase extends window.HTMLElement {
  constructor () {
    super()
    let shadow = this.attachShadow({mode: 'open'})
    let template = document.getElementById('phrased-passphrase')
    let content = document.importNode(template.content, true)
    shadow.appendChild(content)
    console.log('passphrase, yo!')
  }
}

window.customElements.define('phrased-passphrase', Passphrase)
