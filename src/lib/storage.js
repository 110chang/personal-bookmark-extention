import extStorage from './extention/storage'
import webStorage from './web/storage'

export async function saveUser({ id = '', username = '' } = {}) {
  if (chrome.storage) {
    await extStorage.saveUser({ id, username })
  } else if (window.sessionStorage) {
    webStorage.saveUser({ id, username })
  }
}

export async function getUser() {
  if (chrome.storage) {
    return await extStorage.getUser()
  } else if (window.sessionStorage) {
    return await Promise.resolve(webStorage.getUser())
  }
  return null
}

export async function clearUser() {
  if (chrome.storage) {
    await extStorage.clearUser()
  } else if (window.sessionStorage) {
    webStorage.clearUser()
  }
}

export default {
  saveUser,
  getUser,
  clearUser,
}
