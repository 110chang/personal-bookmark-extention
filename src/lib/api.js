export function logIn({ username = '', password = '' }) {
  return fetch('http://127.0.0.1:5000/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ username, password }),
  })
}

export function logOut() {
  return fetch('http://127.0.0.1:5000/api/logout', {
    method: 'delete',
    credentials: 'include',
  })
}

export function refreshAuth({ id }) {
  return fetch('http://127.0.0.1:5000/api/refresh', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ id }),
  })
}

export function postBookmarks({ title = '', url = ''}) {
  return fetch('http://127.0.0.1:5000/api/bookmarks', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({ title, url }),
  })
}
