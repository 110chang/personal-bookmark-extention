// ```
// % curl -X POST \
// -H "Content-Type: application/json" \
// -c tmp/cookie.txt \
// -d "{ \"username\": \"user\", \"password\": \"password\" }" \
// http://127.0.0.1:5000/api/login
// ```

// ```
// % curl -X POST \
// -H "Content-Type: application/json" \
// -b tmp/cookie.txt \
// -d "{ \"title\": \"API\", \"url\": \"https://example.com/api\" }" \
// http://127.0.0.1:5000/api/bookmarks
// ```

async function getCurrentTab() {
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0]
}

document.addEventListener('DOMContentLoaded', async () => {
  const tab = await getCurrentTab()
  console.log(tab.title, tab.url)

  const urlInput = document.getElementById('url')
  urlInput.value = tab.url

  const titleInput = document.getElementById('title')
  titleInput.value = tab.title

  const form = document.querySelector('form')
  form.addEventListener('submit', (e) => {
    e.preventDefault()
    chrome.runtime.sendMessage({ name: 'postBookmark:background', data: { url: tab.url, title: tab.title } })
  })

  const loginButton = document.getElementById('login')
  loginButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ name: 'login:background' })
  })

  const logoutButton = document.getElementById('logout')
  logoutButton.addEventListener('click', () => {
    chrome.runtime.sendMessage({ name: 'logout:background' })
  })
})
