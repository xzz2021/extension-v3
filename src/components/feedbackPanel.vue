<!--
 * @Date: 2022-11-12 09:56:46
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-12 16:17:51
-->
<template>
<div>


    <vxe-modal v-model="show" width="1200" :position="{top: 100}" @hide="closeModal">
        <template #header>
        <div style="width:1200px; height:30px;"></div>
      </template>
      <div class="feedbackHeader">
          <div class="titleBox">
          <p class="headerTitle">我要建议/反馈</p>
          </div>
          <div class="closeSec" @click="show = false"><svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon3-guanbi"></use></svg></div>
      </div>

      <div class="feedbackContainer">
        <!-- 左侧反馈区域 -->
        <div class="feedbackBox">
            <div class="eachBox platformBox">
                <p style="width:56px;">反馈平台</p> 
                <el-select v-model="platformValue" size="large" clearable filterable placeholder="请选择反馈平台或者输入关键词进行匹配">
                    <el-option v-for="item in platformOptions" :key="item.value" :label="item.value" :value="item.value"> </el-option>
                </el-select>
            </div>

            <div class="eachBox tooltypeBox">
                <p style="width:56px; text-align:right;">工具</p>
                <el-select v-model="tooltypeValue" size="large"  filterable placeholder="请选择工具或者输入关键词进行匹配">
                    <el-option v-for="item in tooltypeOptions" :key="item.value" :label="item.value" :value="item.value"> </el-option>
                </el-select>
            </div>

            <div class="eachBox messageBox">
                <p style="width:56px;">问题留言</p>
                <el-input type="textarea" :rows="4" placeholder="请输入问题留言" v-model="feedbackContent" ></el-input>
                <div :class="feedbackContent.length<300 ?'countLimit': 'countExceed'" >{{feedbackContent.length + '/300'}}</div>
            </div>

            <div class="eachBox imageBox">
                <p style="width:56px;">上传截图</p>
                <el-upload action="#" list-type="picture-card" :auto-upload="false" v-model:file-list="fileList.self" :limit="10"
                 :multiple="true" :on-exceed="handleExceed" accept="image/jpeg,image/gif,image/png" :on-change="onUploadChange">
    
                <template  #default >
                  <div class="addsvg">
                    <svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon3-tianjia"></use></svg>
                    <div class="addtitle">添加图片</div>
                  </div>
                </template>
                <template  #file="{ file }">
      
      <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" >
      <span class="el-upload-list__item-actions">
        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
          <div class="delsvg"><svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon3-delete"></use></svg></div>
        </span>
      </span>
    </template>
</el-upload>
                
            <span class="uploadtip"><span style="color:red;">*</span> 图片大小不能超过3m,最多上传10张</span>
            </div>


            <!-- 分割线 -->
            <div class="xzzdivider2"></div>

            <div class="submitBox">
                <el-button type="primary" size="large" @click="uploadSubmit">提交</el-button>
            </div>
        </div>

        <!-- 分割线 -->
        <div class="xzzdivider"></div>

        <!-- 右侧客服二维码区域 -->
        <div class="QRcodeBox">
            <div class="container">
              <img class="qr" src="https://www.junchenlun.com/static1/img/jcl_com/wx2.png" style="width:130px; height:130px;"/>
              <p>平台客服微信</p>
            </div>
        </div>

      </div>

    </vxe-modal>
    </div>
</template>

