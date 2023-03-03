export async function saveUser({ id = '', username = '' } = {}) {
  await chrome.storage.session.set({ user: JSON.stringify({ id, username }) })
}

export async function getUser() {
  const res = await chrome.storage.session.get(['user'])
  return res.user ? JSON.parse(res.user) : null
}

export async function clearUser() {
  await chrome.storage.session.remove(['user'])
}

export default {
  saveUser,
  getUser,
  clearUser,
}
