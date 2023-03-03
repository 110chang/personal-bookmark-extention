import api from './api'
import { clearUser, getUser, saveUser } from './storage'

export async function logIn({ username = '', password = '' }) {
  if (chrome.runtime) {
    return chrome.runtime.sendMessage({ name: 'login:background', data: { username, password } })
  }

  const res = await api.logIn({ username, password })
  const json = await res.json()

  if (res.ok) {
    saveUser(json.data)
  }

  return {
    ...json,
    status: res.status,
    statusText: res.statusText,
  }
}

export async function logOut() {
  if (chrome.runtime) {
    return chrome.runtime.sendMessage({ name: 'logout:background' })
  }

  const res = await api.logOut()

  if (!res.ok) {
    console.error('logout failed')
  }

  clearUser()

  return {
    ok: res.ok,
    status: res.status,
    statusText: res.statusText,
  }
}

export async function refreshAuth() {
  if (chrome.runtime) {
    return chrome.runtime.sendMessage({ name: 'refresh:background' })
  }

  const savedUser = await getUser()
  console.log(savedUser)
  const res = await api.refreshAuth({ id: savedUser ? savedUser.id : '' })
  const json = await res.json()

  if (res.ok) {
    saveUser(json.data)
  } else {
    clearUser()
  }

  return {
    ...json,
    status: res.status,
    statusText: res.statusText,
  }
}

export async function postBookmarks({ title = '', url = ''}) {
  if (chrome.runtime) {
    return chrome.runtime.sendMessage({ name: 'refresh:background', data: { id } })
  }

  const res = await api.postBookmarks({ title, url })

  if (!res.ok) {
    if (res.status == 403) {
      clearUser()
    }
    return {
      ok: res.ok,
      status: res.status,
      statusText: res.statusText,
    }
  }

  return res
}
