<template>
<div class="jclpanel" >
  
    <VueDragResize :isActive="true" :w="180" :h="60" :x="panelLocation.lx" :y="panelLocation.ly" :z="22" v-if="reloadDrag" :isResizable="false" @dragstop="onDragstop" >
      <!-- https://github.com/kirillmurashov/vue-drag-resize/tree/v2.0.3 -->
    <div class="dragbox">
        <panelHeader />
      <Transition name="fade">

    <main class="jclmain" v-show="showMain">

      <!-- 诊断工具 -->
      <div>   
            <el-dropdown placement="right-start" ref="subDropdown2">
              <span class="entranceBox">
                <div class="one">
                    <xzzLogo name="zdgj" />
                    <div class="title" >诊断工具</div>
                </div>
                <xzzLogoyjt />
              </span>

               <template #dropdown>
                    <el-dropdown-menu class="el-dropdown-menu2">
                    <!-- 二级菜单开始 -->
                      <el-dropdown-item class="el-dropdown-item2">
                          <el-dropdown   placement="right-start" @command="commodityDiagnosis" >
                                <span class="el-dropdown-link2">
                                  <div class="title2">商品诊断</div>
                                  <xzzLogoyjt type="true"/>
                                </span>
                            <template #dropdown>
                              <el-dropdown-menu  @mouseenter.enter="() => { $refs.subDropdown2.handleOpen() }"
                                  @mouseleave.enter="() => { $refs.subDropdown2.handleClose() }">
                              <el-dropdown-item :class="`addOperateRecord 诊断工具-商品诊断-销售前${item.name}商品`"
                              :command="item.value" v-for="item in diagnosisOption" :key="item.name">
                                  销售前{{ item.value }}商品 </el-dropdown-item>
                              <el-dropdown-item command="scan">浏览记录</el-dropdown-item>
                              </el-dropdown-menu>
                            </template>
                          </el-dropdown>
                      </el-dropdown-item>

                        <el-dropdown-item  class="addOperateRecord 诊断工具-店铺诊断 el-dropdown-item2" >
                          <span class="el-dropdown-link2">
                            <div class="title2" >店铺诊断</div>
                          </span>
                        </el-dropdown-item>
                    </el-dropdown-menu>
               </template>
            </el-dropdown>
      </div>

      <!-- 下载工具 -->
        <div>
            <el-dropdown placement="right-start" ref="subDropdown1" >
              <span class="entranceBox">
                <div class="one">
                    <xzzLogo name="xzgj" />
                    <div class="title" >下载工具</div>
                </div>
                <xzzLogoyjt />
              </span>

              <template #dropdown>
             <el-dropdown-menu class="el-dropdown-menu2">
              <!-- 二级菜单开始 -->
              <el-dropdown-item class="el-dropdown-item2">
                <el-dropdown   placement="right-start" @command="imgDownload" >
                      <span class="el-dropdown-link2">
                        <div class="title2">图片下载</div>
                        <xzzLogoyjt type="true"/>
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
                        <xzzLogoyjt type="true"/>
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

              <el-dropdown-item  class="addOperateRecord 下载工具-视频下载 el-dropdown-item2" @click.enter="downLoadJDVideoVue">
                <span class="el-dropdown-link2">
                  <div class="title2" >主图视频下载</div>
                </span>
              </el-dropdown-item>
            </el-dropdown-menu>
              </template>
            </el-dropdown>
      </div>

      <!-- 补单工具 -->
          <orderToolPanel />

        <!-- 标题工具 -->
      <div >
          <el-dropdown placement="right-start" >
            <span class="entranceBox">
              <div class="one">
                <xzzLogo name="btgj" />
                <div class="title" >标题工具</div>
            </div>
            <xzzLogoyjt />
            </span>
            <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="addOperateRecord 账号管理-操作记录" >标题采集</el-dropdown-item>
              <el-dropdown-item class="addOperateRecord 账号管理-任务进程" >浏览记录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>

         <div>
          <plainMenu logoName="home" title="回到首页" openKey='https://www.jd.com/'/>
        </div>

        <div v-if="userid">
          <plainMenu logoName="jyfk" title="我的建议/反馈"  openKey="feedback"/>
        </div>
        <!-- 账号管理个人中心 -->
        <div v-if="userid">
          <accountMange />
        </div>
        <div  v-else>
          <plainMenu logoName="login" title="账号登录" openKey="login" />
        </div>

        <div  class="version">版本:{{ version }} </div>

    </main>
    </Transition>

    <footer @click="showMain = !showMain">
      <div class="shrink"> <xzzLogo :name="showMain? 'shrink2': 'shrink'" /> </div>
      <!-- <div>{{count}}</div> -->
    </footer>

      <!-- 广告面板挂载 -->
        <advertisingPanel :openAd="showMain" />

    </div>
    </VueDragResize>
    </div>


      <!-- 全平台公共组件挂载的总入口 -->
            <communalApp />


      <!-- 各平台自己的子组件挂载 -->

    <!-- <jdScanRecord ref="ScanRecordRef"/> -->
    <!-- <jdShopDiagnosis ref="shopDiagnosisRef" /> -->
    
    <jdImageDownload ref="imageDownloadRef" />
    <jdCommentDownload ref="commentDownloadRef"/>
     <!--<keywordRanking ref="zrss" /> -->
    <!-- <div class="test">
      <div class="test1" >
      <el-button type="primary" @click="test1">test1</el-button>
      </div>
      <el-button type="primary" @click="test2">test2</el-button>
    </div> -->
    <!-- <jdChildComponent /> -->
    <!-- 通过将props动态值绑定到pinia上,可以全局实时更改调用,且不需要公共组件的pinia引入 不再需要$ref的定义及调用-->
    <!-- <progressBar :percentage="proBar.percentage"/> -->
    <!-- 此方法弃用,改用深层注入 -->
