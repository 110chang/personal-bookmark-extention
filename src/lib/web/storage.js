export async function saveUser({ id = '', username = '' } = {}) {
  if (!window.sessionStorage) return
  sessionStorage.setItem('user', JSON.stringify({ id, username }))
}

export async function getUser() {
  if (!window.sessionStorage) return null
  const user = sessionStorage.getItem('user')
  return user ? JSON.parse(user) : null
}

export async function clearUser() {
  if (!window.sessionStorage) return
  sessionStorage.removeItem('user')
}

export default {
  saveUser,
  getUser,
  clearUser,
}
