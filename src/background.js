import { logIn, logOut, refreshAuth, postBookmarks } from './lib/api'

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`---${request.name}---`)
  switch (request.name) {
    case 'login:background':
      logIn({ username: request.data.username, password: request.data.password }).then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(JSON.stringify({
            ...json,
            status: res.status,
            statusText: res.statusText,
          }))
        })
      })
      return true

    case 'logout:background':
      logOut().then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(JSON.stringify({
            ...json,
            status: res.status,
            statusText: res.statusText,
          }))
        })
      })
      return true

    case 'refresh:background':
      refreshAuth({ id: request.data.id }).then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(JSON.stringify({
            ...json,
            status: res.status,
            statusText: res.statusText,
          }))
        })
      })
      return true

    case 'postBookmarks:background':
      console.log(request.data)
      postBookmarks({ title: request.data.title, url: request.data.url }).then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(JSON.stringify({
            ...json,
            status: res.status,
            statusText: res.statusText,
          }))
        })
      })
      return true

    default: return
  }
})
