const languages = [
  {
    key: 'en',
    name: 'English',
    shortName: 'EN'
  },
  {
    key: 'de',
    name: 'Deutsch',
    shortName: 'DE'
  }
]

const t = {
  en: {
    'title': 'Boring Passwords?',
    'pick-dictionary': 'Pick a dictonary:'
  },
  de: {
    'title': 'Langweilige Passwörter?',
    'pick-dictionary': 'Wähle eine Wortliste:'
  }
}

let translate = function (lang, key) {
  return t[lang][key]
}

const translateDocument = function (document, lang) {
  document.querySelectorAll('[data-translation-key]').forEach(e => {
    e.innerHTML = translate(lang, e.getAttribute('data-translation-key'))
  })
}

translate.languages = languages
translate.translateDocument = translateDocument

module.exports = translate
