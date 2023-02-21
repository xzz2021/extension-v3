<!--
 * @Date: 2023-01-09 14:07:13
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-21 16:51:27
-->
<template>
    <div>
        <el-dropdown placement="right-start" @command="openOrdertool">
            <span class="entranceBox">
              <div class="xzzone">
                <svg class="xzzsymbol xzzsvg"  aria-hidden="true">  <use xlink:href="#xzzicon3-bdgj"></use> </svg>
                <div class="title" >补单工具</div>
            </div>
            <svg class="xzzsymbol xzzsvgyjt"  aria-hidden="true">  <use xlink:href="#xzzicon3-youjt"></use> </svg>
            </span>
            <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="orderRemark" class="addOperateRecord 补单工具-操作记录">订单备注</el-dropdown-item>
              <el-dropdown-item command="createOrderplan" class="addOperateRecord 补单工具-创建补单计划">创建补单计划</el-dropdown-item>
              <el-dropdown-item command="newAddOrder" class="addOperateRecord 补单工具-新品早期补单词">新品早期补单词</el-dropdown-item>
              <el-dropdown-item command="keywordRanking" class="addOperateRecord 补单工具-关键词排名查询">关键词排名查询</el-dropdown-item>
            </el-dropdown-menu>
            </template>
          </el-dropdown>
          </div>
</template>

<script setup>


const props = defineProps(['banId'])
const fnList = ['orderRemark', 'createOrderplan', 'newAddOrder', 'keywordRanking']


const openOrdertool = (arg) => {
  let banList = []
  Array.from(props.banId).forEach(num => banList.push(fnList[num-1] || '索引过大,请检查传参'))
  if(banList.includes(arg)) return  ElMessage.error({ message: `功能等待开发中`, duration: 3000, showClose: true,grouping: true }) 
  // console.log('arg: ', arg)
    // API.emitter.emit('open', arg)
}

onBeforeMount(async () => {

})

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