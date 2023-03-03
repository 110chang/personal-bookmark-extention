export async function getCurrentTab() {
  if (!chrome || !chrome.tabs) {
    return {
      title: 'Dummy Title',
      url: 'http://example.com',
    }
  }
  const tabs = await chrome.tabs.query({ active: true, currentWindow: true })
  return tabs[0]
}
