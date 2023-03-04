/*
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-04 09:40:08
 */
// 'use strict'默认启用
import { createApp } from 'vue'
//-------pinia----打包60k---------
import { createPinia } from 'pinia'

const pinia = createPinia()

//-----------------------------------
// pinia插件  ,提供全局属性
pinia.use(()=> ({version: '1.0.1'}))


// //---------------引入所有API挂载到全局----------
import{ contentApi as API} from './src/api/contentApi/index'
window.API = API

// import './src/api/contentApi/websocket'

// //------------------------------------------------------

//---------全局引入vxe-table----------按需引入体积只减少100k,且有bug,,不值得-----不要再按需------
import 'xe-utils'
import VXETable from 'vxe-table'
// import { Table, Modal, Column } from 'vxe-table'
import 'vxe-table/lib/style.css'

//引入自定义的所有css入口文件
import './src/css/style'
//----------------------

//-------------------各平台实例引入----------------
import app1688 from './src/pages/alibaba/app.vue'
// import apptmall from './src/pages/tmall/app.vue'
import apptb from './src/pages/tb/app.vue'
import appjd from './src/pages/jd/app.vue'
import appamazon from './src/pages/amazon/app.vue'


//------------vue实例-----挂载入口---------------------
function createEntry(myapp,id){
  const el = document.querySelector('body');
  if (el) {
    //  afterbegin 插入body内部最前面------afterend插入body外部后面
    // 必须嵌入body内部,不然面板无法固定
      el.insertAdjacentHTML('afterbegin',`<div id="${id}"></div>`)
      createApp(myapp).use(pinia).use(VXETable).mount(`#${id}`)
      // createApp(myapp).use(pinia).use(Table).use(Modal).use(Column).mount(`#${id}`)
    }
}

//-------------------版本2.0----------------------
let loginUrl = location.host.match(/login|mms|passport/) != null
let checkedUrl = location.host.match(/tmall|taobao|1688|yangkeduo|pinduoduo|alibaba|jd|amazon|lemak/)
loginUrl? checkedUrl = '': checkedUrl = checkedUrl ? checkedUrl[0] : ''
//------------------------------------------------
// if(!loginUrl && checkedUrl){
//   createEntry(App, 'communalComponents')
// }

switch (checkedUrl) {
  case 'jd': API.repairCss(checkedUrl); createEntry(appjd, 'marketjd')
    break;
  case '1688': createEntry(app1688, 'market1688')
    break;
  // case 'tmall': createEntry(apptmall, 'markettmall')
  //   break;
  case 'taobao': createEntry(apptb, 'markettb')
    break;
  case 'amazon': createEntry(appamazon, 'marketamazon')
    break;
  // case 'localhost': createApp(popup).mount('#pop')
  //   break;
  default: ''
    break;
}

//-----------通过inject渠道------注入js到任意页面----且共享浏览器window--------------
API.injectFile()

//-----脚本动态参数注入仅限于bgc----------如果动态注入可能需要配置mainfest.json----------
  /* "content_security_policy": {
    "script-src": "unsafe-inline"
  }, */

  
  //---------------------导入调试的全局变量,生产模式会自动false-----------------------
// import {getShow} from'./show'
// let aa = getShow(DEBUG)
// console.log('aa: ', aa);

