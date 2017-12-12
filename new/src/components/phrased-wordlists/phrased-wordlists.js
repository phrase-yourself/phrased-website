let applyTemplate = (list, template) => {
  return list.map((element) => template(element)).join('')
}

let wordlistLink = (wordlist) => {
  let className = wordlist.active ? 'selected' : ''
  return `<li class="${className}"><a href="#">${wordlist.name}</a></li>`
}

let template = (wordlists) => {
  return `
    <ul>
      ${applyTemplate(wordlists, wordlistLink)}
    </ul>
  `
}

class PhrasedWordlists extends window.HTMLElement {
  constructor () {
    super()
    let shadow = this.attachShadow({mode: 'open'})
    shadow.innerHTML = template([
      {name: 'EFF Shortlist'},
      {name: 'Lord of the Rings', active: true},
      {name: 'Original Diceware'},
      {name: 'Animals'}
    ])
  }
}

window.customElements.define('phrased-wordlists', PhrasedWordlists)

