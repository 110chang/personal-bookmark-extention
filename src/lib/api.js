import { VITE_REMOTE_BASE_URL } from '../settings'

export function logIn({ username = '', password = '' }) {
  return fetch(`${VITE_REMOTE_BASE_URL}/api/login`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })
}

export function logOut() {
  return fetch(`${VITE_REMOTE_BASE_URL}/api/logout`, {
    method: 'delete',
    credentials: 'include',
  })
}

export function refreshAuth({ id }) {
  return fetch(`${VITE_REMOTE_BASE_URL}/api/refresh`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ id }),
  })
}

export function postBookmarks({ title = '', url = '', tags = [] }) {
  return fetch(`${VITE_REMOTE_BASE_URL}/api/bookmarks`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ title, url, tags }),
  })
}

export function getTags() {
  return fetch(`${VITE_REMOTE_BASE_URL}/api/tags`, {
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
