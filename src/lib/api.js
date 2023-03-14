const VITE_API_BASE_URL = import.meta.env.VITE_API_BASE_URL

export function logIn({ username = '', password = '' }) {
  return fetch(`${VITE_API_BASE_URL}/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })
}

export function logOut() {
  return fetch(`${VITE_API_BASE_URL}/logout`, {
    method: 'delete',
    credentials: 'include',
  })
}

export function refreshAuth({ id }) {
  return fetch(`${VITE_API_BASE_URL}/refresh`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ id }),
  })
}

export function postBookmarks({ title = '', url = '', tags = [] }) {
  return fetch(`${VITE_API_BASE_URL}/bookmarks`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ title, url, tags }),
  })
}

export function getTags() {
  return fetch(`${VITE_API_BASE_URL}/tags`, {
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
  })
}

export default {
  logIn,
  logOut,
  refreshAuth,
  postBookmarks,
  getTags,
}
