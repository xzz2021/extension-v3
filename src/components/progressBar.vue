<!--
 * @Date: 2022-10-22 10:23:59
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-01 10:51:19
-->
<template>
  <el-dialog  title="" :modal="true" width="400px" v-model="visible" :show-close="false" :close-on-click-modal="false" top="40vh">
    <div class="pro-container"  style=" display: flex; align-items: center; justify-content: center; text-align: justify">
      <div class="myimg">
        <img src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/coffe_loading.gif" alt="" />
      </div>
      <div class="mypro">
        <el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" ></el-progress>
        <div></div>
      </div>
    </div>
  </el-dialog>
</template>
<script setup>
// const props = defineProps(['visible','percentage'])
const visible = ref(false)
// const percentage = ref(30)
const percentage = inject('percentage', null)

watch(percentage, async (newV, oldV)=> {
      if(newV == 0) visible.value = true
      if(newV == 100) visible.value = false
})
</script>
<style lang="scss" scoped>
:deep(.el-dialog__body) {
  padding-top: 12px;
}

 :deep(.el-dialog) {
   border-radius: 6px;
 }


.pro-container {
  margin-bottom: 32px;
  display: flex;
  flex-direction: column;
  align-items: center;
  .myimg {
    width: 94px;
    height: 64px;
    margin-bottom: 12px;
  }
  .mypro {
    width: 360px;
  }
}
</style>
