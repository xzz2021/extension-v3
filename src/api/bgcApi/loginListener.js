
//------☆☆☆☆------通过监听storage的变化----------监听登录状态的改变-----☆☆☆☆----

const loginListenser = () => {
    let matches = ["https://*.1688.com/*", "https://*.tmall.com/*", "https://*.jd.com/*",
  "https://*.taobao.com/*", "https://*.alibaba.com/*", "https://*.yangkeduo.com/*",
  "https://*.pingduoduo.com/*", "https://*.amazon.com/*", "https://*.amazon.cn/*"]
//let matches = '<all_urls>'
chrome.storage.onChanged.addListener(function (changes, namespace) {
  for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
    if (key == 'userInfo') {
      chrome.tabs.query({ url: matches }, (tabs) => {
        let l = tabs.length
        for (let i = 0; i < l; i++) {
          chrome.tabs.sendMessage(tabs[i].id, 'loginEvent', () => { })
        }
      })
    }
  }
})
}

export default { loginListenser }