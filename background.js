// tabs.query は指定した条件に当てはまるタブを全て取得する。
// この場合はアクティブなタブが一つ取得できる。
chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
  console.log({ tabs })
});

chrome.runtime.onMessage.addListener(async (request) => {

  // 期待通りのリクエストかどうかをチェック
  if (request.name === 'displayUrl:background') {
    let url;
    let id;

    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      console.log({ tabs })
      url = tabs[0].url;
      id = tabs[0].id

      // content_script へデータを送る
      chrome.tabs.sendMessage(id, { // content_script はタブごとに存在するため ID 指定する必要がある
        name: 'displayUrl:contentScripts',
        data: {
          url
        }
      })
    });
  }

  if (request.name === 'postBookmark:background') {

    await fetch('http://127.0.0.1:5000/api/bookmarks', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify({ title: 'from extention', url: 'http://example.com/extention' }),
    })
  }
});
