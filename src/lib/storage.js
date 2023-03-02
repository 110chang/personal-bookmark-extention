export function saveUser({ id = '', username = '' } = {}) {
  if (!window.sessionStorage) return
  sessionStorage.setItem('user', JSON.stringify({ id, username }))
}

export function getUser() {
  if (!window.sessionStorage) return null
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export function clearUser() {
  if (!window.sessionStorage) return
  sessionStorage.removeItem('user')
}