<script setup>
import {uploadOss} from './upload_oss'

    const show = ref(false)
    const platformOptions = [{value: '拼多多'}, {value: '淘宝'}, {value: '天猫'}, {value: '京东'},{value: '阿里国内'}, {value: '阿里国际'}, {value: '亚马逊'}]
    const  tooltypeOptions  = [
                {value: '诊断工具-商品诊断-销售前2商品'},{value: '诊断工具-商品诊断-销售前5商品'},{value: '诊断工具-商品诊断-销售前10商品'},
                {value: '诊断工具-商品诊断-销售前20商品'},{value: '诊断工具-商品诊断-销售前50商品'},{value: '诊断工具-商品诊断-浏览记录'},
                {value: '诊断工具-店铺诊断'},
                {value: '下载工具-图片下载-PC端_全部下载(带目录)'},{value: '下载工具-图片下载-PC端_全部下载'},{value: '下载工具-图片下载-PC端_主图下载'},
                {value: '下载工具-图片下载-PC端_详情图下载'},{value: '下载工具-图片下载-PC端_SKU图下载'},{value: '下载工具-图片下载-移动端_全部下载(带目录)'},
                {value: '下载工具-图片下载-移动端_全部下载'},{value: '下载工具-图片下载-移动端_主图下载'},{value: '下载工具-图片下载-移动端_详情图下载'},
                {value: '下载工具-图片下载-移动端_SKU图下载'},
                {value: '下载工具-直通车图下载'},
                {value: '下载工具-有图评价下载-评价前20'},{value: '下载工具-有图评价下载-评价前50'},{value: '下载工具-有图评价下载-评价前100'},
                {value: '下载工具-有图评价下载-评价前200'},{value: '下载工具-有图评价下载-评价前300'},
                {value: '下载工具-无图评价下载-评价前20'}, {value: '下载工具-无图评价下载-评价前50'},{value: '下载工具-无图评价下载-评价前100'},
                {value: '下载工具-无图评价下载-评价前200'},{value: '下载工具-无图评价下载-评价前300'},
                {value: '下载工具-主图视频下载'},{value: '下载工具-抖音商城图片下载'},
                {value: '补单工具-订单备注'},{value: '补单工具-创建补单计划'},{value: '补单工具-新品早期补单词'},{value: '补单工具-关键词排名查询'},
                {value: '标题工具-标题采集'},{value: '标题工具-浏览记录'},
                {value: '标题工具-商品搬家'},{value: '标题工具-回到首页'},
                {value: '个人中心-操作记录'},{value: '个人中心-任务进程'},{value: '个人中心-切换账号'},{value: '个人中心-账号登录'},
                ]
    const platformValue= ref('')
    const tooltypeValue= ref('')
    const feedbackContent= ref('')
    const fileList= reactive({self: []})
    const imgList= reactive({self: []})


    watch(feedbackContent, async (newV, oldV) => {
     if(newV.length > 300) {
              feedbackContent.value = newV.slice(0,300)
              ElMessage.error({message: '留言内容过长,不能超过300个字符',offset: 70,duration: 1500,})}
  })
    const   onUploadChange = async (file) =>{
        const isIMAGE = (file.raw.type === 'image/jpeg' || file.raw.type === 'image/png');
        const isLt3M = file.size / 1024 / 1024 < 3;
        if (!isIMAGE) return ElMessage.error('只能上传jpg/png图片!')
        if (!isLt3M)  return ElMessage.error('上传文件大小不能超过 5MB!')
          fileList.self.push(file)  //  
      }

    const  handleRemove = (file) => {
        let curIndex = fileList.self.findIndex(item => item.uid == file.uid)
        if(curIndex == -1) return
        fileList.self.splice(curIndex,1)
        console.log('fileList.self: ', fileList.self);
      }


    const  handleExceed = (fileList) => {  //fileList 为超出限制的文件数组
        // console.log(fileList);
        ElMessage({message: '图片最大上传数量为10张',type: 'error',offset: 70,duration: 1500,})
      }
      const uploadImg = async () => {
          // forEach会异步执行-------故而需要使用for循环,不然上传未结束就会直接提交
          let ll = fileList.self
          if(ll.length == 0) return ElMessage({message: '请添加反馈图片后再提交',type: 'error',offset: 70,duration: 2000,})
          for(let i=0;i<ll.length; i++){
            let res  = await uploadOss(ll[i].raw,ll[i].uid)
            imgList.self.push(res)
          }
      }
      const uploadSubmit = async () =>{
        if(platformValue.value == '') return ElMessage({message: '请选择反馈平台',type: 'error',offset: 70,duration: 1500,})
        if(tooltypeValue.value == '') return ElMessage({message: '请选择工具类型',type: 'error',offset: 70,duration: 1500,})
        if(feedbackContent.value == '') return ElMessage({message: '请输入留言内容',type: 'error',offset: 70,duration: 1500,})
        if(feedbackContent.length > 300) return ElMessage({message: '留言内容过长,不能超过300个字',type: 'error',offset: 70,duration: 1500,})
         await uploadImg()
        //提交数据给后端
        let userInfo  =  await  API.getUserinfo()
        // userInfo:{timeStamp: 16686236989352, userPhone: 167**3727, userToken: 'FF0C0CD6F2E086CF6D3650F', userid: 4}
        let obj = {  // 上传给后端的数据
          user_id: userInfo.userid,
          token: userInfo.userToken, 
          platform: platformValue.value,
          tool: tooltypeValue.value,
          desc: feedbackContent.value,
          imgs: JSON.stringify(imgList.self),
        }
        // console.log('obj: ', obj);

      let config = {
        url: '?s=Dpzd.User_FeedBack.advice',
        body: obj
        }

      let res = await  API.sendMessage({type: 'myfetch', config})
      
      console.log('res: ', res);
      if(res.data.msg == '留言成功'){
        closeModal()   // 发送完成后关闭面板,置空数据
        ElMessage.success({message: '提交成功',offset: 70,duration: 1500,})
      }else{
         ElMessage.error({message: '提交失败,原因:'+ res.data.msg, offset: 70,duration: 2000,})
      }
      }
      const closeModal = () =>{
        platformValue.value = ''
        tooltypeValue.value = ''
        feedbackContent.value = ''
        fileList.self = []
        imgList.self = []
        show.value = false
      }

        defineExpose({ show })
</script>

<style lang="scss" scoped>
@import '../css/sass/feedbackPanel.scss';

</style>
