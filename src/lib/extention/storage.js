export async function saveUser({ id = '', username = '' } = {}) {
  await chrome.storage.local.set({ user: JSON.stringify({ id, username }) })
}

export async function getUser() {
  const res = await chrome.storage.local.get(['user'])
  return res.user ? JSON.parse(res.user) : null
}

export async function clearUser() {
  await chrome.storage.local.remove(['user'])
}

export default {
  saveUser,
  getUser,
  clearUser,
}
