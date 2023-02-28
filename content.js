chrome.runtime.onMessage.addListener((request, options) => {
  if (request.name === 'displayUrl:contentScripts') {
    const body = document.querySelector('body')
    const addElement = document.createElement('h1');

    // 受け取った URL を画面に表示する
    addElement.textContent = `URL is ${ request.data.url }`;
    
    body.prepend(addElement)
  }
});
