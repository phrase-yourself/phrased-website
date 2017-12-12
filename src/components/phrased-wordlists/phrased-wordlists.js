class PhrasedWordlistSelector extends window.HTMLElement {
  static get observedAttributes () {
    return ['selected', 'wordlist-key']
  }

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = `
      <li>
        <a href="#">
          <slot></slot>
        </a>
      </li>`
    this.shadow.querySelector('a').addEventListener('click', (evt) => {
      this.dispatchEvent(new window.CustomEvent(
        'selected',
        {detail: {wordlist_key: this.wordlist_key}}
      ))
      evt.preventDefault()
    })
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

  set wordlist_key (value) {
    this.setAttribute('wordlist-key', value)
  }

  get wordlist_key () {
    return this.getAttribute('wordlist-key')
  }
}

window.customElements.define('phrased-wordlist-selector', PhrasedWordlistSelector)

class PhrasedWordlists extends window.HTMLElement {
  static get observedAttributes () {
    return ['selection']
  }

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = '<ul><slot id="list"></slot></ul>'
    this.observeSelectorChanges()
    if (!this.selection) {
      let firstChild = this.querySelector('phrased-wordlist-selector')
      if (firstChild) {
        this.selection = firstChild.wordlist_key
      }
    }
  }

  observeSelectorChanges () {
    new window.MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if ('addedNodes' in mutation) {
          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode.localName === 'phrased-wordlist-selector') {
              this.wordlistSelectorAdded(addedNode)
              if (!this.selection) {
                this.selection = addedNode.wordlist_key
              }
            }
          })
        }
      })
    })
    .observe(this, {childList: true, subtree: true})
  }

  wordlistSelectorAdded (selector) {
    selector.addEventListener('selected', (evt) => {
      this.selection = evt.detail.wordlist_key
    })
  }

  attributeChangedCallback () {
    this.querySelectorAll('phrased-wordlist-selector').forEach((e) => {
      if (e.wordlist_key === this.selection) {
        e.setAttribute('selected', '')
      } else {
        e.removeAttribute('selected')
      }
    })
    this.dispatchEvent(new window.CustomEvent(
      'selected',
      {detail: {wordlist_key: this.selection}}
    ))
  }

  set selection (value) {
    this.setAttribute('selection', value)
  }

  get selection () {
    return this.getAttribute('selection')
  }
}

window.customElements.define('phrased-wordlists', PhrasedWordlists)

