import chromeStorage from './chromeStorage'
import sessionStorage from './sessionStorage'

export async function saveUser({ id = '', username = '' } = {}) {
  if (window.sessionStorage) {
    sessionStorage.saveUser({ id, username })
  } else if (chrome.storage) {
    await chromeStorage.saveUser({ id, username })
  }
}

export async function getUser() {
  if (window.sessionStorage) {
    return await Promise.resolve(sessionStorage.getUser())
  } else if (chrome.storage) {
    return await chromeStorage.getUser()
  }
  return null
}

export async function clearUser() {
  if (window.sessionStorage) {
    sessionStorage.clearUser()
  } else if (chrome.storage) {
    await chromeStorage.clearUser()
  }
}

export default {
  saveUser,
  getUser,
  clearUser,
}
