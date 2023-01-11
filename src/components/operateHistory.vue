<!--
 * @Date: 2022-10-31 14:36:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-10 09:45:18
-->
<template>

  <div class="operateHistory">
    <vxe-modal v-model="Visible" width="600px" @close="closeHistory" height="560px" :position="{ top: 45 }" maskClosable
      marginSize="-600" >
      <template #title>
        <!-- <div class="mytitle" @click="$myBus.$emit('summary', $event)">操作记录</div> -->
        <div class="mytitle">操作记录</div>
      </template>
      <div class="containerBox">

        <div class="navbar">
          <div style="width: 100px">账号</div>
          <div style="width: 60px">平台</div>
          <div style="width: 230px">操作</div>
          <div style="width: 130px">时间</div>
          <div style="width: 50px"></div>
        </div>
        <div v-if="historyTable.self.length != 0" class="historyList">
          <div class="listBox" v-for="(item, index) in historyTable.self" :key="index">
            <div style="width: 100px" class="phone">{{ item.userPhone }}</div>
            <div style="width: 60px" class="platform">{{ item.platform }}</div>
            <div style="width: 230px" class="operate">{{ item.desc }}</div>
            <div style="width: 130px" class="time">{{ item.time }}</div>
            <div  class="guanbibtn" @click="deleteData(item.id)">
              <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" data-v-029747aa=""><path fill="currentColor" d="M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"></path></svg>
            </div>
          </div>
        </div>
        <div v-else>
          <img class="emptyImg" src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/emptyData.png"
            alt="当前没有浏览记录" />
        </div>
      </div>
      <div class="paginationBox">

        <el-pagination style="justify-content: center;" @current-change="getPageData" :page-size="10" :pager-count="9" :hide-on-single-page="true"
          layout="prev, pager, next" :total="totalCount"></el-pagination>
      </div>

    </vxe-modal>
  </div>
</template>
<script setup>
//平台状态store
// const busStore = piniaStore()
// //storeToRefs增加响应性,使用了proxy,所以需要用.value拿到值
// const { userInfo } = storeToRefs(busStore) 
// const props = defineProps(['sitePlatform'])
      const Visible = ref(false)
      const totalCount =  ref(100)
      const historyTable = reactive({self: []})
      const userInfoStore = reactive({self: []})
    // console.log('userInfoStore.self:1111111111111 ', userInfoStore.self);

      // historyTable: [
      // {id: 3,userPhone: 13467677683, platform: '京东', function: '店铺诊断', operate: '店铺诊断-销售前10商品', time: '2022-10-31 17:56' },
      // {id: 6,userPhone: 13467676873, platform: '京东', function: '店铺诊断', operate: '店铺诊断-销售前10商品', time: '2022-10-31 17:56' }]

    const closeHistory = () =>{
      // this.historyTable = []
    }
    const  deleteData = async (id) => {
      await API.operateHistory.delete({user_id: userInfoStore.self.userid , token: userInfoStore.self.userToken, act_id: id})
      historyTable.self =  historyTable.self.filter(item => item.id != id)
    }
    const getPageData = async (e) =>{
      //获取指定页数数据
      await getDatabase(e)
    }
    const  getDatabase = async (e) => {
      let {list, count} = await API.operateHistory.get({user_id: userInfoStore.self.userid , token: userInfoStore.self.userToken,page: e, limit: 10})
      historyTable.self = list
      if (e == 1) { totalCount.value = count }
    }
    const addData = async (obj) => {
      await API.operateHistory.add(obj)
    }
    const getUserinfo = async () =>{
      userInfoStore.self  =  await  API.getUserinfo()
    }

   onMounted(async() =>{
      await getUserinfo()
      await getDatabase(1)

    //------------当监听到登录事件后--------重新获取用户信息--------------
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      message == 'loginEvent'? getUserInfo() : ''
      sendResponse({status: true})
      })
    //---------------当未登录时拦截操作记录-----------------
    if(userInfoStore.self.userid == undefined ) return

    //-------------------或者通过userid----??????????---不渲染-----------


//--------------全局监听点击事件---------------start--------------------
    $(document).ready(() => {  //页面文档加载完再执行查询
      let node = $('.addOperateRecord')  //拿到所有标的项
      node.each(function(){
        //监听点击事件
        $(this).on('click',async function(){
          //得到对应class值
          // console.log('$(this)[0].classList[1]: ', $(this)[0].classList[1]);
          let platform = await API.Storage.get('platform')
          // console.log('platform: ', platform);
      let obj = {
        user_id: userInfoStore.self.userid,
        token: userInfoStore.self.userToken,
        platform,
        type: '开发调试,可忽略此账号记录',
        desc: $(this)[0].classList[1]
      }
      addData(obj)
        })
      })
   })
//--------------全局监听点击事件---------------end--------------------

  })

  defineExpose({ Visible, getDatabase })

</script>

<style lang='scss' scoped>
@import '../css/sass/operateHistory.scss';
</style>