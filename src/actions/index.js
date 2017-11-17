export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE'
export const SWITCH_WORDLIST = 'SWITCH_WORDLIST'
export const GENERATE_PHRASE = 'GENERATE_PHRASE'
export const NEW_PHRASE = 'NEW_PHRASE'

export const switchLanguage = (shortCode) => ({
  type: SWITCH_LANGUAGE,
  payload: shortCode
})

export const switchWordlist = (name) => ({
  type: SWITCH_WORDLIST,
  payload: name
})

export const generatePhrase = (language, wordlist) => ({
  type: GENERATE_PHRASE,
  payload: {
    language,
    wordlist
  }
})

export const newPhrase = (phrase) => ({
  type: NEW_PHRASE,
  payload: phrase
})
