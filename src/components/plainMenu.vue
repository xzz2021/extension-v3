<!--
 * @Date: 2022-12-08 15:11:25
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-12 11:26:52
-->
<template>
<!-- 此组件定义没有下拉的纯净菜单项 -->
<span :class="`addOperateRecord ${title} entranceBox`" @click="openTool">
            <div class="xzzone">
                <svg class="xzzsymbol xzzsvg"  aria-hidden="true">  <use :xlink:href="`#xzzicon3-${logoName}`"></use> </svg>
                <div class="title" >{{title}}</div>
            </div>
            <svg class="xzzsymbol xzzsvgyjt"   aria-hidden="true">  <use xlink:href="#xzzicon3-"></use>  </svg>
          </span>
</template>
<script setup>
const props = defineProps(['title','logoName', 'openKey'])

const openTool = () => {
  if(props.openKey == undefined) return ElMessage.error({message: '请给组件传props值openKey', duration: 2000})
  if(props.openKey.includes('https')){
    window.open(props.openKey)
  }else{
    API.emitter.emit('open', props.openKey)
  }
}
//   defineExpose({ openTool })
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




</style>