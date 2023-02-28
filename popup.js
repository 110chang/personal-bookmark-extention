// ボタンクリック時に実行する処理を定義
const button = document.getElementById('login')
button.addEventListener('click', async () => {
  // とりあえず console.log してみる
  // console.log('clicked!')
  // chrome.runtime.sendMessage({ name: 'displayUrl:background' })
  await fetch('http://127.0.0.1:5000/api/login', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username: 'user', password: 'password' }),
  })
})

// ```
// % curl -X POST \
// -H "Content-Type: application/json" \
// -c tmp/cookie.txt \
// -d "{ \"username\": \"user\", \"password\": \"password\" }" \
// http://127.0.0.1:5000/api/login
// ```

const form = document.querySelector('form')
form.addEventListener('submit', async (e) => {
  e.preventDefault()
  chrome.runtime.sendMessage({ name: 'postBookmark:background' })
})

// ```
// % curl -X POST \
// -H "Content-Type: application/json" \
// -b tmp/cookie.txt \
// -d "{ \"title\": \"API\", \"url\": \"https://example.com/api\" }" \
// http://127.0.0.1:5000/api/bookmarks
// ```