</template>

<script setup>

import { getOrderList, setOrderList } from './js/JDorderTag.js'

//各平台持久化的store数据
const userstore = userStore()
const { panelLocation } = storeToRefs(userstore)

//平台状态store
const busStore = piniaStore()
//storeToRefs增加响应性,使用了proxy,所以需要用.value拿到值
const { urlCheck, info_id, scanData, scanShow, currentHref  } = storeToRefs(busStore) 



// 深层注入props//--------蒙版进度条使用注入后,则所有方法要把域名判断写到app方法中---才能调用打开app的子组件进度条
// const ratio = ref(null)
// provide('percentage', ratio)
//封装打开蒙版进度条方法,参数为关闭的秒数
//---------深层注入方法弃用因为兄弟组件无法传值------改用emitter监听发散----效率更高----值与方法直接内部定义即可------


// const { proxy } = getCurrentInstance()
//---------------单纯字符串变量不可使用reactive---------
//-----ref定义的数据：操作数据需要.value，读取数据时模板中直接读取不需要


let curCookies  = ref('')
let showMain  = ref(true)
const version = VERSION
const userid = ref('')

const try33 = async () => {
  // await API.wait(2)
  console.log('--------我执行了-----77777777777------------')
}
    let arg = 3
const test1 = () => {
  API.emitter.emit('openPro', arg)
  arg += 10
  console.log('-------我是新增事件--------------')
}
const test2 = () => {
  // API.scroll.goToBottomEase()
}


//实时响应式获得数据需要直接绑定state的值,解构无法实时获得最新值,虽然可以用来操作,但最好使用$patch方式
// let {lx, ly} = location.value







//----------------------图片下载------------start----------------------------------
  const pictureOption  = [ {name: 'PC端_图片下载',  platform: 'pc'}, {name: '移动端_图片下载', platform: 'mobile'}]
  const imageDownloadRef = ref(null)
  const imgDownload = (platform) => {
    if (urlCheck.value) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
      // API.emitter.emit('openPro')  //调用打开蒙版进度条
      imageDownloadRef.value.startDownload(platform);
  }
//-------------------图片下载------------end-------------------------------------------



