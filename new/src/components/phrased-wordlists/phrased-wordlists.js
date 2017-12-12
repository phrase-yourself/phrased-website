let applyTemplate = (list, template) => {
  return list.map((element) => template(element)).join('')
}

let wordlistLink = (wordlist) => {
  let className = wordlist.active ? 'selected' : ''
  return `
    <li class="${className}">
      <a
        class="wordlist-selector"
        href="#"
        wordlist-key="${wordlist.key}">
        ${wordlist.name}
      </a>
    </li>`
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
      {key: 'eff-shortlist', name: 'EFF Shortlist'},
      {key: 'lord-of-the-rings', name: 'Lord of the Rings', active: true},
      {key: 'original-diceware', name: 'Original Diceware'},
      {key: 'animals', name: 'Animals'}
    ])
    shadow.querySelectorAll('a.wordlist-selector').forEach((a) => {
      a.addEventListener('click', (evt) => {
        let event = new CustomEvent(
          'WordlistSelected',
          {detail: {key: a.getAttribute('wordlist-key')}}
        )
        console.log(a, event)
        this.dispatchEvent(event)
        evt.preventDefault()
      })
    })
  }
}

window.customElements.define('phrased-wordlists', PhrasedWordlists)

