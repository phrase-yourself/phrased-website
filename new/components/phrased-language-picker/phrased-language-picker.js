class PhrasedLanguagePicker extends window.HTMLElement {
  constructor () {
    super()
    let shadow = this.attachShadow({mode: 'open'})
    let template = document.getElementById('phrased-language-picker')
    let content = document.importNode(template.content, true)
    shadow.appendChild(content)
  }
}

window.customElements.define('phrased-language-picker', PhrasedLanguagePicker)

