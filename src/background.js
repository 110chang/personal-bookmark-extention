console.log('background')

chrome.runtime.onMessage.addListener(async (request) => {
  switch (request.name) {
    case 'login:background':
      await fetch('http://127.0.0.1:5000/api/login', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ username: 'user', password: 'password' }),
      })
      return

    case 'logout:background':
      await fetch('http://127.0.0.1:5000/api/logout', {
        method: 'delete',
        credentials: 'include',
      })
      return

    case 'postBookmark:background':
      console.log(request.data)
      await fetch('http://127.0.0.1:5000/api/bookmarks', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ title: request.data.title, url: request.data.url }),
      })
      return

    default: return
  }
})
