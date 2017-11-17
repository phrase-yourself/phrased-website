export const SWITCH_LANGUAGE = 'SWITCH_LANGUAGE'
export const SWITCH_WORDLIST = 'SWITCH_WORDLIST'

export const switchLanguage = (shortCode) => ({
  type: SWITCH_LANGUAGE,
  payload: shortCode
})

export const switchWordlist = (name) => ({
  type: SWITCH_WORDLIST,
  payload: name
})
