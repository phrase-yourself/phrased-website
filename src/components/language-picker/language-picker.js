class LanguageSelector extends window.HTMLElement {
  static get observedAttributes () {
    return ['selected', 'key']
  }

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.shadow.innerHTML = `
      <a href="#">
        <slot></slot>
      </a>`
    this.shadow.querySelector('a').addEventListener('click', (evt) => {
      this.dispatchEvent(new window.CustomEvent(
        'selected',
        {detail: {key: this.key}}
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

  set key (value) {
    this.setAttribute('key', value)
  }

  get key () {
    return this.getAttribute('key')
  }
}

window.customElements.define('language-selector', LanguageSelector)

class LanguagePicker extends window.HTMLElement {
  static get observedAttributes () {
    return ['selection']
  }

  constructor () {
    super()
    this.shadow = this.attachShadow({mode: 'open'})
    this.observeSelectorChanges()
    this.shadow.innerHTML = '<slot id="list"></slot>'
    if (!this.selection) {
      let firstChild = this.querySelector('language-selector')
      if (firstChild) {
        this.setAttribute('selection', firstChild.key)
      }
    }
  }

  observeSelectorChanges () {
    new window.MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if ('addedNodes' in mutation) {
          mutation.addedNodes.forEach((addedNode) => {
            if (addedNode.localName === 'language-selector') {
              this.childAdded(addedNode)
              if (!this.selection) {
                this.selection = addedNode.key
              }
            }
          })
        }
      })
    })
    .observe(this, {childList: true, subtree: true})
  }

  childAdded (selector) {
    selector.addEventListener('selected', (evt) => {
      this.selection = evt.detail.key
    })
  }

  attributeChangedCallback () {
    this.querySelectorAll('language-selector').forEach((e) => {
      if (e.key === this.selection) {
        e.setAttribute('selected', '')
      } else {
        e.removeAttribute('selected')
      }
    })
    this.dispatchEvent(new window.CustomEvent(
      'selected',
      {detail: {key: this.selection}}
    ))
  }

  set selection (value) {
    this.setAttribute('selection', value)
  }

  get selection () {
    return this.getAttribute('selection')
  }
}

window.customElements.define('language-picker', LanguagePicker)
