import api from './api'

export async function logIn({ username = '', password = '' }) {
  if (chrome.runtime) {
    const message = await chrome.runtime.sendMessage({
      name: 'login:background',
      data: { username, password }
    })
    return JSON.parse(message)
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
    const message = await chrome.runtime.sendMessage({ name: 'logout:background' })
    return JSON.parse(message)
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
    const message = await chrome.runtime.sendMessage({
      name: 'refresh:background',
      data: { id },
    })
    return JSON.parse(message)
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
    const message = await chrome.runtime.sendMessage({
      name: 'postBookmarks:background',
      data: { title, url },
    })
    return JSON.parse(message)
  }

  const res = await api.postBookmarks({ title, url })
  const json = await res.json()

  return {
    ...json,
    status: res.status,
    statusText: res.statusText,
  }
}
