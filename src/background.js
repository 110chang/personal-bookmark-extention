import { logIn, logOut, refreshAuth, postBookmarks, getTags } from './lib/api'

function createMessage(res = {}, json = {}) {
  return JSON.stringify({
    ...json,
    status: res.status,
    statusText: res.statusText,
  })
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  console.log(`---${request.name}---`)
  switch (request.name) {
    case 'login:background':
      logIn({ username: request.data.username, password: request.data.password }).then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(createMessage(res, json))
        })
      })
      return true

    case 'logout:background':
      logOut().then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(createMessage(res, json))
        })
      })
      return true

    case 'refresh:background':
      refreshAuth({ id: request.data.id }).then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(createMessage(res, json))
        })
      })
      return true

    case 'postBookmarks:background':
      postBookmarks({ title: request.data.title, url: request.data.url, tags: request.data.tags }).then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(createMessage(res, json))
        })
      })
      return true

    case 'getTags:background':
      getTags().then((res) => {
        console.log(res)
        res.json().then(json => {
          sendResponse(createMessage(res, json))
        })
      })
      return true

    default: return
  }
})
