<template>
<div class="jclpanel" >
  
    <!-- <VueDragResize dragCancel=".dragbox .advertiseBox,.dragbox .footer,.dragbox  .jclmain" :isActive="true" :w="180" :h="60" :x="panelLocation.lx" :y="panelLocation.ly" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" > -->
    <VueDragResize dragCancel=".jclmain" dragHandle=".handleBox" :isActive="true" :w="180" :h="60" :x="panelLocation.lx" :y="panelLocation.ly" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" >
      <!-- https://github.com/kirillmurashov/vue-drag-resize/tree/v2.0.3 -->
    <div class="dragbox">
        <panelHeader />
      <Transition name="fade">
    <main class="jclmain" v-show="showMain">

      
      <panelPlainMenu logoName="jyfk" title="视频下载" @click="videoDownload2"   :show="true"/>
      <!-- 诊断工具 -->
        <!-- <panelDiagnosisTool /> -->


      <!-- 补单工具 -->
          <!-- <panelOrderToolPanel  banId='134'/> -->

        <!-- 标题工具 -->
      
          <panelPlainMenu logoName="home" title="回到首页" openKey='https://www.amazon.com/' :show="true"/>

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

    
            <!-- <communalApp /> -->

</template>

<script setup>



//导入主图视频下载功能
import {videoDownload2} from './videoDownload2.js'
  // console.log("🚀 ~ file: app.vue:203 ~ videoDownLoad:", videoDownLoad)

  // import { testBus } from './aaa.js'

//各平台持久化的store数据
// const userstore = userStore()
// const { panelLocation } = storeToRefs(userstore)

//平台状态store
const busStore = piniaStore()
//storeToRefs增加响应性,使用了proxy,所以需要用.value拿到值
const { urlCheck, info_id, scanData, scanShow, currentHref ,panelLocation } = storeToRefs(busStore) 




// 深层注入props//--------蒙版进度条使用注入后,则所有方法要把域名判断写到app方法中---才能调用打开app的子组件进度条
// const ratio = ref(null)
// provide('percentage', ratio)
//封装打开蒙版进度条方法,参数为关闭的秒数
//---------深层注入方法弃用因为兄弟组件无法传值------改用emitter监听发散----效率更高----值与方法直接内部定义即可------


// const { proxy } = getCurrentInstance()
//---------------单纯字符串变量不可使用reactive---------
//-----ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要


let showMain  = ref(true)
const version = 666
const userid = ref('')

// const try33 = async () => {
//   await API2.wait(2)
//   console.log('--------我执行了-----77777777777------------')
// }

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



const getUserInfo = async () => {
let userInfoStore  =  await  API.getUserinfo()
  if(userInfoStore.userid == undefined) {
    API.checkLogin.addEvent()  //添加全局登录拦截
    return 
    }else{
      API.checkLogin.removeEvent()  //移除全局登录拦截
    }
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