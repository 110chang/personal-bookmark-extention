export async function logIn({ username = '', password = '' }) {
  return chrome.runtime.sendMessage({
    name: 'login:background',
    data: { username, password }
  })
}

export async function logOut() {
  return chrome.runtime.sendMessage({ name: 'logout:background' })
}

export async function refreshAuth({ id = '' }) {
  return chrome.runtime.sendMessage({
    name: 'refresh:background',
    data: { id },
  })
}

export async function postBookmarks({ title = '', url = '', tags = []}) {
  return chrome.runtime.sendMessage({
    name: 'postBookmarks:background',
    data: { title, url, tags },
  })
}

export async function getTags() {
  return chrome.runtime.sendMessage({
    name: 'getTags:background',
  })
}

export default {
  logIn,
  logOut,
  refreshAuth,
  postBookmarks,
  getTags,
}
