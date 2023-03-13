/*
 * @Date: 2023-02-22 17:50:06
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-11 16:37:05
 */

// 通过监听消息触发, 然后判断当前聚焦的tab页url是否为插件开发页面,true则执行刷新
const autoReloadTab = () => {
    chrome.tabs.query({ active: true }, ([tab]) => {
        if (tab.url.match(/tmall|taobao|1688|yangkeduo|pinduoduo|alibaba|amazon|jd|/)) {  //匹配项最后一个一定要有|符号代表结束
            chrome.runtime.reload()
            chrome.tabs.reload()
        } else {
          chrome.runtime.reload()
        }
      })
    }


    export default { autoReloadTab }