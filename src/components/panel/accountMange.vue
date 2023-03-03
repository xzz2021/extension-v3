<!--
 * @Date: 2023-01-09 14:07:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-03 08:55:44
-->
<template>
  <div v-if="show">


<el-dropdown placement="right-start"  @command="accountManagement">
            <span class="entranceBox">
              <div class="xzzone">
                <svg class="xzzsymbol xzzsvg"  aria-hidden="true">  <use xlink:href="#xzzicon3-exchange"></use> </svg>
                <div class="title" >{{userPhone}}</div>
            </div>
            <svg class="xzzsymbol xzzsvgyjt"  aria-hidden="true">  <use xlink:href="#xzzicon3-youjt"></use> </svg>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="" command="operate">操作记录</el-dropdown-item>
              <!-- <el-dropdown-item class="addOperateRecord 账号管理-操作记录" command="operate">操作记录</el-dropdown-item> -->
              <el-dropdown-item class="addOperateRecord 账号管理-任务进程" command="task">任务进程</el-dropdown-item>
              <el-dropdown-item class="addOperateRecord 账号管理-切换账号" command="exchange">切换账号</el-dropdown-item>
              <el-dropdown-item class="addOperateRecord 账号管理-退出登录" command="logout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
            </template>
          </el-dropdown>
        </div>
</template>
<script setup>
const props = defineProps(['show', 'userPhone'])

// const userPhone = ref('')

const accountManagement = (arg) => {
    switch (arg) {
        case 'operate': API.emitter.emit('open', 'operate')
          break
        case 'task': API.emitter.emit('open', 'task')
          break
        case 'exchange': API.emitter.emit('open', 'login')
          break
        case 'logout': API.emitter.emit('open', 'logout')
          break
        // case 'operate': this.$myBus.$emit('openOperateHistory')
        //   break
        default: ''
          break
      }
}


// const getUserPhone = async () => {
//   let userInfoStore  =  await  API.getUserinfo()
//     let a  = userInfoStore.userPhone + ''
//   let b = a.substring(3,7)
//   userPhone.value = a.replace(b, '****')
// }

// onBeforeMount(async () => {
//   API.emitter.on('getUserPhone', getUserPhone)
// })


</script>
<style  lang='scss' scoped>
.entranceBox {
            height: 38px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            color: #666;
            cursor: pointer;
            background: rgba(255,252,246,0.39);
            .xzzone {
              display: flex;
              width: 130px;
              margin-left: 15px;
              .xzzsvg{
                font-size: 16px; 
                margin-right: 4px;
                 }
              .title{
                font-size: 14px;
                line-height: 16px;
              }
            }
            &:hover {
              color: #ff9712 !important;
              background-color: #ffa9391f;
            }

            .xzzsvgyjt{
                font-size: 10px; 
                margin-right: 15px;
            }
          }
:deep(.el-dropdown-menu__item){
  font-family: MicrosoftYaHei;
  font-weight: 400;
  &:hover{
    background-color: #fff1e0 !important;
    color:#ff9712 !important;
  }
}

</style>