//----------------------评价下载------------start----------------------------------
const commentNum = ref(null)
  const commentOptions  = [ {value: 20}, {value: 50}, {value: 100}, {value: 200}, {value: 300}]
  const commentDownloadRef = ref(null)
  const commentDownload = (num) => {
    // commentNum.value = num
    if (urlCheck.value) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})

          commentDownloadRef.value.startDownload(num);

  }
//-------------------评价下载------------end-------------------------------------------



//---------------店铺诊断及历史记录----start-----------------
const scanRecordRef = ref(null)
const shopDiagnosisRef = ref(null)
const diagnosisOption = reactive([{value: 2}, {value: 5}, {value: 10}, {value: 20}, {value: 50}])
const commodityDiagnosis = async(num) =>{
  if(num =='scan') return scanRecordRef.value.getScanData(num)  //调用历史记录模块
  // shopDiagnosisRef.value.startDiagnosis(num)
}
//---------------店铺诊断及历史记录----end-----------------


// ---------------------视频下载 start--------------
const downLoadJDVideoVue = async () => {
      if (urlCheck.value) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
      API.emitter.emit('openPro',2)  //调用打开蒙版进度条
      let regs = currentHref.value.match(/item.jd.com.*?(\d+)/);
        let skuId = regs.length >= 2 ? regs[1] : undefined;
        $('.video-icon').click()
        let url = $('video source').attr('src')
        if(url == undefined) return  ElMessage.error({ message: '当前商品没有视频',  duration: 1500,})
        let name = new API.dayjs().format('YYYYMMDD') + '_' + skuId + '_商品视频.mp4'
      let size = await  API.sendMessage({type: 'downloads', url, name}) 
      // console.log('size: ', size);
      size && ElMessage.success({ message: `视频下载完成`, duration: 2500,})
      API.emitter.emit('addTask',{filetype: 'video',taskname: name, size,  progress: 100})
}
// --------------------------视频下载 end-------------------



// 订单备注 start
// 获取订单备注信息
const getOrderTagJDVue = async () => {
    ElMessage.success({ message:"开始获取订单备注信息"});
    let odList = [251720707226, "jd_75b39cc757d30"]
    let ua = navigator.userAgent;
    let data = await getOrderList(curCookies.value, ua, odList)
    console.log("data" , data)
}

// 设置订单备注信息
const setOrderTagJDVue = async () =>{
    ElMessage.success({ message:"开始设置订单备注信息"});
    const odList = [251720707226,251506941780]
    let ua = navigator.userAgent;
    //let data = await setOrderList(curCookies.value, ua, odList, "js_test", 4, 2);
    let data = await setOrderList(curCookies.value, ua, odList, "", 0, 2);
    console.log("data" , data)
}
// 订单备注 end



//---------面板拖拽功能------start------------------
let reloadDrag = ref(true)
const onDragstop = async (e) => {
  let winHeight = window.innerHeight - 60
  let winWidth = window.innerWidth - 200
  if(e.top < 0 || e.left < 0 || e.top > winHeight || e.left > winWidth){
    reloadDrag.value = false
    setTimeout(() => {
    reloadDrag.value = true
    }, 100)
  }else{
    userstore.$patch((state)=>{ //数据存放于持久化的pinia里
      state.panelLocation.lx = e.left
      state.panelLocation.ly =  e.top
    })
  }
}
//---------面板拖拽功能------end------------------





//---------登录------start----------------
// const loginRef = ref(null)     // 子组件ref要声明才能拿到
// const goToLogin = () => { loginRef.value.loginShow = true }
// const goToLogin = () => { API.emitter.emit('open','login') }
//---------登录------end----------------


//---------退出登录------start----------------
const logout = () => { API.emitter.emit('open','logout') }
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
  busStore.$patch((state)=>{
      state.userInfo = userInfoStore
    })
    userid.value = userInfoStore.userid
}
//------账号管理菜单函数-----------
//  const accountManagement = async (arg) => {
//       API.emitter.emit('open', arg)
//     }

  const  developing = async () => {
      ElMessage.error({ message: `功能等待开发中`, duration: 3000, showClose: true,grouping: true, });
    }

onMounted(async () => {
curCookies.value = document.cookie
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