<!--
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-16 16:09:25
-->
<template>
<div class="jclpanel" >
  
    <!-- <VueDragResize dragCancel=".dragbox .advertiseBox,.dragbox .footer,.dragbox  .jclmain" :isActive="true" :w="180" :h="60" :x="panelLocation.lx" :y="panelLocation.ly" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" > -->
    <VueDragResize dragCancel=".jclmain" dragHandle=".handleBox" :isActive="true" :w="180" :h="60" 
    :x="panelLocation.lx" :y="panelLocation.ly" :z="22" v-if="reloadDrag" :isResizable="false" 
    @dragstop="onDragstop" >
      <!-- https://github.com/kirillmurashov/vue-drag-resize/tree/v2.0.3 -->
    <div class="dragbox">
        <panelHeader />
      <Transition name="fade">
    <main class="jclmain" v-show="busStore.showMain2">

      <!-- 诊断工具 -->
        <!-- <panelDiagnosisTool /> -->
      <!-- 下载工具 -->
      
        <div>
            <el-dropdown placement="right-start" ref="subDropdown1" :hide-on-click="false">
              <span class="entranceBox">
                <div class="one">
                    <panelXzzLogo name="xzgj" />
                    <div class="title">下载工具</div>
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
                    <el-dropdown-menu  @mouseenter.enter="openOrClose('open')"
                        @mouseleave.enter="openOrClose()">
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
                    <el-dropdown-menu  @mouseenter.enter="openOrClose('open')"
                        @mouseleave.enter="openOrClose()">
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

          <panelPlainMenu logoName="jyfk" title="我的建议/反馈"  openKey="feedback" :show="busStore.userid"/>

        <!-- 账号管理个人中心 -->
          <panelAccountMange :show="busStore.userid" :userPhone="busStore.userPhone"/>

          <panelPlainMenu logoName="login" title="账号登录" openKey="login" :show="!busStore.userid" />

        <div  class="version">版本:{{ busStore.version }} </div>
        <!-- <xzzTest />
        <xzzTest2 /> -->
        
        <!-- <div @click="busStore.increment()">{{ count }}</div> -->
    </main>
    </Transition>

    <footer class="footer" @click="busStore.toggleShow()">
      <div class="shrink"> <panelXzzLogo :name="busStore.showMain2 ? 'shrink2': 'shrink'" /> </div>
    </footer>
      <!-- 广告面板挂载 -->
        <panelAdvertisingPanel :openAd="busStore.showMain2" />

    </div>
    </VueDragResize>
    </div>

      <!-- 全平台公共组件挂载的总入口 -->
        <communalApp />


      <!-- 各平台自己的子组件挂载 -->

    <!-- <jdScanRecord ref="ScanRecordRef"/> -->
    <!-- <jdShopDiagnosis ref="shopDiagnosisRef" /> -->
    
    <jdImageDownload />
    <jdCommentDownload />
     <!--<keywordRanking ref="zrss" /> -->
    <!-- <div class="test">
      <div class="test1" >
      <el-button type="primary" @click="test1">test1</el-button>
      </div>
      <el-button type="primary" @click="test2">test2</el-button>
    </div> -->

</template>

<script setup>

//导入主图视频下载功能
import { videoDownload } from './videoDownload.js'

//平台状态store
const busStore = piniaStore()
//storeToRefs增加响应性,使用了proxy,所以普通简单类型数据需要用.value拿到值, 而复杂数据不需要可以直接.xxx获取
//  或者直接busStore.xxx调用,也具有响应式
const {   panelLocation, count  } = storeToRefs(busStore) 


//注入函数到inject里,共享浏览器调试面板的顶层window
const test1 = async() => {
  function ff(){
    window.xzz$ = $
    return  window.pageConfig.product.imageList
  }
  let res =  await API.injectFn(ff)
  console.log("🚀 ~ file: app.vue:206 ~ test1 ~ res:", res)
}
const test2 = async() => {
  function ff(){
    window.xzz$ = $
    return  window.pageConfig.product.imageList
  }
  let res =  await API.injectFn(ff)
  console.log("🚀 ~ file: app.vue:206 ~ test1 ~ res:", res)
}

//控制三级菜单的开关
const subDropdown1 = ref(null)
const openOrClose = (val) => {
  val == 'open'? subDropdown1.value.handleOpen() : subDropdown1.value.handleClose()
}


//----------------------图片下载------------start----------------------------------
  const pictureOption  = [ {name: 'PC端_图片下载',  platform: 'pc'}, {name: '移动端_图片下载', platform: 'mobile'}]
  const imgDownload = platform => API.emitter.emit('imageDownload', platform)
//-------------------图片下载------------end-------------------------------------------


//----------------------评价下载------------start----------------------------------
  const commentOptions  = [ {value: 20}, {value: 50}, {value: 100}, {value: 200}, {value: 300}]
  const commentDownload = num => API.emitter.emit('commentDownload', num)
//-------------------评价下载------------end-------------------------------------------


//---------面板拖拽功能------start------------------
let reloadDrag = ref(true)
const onDragstop = async (e) => {
  // console.log('=========zhixing==========')
  if(panelLocation.lx == e.left && panelLocation.ly == e.top) return window.open('http://pddzd.junchenlun.com/plugs/index.html#/')
  let winHeight = window.innerHeight - 60
  let winWidth = window.innerWidth - 200
  if(e.top < 0 || e.left < 0 || e.top > winHeight || e.left > winWidth){
    reloadDrag.value = false
    setTimeout(() => { reloadDrag.value = true }, 100)
  }else{
    busStore.storeLocation({ lx: e.left, ly: e.top })   //移动后存储和更新最新的坐标
  }
}
//---------面板拖拽功能------end------------------

const updateUserinfo = async () => {
let userInfoStore  =  await  API.getUserinfo()
  // console.log("🚀 ~ file: app.vue:226 ~ updateUserinfo ~ userInfoStore:", userInfoStore)
  if(userInfoStore.userid == undefined) {
    API.checkLogin.addEvent()  //添加全局登录拦截
    }else{
      API.checkLogin.removeEvent()  //移除全局登录拦截
    }
    // 同时监听登录退出事件
    busStore.$patch((state)=>{
        state.userInfo = userInfoStore
        // state.userInfo = userInfoStore || { userid: '', userToken: '', userPhone: '', timeStamp: '' }
      })
}
onBeforeMount(async () => {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  message == 'loginEvent'? updateUserinfo() : ''
  sendResponse({status: true})
  })
updateUserinfo()
API.Storage.set({platform: '京东'})  //必须声明此项,其他独立公共组件才能拿到值
})

onMounted(async() => {
  // busStore.getLocation()
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