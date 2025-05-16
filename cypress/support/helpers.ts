import { Domain } from '../constants/types'

export function currentDomain(): Domain {
  return Cypress.env('DOMAIN') || 'cz'
}

function getApiUrl() {}

function getCookie(name: string) {
  const value = `; ${document.cookie}`
  const parts = value.split(`; ${name}=`)
  if (parts.length === 2) return parts.pop().split(';').shift()
}

export function getApiAuthorization() {
  const auth = `_ga=${getCookie('_ga')}; _gid=${getCookie('gid')}; _ga_44G9BGLDTZ=${getCookie('_ga_44G9BGLDTZ')}; _fakturaonline_devise_session=${getCookie('_fakturaonline_devise_session')}; ph_phc_6Cs383e8ng4mCKhNKgMlnHFrNzDaWbMsaBWF9zBmAfB_posthog=${getCookie('ph_phc_6Cs383e8ng4mCKhNKgMlnHFrNzDaWbMsaBWF9zBmAfB_posthog')}`
}
