<!--
 * @Date: 2023-02-21 17:26:31
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-21 17:35:24
-->
<template> 
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

</template>
<script setup>
const scanRecordRef = ref(null)
const shopDiagnosisRef = ref(null)
const diagnosisOption = reactive([{value: 2}, {value: 5}, {value: 10}, {value: 20}, {value: 50}])
const commodityDiagnosis = async(num) =>{
  if(num =='scan') return scanRecordRef.value.getScanData(num)  //调用历史记录模块
  // shopDiagnosisRef.value.startDiagnosis(num)
}

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
            .one {
              display: flex;
              width: 130px;
              margin-left: 15px;
              .title{
                font-size: 14px;
                line-height: 16px;
                margin-left: 4px;
              }
            }
            &:hover {
              color: #ff9712 !important;
              background-color: #ffa9391f;
            }
          }
          .title2{
            font-family: MicrosoftYaHei;
            font-weight: 400;
          }
    

      :deep(.el-dropdown-item2){
  min-width: 120px;
  padding:0 5px;  // 改变次级菜单范围
  .el-dropdown{
    width: 100%;
  }
  .el-dropdown-link2{
    width: 100%;
    height: 26px;
    padding: 5px; 
    display: flex;
  align-items: center;
  justify-content: space-between;
  }
  &:hover {
      .title2, svg{
        color: #ff9712;
      }
  }
 }

</style>