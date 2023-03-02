<!--
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-02 16:47:29
-->
<template>
<div class="jclpanel" >
  
    <!-- <VueDragResize dragCancel=".dragbox .advertiseBox,.dragbox .footer,.dragbox  .jclmain" :isActive="true" :w="180" :h="60" :x="panelLocation.lx" :y="panelLocation.ly" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" > -->
    <VueDragResize dragCancel=".jclmain" dragHandle=".handleBox" :isActive="true" :w="180" :h="60" :x="panelLocation.lx" :y="panelLocation.ly" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" >
      <!-- https://github.com/kirillmurashov/vue-drag-resize/tree/v2.0.3 -->
    <div class="dragbox">
        <panelHeader />
      <Transition name="fade">
    <main class="jclmain" v-show="showMain">

      <!-- 诊断工具 -->
        <!-- <panelDiagnosisTool /> -->
      <!-- 下载工具 -->
        <div>
            <el-dropdown placement="right-start" ref="subDropdown1" >
              <span class="entranceBox">
                <div class="one">
                    <panelXzzLogo name="xzgj" />
                    <div class="title" >下载工具</div>
                </div>
                <panelXzzLogoyjt />
              </span>

              <template #dropdown>
             <el-dropdown-menu class="el-dropdown-menu2">
              <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown   placement="right-start" @command="imgDownload" >
                      <span class="el-dropdown-link2">
                        <div class="title2">图片下载</div>
                        <panelXzzLogoyjt type="true"/>
                      </span>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => { $refs.subDropdown1.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown1.handleClose() }">
                    <el-dropdown-item :class="`addOperateRecord 图片下载-${item.name}`"
                    :command="item.platform" v-for="item in pictureOption" :key="item.name">
                        {{ item.name }}
                    </el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

                 <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown placement="right-start" @command="commentDownload">
                      <!-- <div class="title2">有图评价下载</div> -->
                      <span class="el-dropdown-link2">
                        <div class="title2">评价下载</div>
                        <panelXzzLogoyjt type="true"/>
                      </span>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="() => { $refs.subDropdown1.handleOpen() }"
                        @mouseleave.enter="() => { $refs.subDropdown1.handleClose() }">
                        <!-- <el-dropdown-menu  > -->
                    <el-dropdown-item :command="item.value" v-for="item in commentOptions"
                    :key="item.value">评价前{{ item.value }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
              </el-dropdown-item>
                <!-- 二级菜单结束 -->

              <el-dropdown-item  class="addOperateRecord 下载工具-视频下载 el-dropdown-item2" @click.enter="videoDownload">
                <span class="el-dropdown-link2">
                  <div class="title2" >主图视频下载</div>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
              </template>
            </el-dropdown>
      </div>

      <!-- 补单工具 -->
          <panelOrderToolPanel  banId='134'/>
        <!-- 标题工具 -->
      <div >
          <el-dropdown placement="right-start" >
            <span class="entranceBox">
              <div class="one">
                <panelXzzLogo name="btgj" />
                <div class="title" >标题工具</div>
            </div>
            <panelXzzLogoyjt />
            </span>
            <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="addOperateRecord 账号管理-操作记录" >标题采集</el-dropdown-item>
              <el-dropdown-item class="addOperateRecord 账号管理-任务进程" >浏览记录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

          <panelPlainMenu logoName="home" title="回到首页" openKey='https://www.jd.com/' :show="true"/>

          <panelPlainMenu logoName="jyfk" title="我的建议/反馈"  openKey="feedback" :show="userid"/>

        <!-- 账号管理个人中心 -->
          <panelAccountMange :show="userid" />

          <panelPlainMenu logoName="login" title="账号登录" openKey="login" :show="!userid" />

        <div  class="version">版本:{{ version }} </div>

    </main>
    </Transition>

    <footer class="footer" @click="showMain = !showMain">
      <div class="shrink"> <panelXzzLogo :name="showMain? 'shrink2': 'shrink'" /> </div>
      <!-- <div>{{count}}</div> -->
    </footer>

      <!-- 广告面板挂载 -->
        <panelAdvertisingPanel :openAd="showMain" />

    </div>
    </VueDragResize>
    </div>

      <!-- 全平台公共组件挂载的总入口 -->
            <!-- <communalApp /> -->


      <!-- 各平台自己的子组件挂载 -->

    <!-- <jdScanRecord ref="ScanRecordRef"/> -->
    <!-- <jdShopDiagnosis ref="shopDiagnosisRef" /> -->
    
    <jdImageDownload />
    <jdCommentDownload />
     <!--<keywordRanking ref="zrss" /> -->
    <div class="test">
      <div class="test1" >
      <el-button type="primary" @click="test1">test1</el-button>
      </div>
      <el-button type="primary" @click="test2">test2</el-button>
    </div>
    <!-- <jdChildComponent /> -->
    <!-- 通过将props动态值绑定到pinia上,可以全局实时更改调用,且不需要公共组件的pinia引入 不再需要$ref的定义及调用-->
    <!-- <progressBar :percentage="proBar.percentage"/> -->
    <!-- 此方法弃用,改用深层注入 -->
</template>

<script setup>

import { getOrderList, setOrderList } from './js/JDorderTag.js'

//导入主图视频下载功能
import {videoDownload} from './videoDownload.js'
// console.log("🚀 ~ file: app.vue:203 ~ videoDownLoad:", videoDownLoad)


// console.log("🚀 ~ file: app.vue:161 ~ window:", window)
// console.log("🚀 ~ file: app.vue:153 ~ chrome:", chrome)
//各平台持久化的store数据
// const userstore = userStore()
// const { panelLocation } = storeToRefs(userstore)

//平台状态store
const busStore = piniaStore()
//storeToRefs增加响应性,使用了proxy,所以需要用.value拿到值
const { urlCheck, info_id, scanData, scanShow, currentHref ,panelLocation, version } = storeToRefs(busStore) 


// 深层注入props//--------蒙版进度条使用注入后,则所有方法要把域名判断写到app方法中---才能调用打开app的子组件进度条
// const ratio = ref(null)
// provide('percentage', ratio)
//封装打开蒙版进度条方法,参数为关闭的秒数
//---------深层注入方法弃用因为兄弟组件无法传值------改用emitter监听发散----效率更高----值与方法直接内部定义即可------


// const { proxy } = getCurrentInstance()
//---------------单纯字符串变量不可使用reactive---------
//-----ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要

let showMain  = ref(true)
// const version = VERSION
const userid = ref('')


const test1 = async() => {

  function ff(){
    return  window.pageConfig.product.imageList
  }
  let res =  await API.injectFn(ff)
  console.log("🚀 ~ file: app.vue:206 ~ test1 ~ res:", res)

}
const test2 = () => {
  // API.scroll.goToBottomEase()
}


//实时响应式获得数据需要直接绑定state的值,解构无法实时获得最新值,虽然可以用来操作,但最好使用$patch方式
// let {lx, ly} = location.value


//----------------------图片下载------------start----------------------------------
  const pictureOption  = [ {name: 'PC端_图片下载',  platform: 'pc'}, {name: '移动端_图片下载', platform: 'mobile'}]
  const imgDownload = (platform) => {
    if (urlCheck.value) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
      API.emitter.emit('imageDownload', platform)
  }
//-------------------图片下载------------end-------------------------------------------



//----------------------评价下载------------start----------------------------------
  const commentOptions  = [ {value: 20}, {value: 50}, {value: 100}, {value: 200}, {value: 300}]
  const commentDownload = (num) => {
    if (urlCheck.value) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
        API.emitter.emit('commentDownload', num)
  }
//-------------------评价下载------------end-------------------------------------------






//---------面板拖拽功能------start------------------
let reloadDrag = ref(true)
const onDragstop = async (e) => {
  // console.log('=========zhixing==========')
  if(panelLocation.value.lx == e.left && panelLocation.value.ly == e.top) return window.open('http://pddzd.junchenlun.com/plugs/index.html#/')
  let winHeight = window.innerHeight - 60
  let winWidth = window.innerWidth - 200
  if(e.top < 0 || e.left < 0 || e.top > winHeight || e.left > winWidth){
    reloadDrag.value = false
    setTimeout(() => {
    reloadDrag.value = true
    }, 100)
  }else{
    // busStore.$patch((state)=>{ //数据存放于持久化的pinia里
    //   state.panelLocation.lx = e.left
    //   state.panelLocation.ly =  e.top
    // })
    // let loc =  { lx: e.left, ly: e.top }
    // panelLocation.value = loc
    // localStorage.setItem('panelLocation', JSON.stringify(loc))
    busStore.storeLoc({ lx: e.left, ly: e.top })   //移动后存储和更新最新的坐标


  }
  // console.log('=========zhixing====222222222222======')
}
//---------面板拖拽功能------end------------------





//---------登录------start----------------
// const loginRef = ref(null)     // 子组件ref要声明才能拿到
// const goToLogin = () => { loginRef.value.loginShow = true }
// const goToLogin = () => { API.emitter.emit('open','login') }
//---------登录------end----------------


//---------退出登录------start----------------
// const logout = () => { API.emitter.emit('open','logout') }
//---------退出登录------end----------------


//-----☆☆☆☆☆☆----------------☆☆☆☆☆☆--------
//监听添加移除的公共事件--------------第一版-------已废弃------通过公共emitter可以发散事件进行激活------
//  const targetEvent = (e) => {
//     //三种方式兼容不同浏览器
//     e.stopImmediatePropagation()
//     e.cancelBubble = true //IE
//     e.stopPropagation()
//     loginRef.value.loginShow = true  //因为api里拿不到ref所以无法抽离,只能在此处定义
//   }
//-----☆☆☆☆☆☆----------------☆☆☆☆☆☆--------

const getUserInfo = async () => {
let userInfoStore  =  await  API.getUserinfo()
  if(userInfoStore.userid == undefined) {
    API.checkLogin.addEvent()  //添加全局登录拦截
    return 
    }else{
      API.checkLogin.removeEvent()  //移除全局登录拦截
    }
    //通知账号管理组件更新手机号
    API.emitter.emit('getUserPhone')

  busStore.$patch((state)=>{
      state.userInfo = userInfoStore
    })
    userid.value = userInfoStore.userid
}

onMounted(async () => {

})

onBeforeMount(async () => {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  message == 'loginEvent'? getUserInfo() : ''
  sendResponse({status: true})
  })
getUserInfo()
API.Storage.set({platform: '京东'})  //必须声明此项,其他独立公共组件才能拿到值
})

</script>

<style lang="scss" scoped>
@import "../../css/sass/jclpanel.scss";

.test{
  position: fixed;
  top: 30%;
  left: 20%;
  background-color: #fff;
  z-index: 22;
}

</style>