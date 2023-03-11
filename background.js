/*
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-11 14:20:27
 */

//---------------引入分文件的所有自定义api-----------
import { bgcApi as API } from './src/api/bgcApi/index'
// console.log("🚀 ~ file: background.js:9 ~ API:", API)
// API = API
// chrome.API = API // 挂载到全局,从而让api内部也能拿到所有函数

// import { bgdListenMsg } from './myPluginCopy'
// bgdListenMsg('compiler')

// 绝大多数事件都应该在onInstalled后执行,因为chrome浏览器本身有缓存会导致js文件数据重复写入导致事件冲突等错误
chrome.runtime.onInstalled.addListener(function () {
  //--------------创建右键菜单------------------
  API.createMenu()
  //------☆☆☆☆------通过监听storage的变化----------监听登录状态的改变-----☆☆☆☆-----------如果改变发送事件----------
  API.loginListenser()
})



// --------------------约定传送信息类型,根据类型执行相应函数-----------------------
//--------☆☆☆☆☆--------监听所有发送的信息-----根据信息类别调用引入的函数----------☆☆☆☆☆-----
// API.messageListenser()
// import './src/api/bgcApi/messageListenser.js'
chrome.runtime.onMessage.addListener(
  (message, sender, sendResponse) => {
    // console.log('----------------message: ----------------', message)
    switch (message.type) {
      // fatosy API start 
      case 'ztab': {
        (async () => {
          let res = undefined
          let zos = message.funcs
          let mobj = message.config
          // 打开新标签页
          if(zos == 'add'){
            if(mobj.url != undefined && mobj.url != null){
              let at = false
              if(mobj.active == true || mobj.active == false){
                at = mobj.active
              }
              res = await API.ztab.add(mobj.url, at)
            }
          }
          // 根据tabid获取标签页信息
          if(zos == 'getById'){
            let tabid = mobj.id;
            if(tabid != undefined && tabid != null){
              res = await API.ztab.getById(tabid)
            }
          }
          // 获取当前标签页信息
          if(zos == 'getNow'){
            res = await API.ztab.getNow()
          }
          // 根据ID复制标签页并打开active
          if(zos == 'copy'){
            let tabid = mobj.id;
            if(tabid != undefined && tabid != null){
              res = await API.ztab.copy(tabid)
            }
          }
          // 查询符合条件的tab页
          if(zos == 'query'){
            if(mobj instanceof Object){
              res = await API.ztab.query(mobj)
            }
          }
          // 更新指定标签页ID的标签
          if(zos == 'update'){
            let tabid = mobj.id;
            console.log("sadas",tabid)
            if(tabid != undefined && tabid != null && mobj.config instanceof Object){
              res = await API.ztab.update(tabid, mobj.config)
            }
          }
          // 刷新指定标签页ID的标签
          if(zos == 'reload'){
            let tabid = mobj.id;
            if(tabid != undefined && tabid != null){
              res = await API.ztab.reload(tabid)
            }
          }
          // 删除指定标签页ID的标签
          if(zos == 'remove'){
            let tabid = mobj.id;
            if(tabid != undefined && tabid != null){
              res = await API.ztab.remove(tabid)
            }
          }

          sendResponse(res)
        })()
        return true
      }

      break;
      
      case 'zinject': {
        (async () => {
          let res = undefined
          let zos = message.funcs
          let mobj = message.config
          if(zos == 'JDsbd'){
            let tabid = mobj.id;
            let skuNum = mobj.skuNum;
            if(tabid != undefined && tabid != null){
              res = await API.zinject.addfuncargs(tabid, API.getJDSKULink, skuNum)
              sendResponse(res)
            }
          }
          else if(zos == 'JDskuPage'){
            let tabid = mobj.id;
            if(tabid != undefined && tabid != null){
              res = await API.zinject.addfuncs(tabid, API.injectJDSkuPageData)
              sendResponse(res)
            }
          }
          
        })()
        return true
      }
      break;

      case 'zfetch' : {
        (async () => {
          let res = undefined
          let zos = message.funcs
          let mobj = message.config
          if(zos == 'JDReIMG'){
            let res = await API.zfetch.getReimg(mobj.url, mobj.datas)
            sendResponse(res)
          }
          else if(zos == 'JDbdIMG'){
            let res = await API.zfetch.getBdimg(mobj.url)
            sendResponse(res)
          }
          else if(zos == 'JDTitleck'){
            let res = await API.zfetch.getTitlecheck(mobj.url)
            sendResponse(res)
          }
        })()
        return true
      }
      break;
      // fatosy API end 
      case 'myfetch':  { (async () => {
                       let res =  await API.myfetch(message.config.url, message.config)
                       sendResponse(res)})()
                        return true}
        break;
      case 'mycookies': {//--------------需调用谷歌cookie api才能设定-------------
        // let currentStamp = Date.parse(new Date())
        // API.Cookies.set('loginStamp','登录有效期',{maxAge:10*24*3600})
        //       sendResponse('cookies set success')
      }
        break;
      case 'downloads': { (async () => {
                          let size = await API.urlDownload({ url: message.url, filename: message.name })
                          sendResponse(size)})()
                          return true
                        }
        break;
      case 'tabQuery': {
        (async () => {
          let tab = await API.tabQuery(message.requirement)
          sendResponse(tab)
        })()
        return true
      }
        break;
      case 'tabOperate': {
        chrome.tabs.remove(message.tabId, () => { })
        sendResponse('tab关闭成功')
      }
        break;
      case 'compiler':    API.autoReloadTab(); sendResponse('刷新完成')  //此处定义开发时的编译后页面自动刷新
        break;
      case 'injectFn' : {
        (async () => {
          // function fn() {
          //    window.name = '999'
          // }
          let resData = await API.injectFn(message.fn)
          // console.log("🚀 ~ file: background.js:225 ~ zhixigh:")
          // resData = resData ? resData: '失败'
          sendResponse(resData)
        })()
        return true
      }
        break;
      default: ''
        break;
    }
  }
)



