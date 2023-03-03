import extStorage from './extention/storage'
import webStorage from './web/storage'

export async function saveUser({ id = '', username = '' } = {}) {
  if (window.sessionStorage) {
    webStorage.saveUser({ id, username })
  } else if (chrome.storage) {
    await extStorage.saveUser({ id, username })
  }
}

export async function getUser() {
  if (window.sessionStorage) {
    return await Promise.resolve(webStorage.getUser())
  } else if (chrome.storage) {
    return await extStorage.getUser()
  }
  return null
}

export async function clearUser() {
  if (window.sessionStorage) {
    webStorage.clearUser()
  } else if (chrome.storage) {
    await extStorage.clearUser()
  }
}

export default {
  saveUser,
  getUser,
  clearUser,
}
