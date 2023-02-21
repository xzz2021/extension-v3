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
                    <panelXzzLogo name="zdgj" />
                    <div class="title" >诊断工具</div>
                </div>
                <panelXzzLogoyjt />
              </span>

               <template #dropdown>
                    <el-dropdown-menu class="el-dropdown-menu2">
                    <!-- 二级菜单开始 -->
                      <el-dropdown-item class="el-dropdown-item2">
                          <el-dropdown   placement="right-start" @command="commodityDiagnosis" >
                                <span class="el-dropdown-link2">
                                  <div class="title2">商品诊断</div>
                                  <panelXzzLogoyjt type="true"/>
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

         <div>
          <plainMenu logoName="home" title="回到首页" openKey='https://www.tmall.com/'/>
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
      <div class="shrink"> <panelXzzLogo :name="showMain? 'shrink2': 'shrink'" /> </div>
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

  
</template>

<script setup>

//各平台持久化的store数据
const userstore = userStore()
const { panelLocation } = storeToRefs(userstore)

//平台状态store
const busStore = piniaStore()
const { urlCheck, info_id, scanData, scanShow, currentHref  } = storeToRefs(busStore) 


let showMain  = ref(true)
const version = VERSION
const userid = ref('')


//----------------------图片下载------------start----------------------------------
  const pictureOption  = [ {name: 'PC端_图片下载',  platform: 'pc'}, {name: '移动端_图片下载', platform: 'mobile'}]
  const imageDownloadRef = ref(null)
  const imgDownload = (platform) => {
    // if (urlCheck.value) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
    //   imageDownloadRef.value.startDownload(platform);
  }
//-------------------图片下载------------end-------------------------------------------



//----------------------评价下载------------start----------------------------------
const commentNum = ref(null)
  const commentOptions  = [ {value: 20}, {value: 50}, {value: 100}, {value: 200}, {value: 300}]
  const commentDownloadRef = ref(null)
  const commentDownload = (num) => {
    // if (urlCheck.value) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
    //       commentDownloadRef.value.startDownload(num);

  }
//-------------------评价下载------------end-------------------------------------------



//---------------店铺诊断及历史记录----start-----------------
// const scanRecordRef = ref(null)
const shopDiagnosisRef = ref(null)
const diagnosisOption = reactive([{value: 2}, {value: 5}, {value: 10}, {value: 20}, {value: 50}])
const commodityDiagnosis = async(num) =>{
  // if(num =='scan') return scanRecordRef.value.getScanData(num)  //调用历史记录模块
  // shopDiagnosisRef.value.startDiagnosis(num)
}
//---------------店铺诊断及历史记录----end-----------------


// ---------------------视频下载 start--------------
const downLoadJDVideoVue = async () => {
      
}
// --------------------------视频下载 end-------------------



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

  const  developing = async () => {
      ElMessage.error({ message: `功能等待开发中`, duration: 3000, showClose: true,grouping: true, });
    }


onBeforeMount(async () => {
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  message == 'loginEvent'? getUserInfo() : ''
  sendResponse({status: true})
  })
getUserInfo()
API.Storage.set({platform: '天猫'})  
})

</script>

<style lang="scss" scoped>
@import "../../css/sass/jclpanel.scss";


</style>