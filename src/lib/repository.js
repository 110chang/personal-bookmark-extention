import api from './api'
import messenger from './extention/messenger'

export async function logIn({ username = '', password = '' }) {
  if (chrome.runtime) {
    return JSON.parse(await messenger.logIn({ username, password }))
  }

  const res = await api.logIn({ username, password })
  const json = await res.json()

  return {
    ...json,
    status: res.status,
    statusText: res.statusText,
  }
}

export async function logOut() {
  if (chrome.runtime) {
    return JSON.parse(await messenger.logOut())
  }

  const res = await api.logOut()
  const json = await res.json()

  return {
    ...json,
    status: res.status,
    statusText: res.statusText,
  }
}

export async function refreshAuth({ id = '' }) {
  if (chrome.runtime) {
    return JSON.parse(await messenger.refreshAuth({ id }))
  }

  const res = await api.refreshAuth({ id })
  const json = await res.json()

  return {
    ...json,
    status: res.status,
    statusText: res.statusText,
  }
}

export async function postBookmarks({ title = '', url = ''}) {
  if (chrome.runtime) {
    return JSON.parse(await messenger.postBookmarks({ title, url }))
  }

  const res = await api.postBookmarks({ title, url })
  const json = await res.json()

  return {
    ...json,
    status: res.status,
    statusText: res.statusText,
  }
}
