<!--
 * @Date: 2022-12-08 17:05:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-23 10:33:37
-->
<template>
<header class="headerbox">
      <div class="section">
            <div class="titleBox">
              <div class="one">谋臣界-电商工具箱</div>
              <div class="two">MOUCHENJIE</div>
            </div>
            <div class="tipBox">
            <el-tooltip  class="item" effect="dark" placement="top">
              <template class="topTip" #content>
                <div>1.此区域按住鼠标左键可以自由拖动面板</div>
                <div>2.单击此区域可直接访问“谋臣界”官网</div>
              </template>
              <svg @click="oopen" class="xzzsymbol" aria-hidden="true"> <use xlink:href="#xzzicon3-tishi"></use>
              </svg>
            </el-tooltip>

            </div>
          </div>
          <div class="handleBox"></div>
    </header>
</template>
<script setup>
    // const tooldisabled = ref(false)
  const oopen = () => {
    window.open('http://pddzd.junchenlun.com/plugs/index.html#/')
  }
</script>
<style  lang='scss' scoped>

    .headerbox {
      position: relative;
      box-sizing: border-box;
      padding: 13px 9px;
      border-radius: 4px 4px 0 0;
      background-image: url('https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/bgleft.png'),
       url('https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/bgright.png'),
       url('https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/rectanglebg.png');
      background-position:  0% 0%, 100% 0%, 0% 0%;
      background-size: 90px 60px, 89px 60px, 180px 60px;
      background-repeat: no-repeat;
      // position: relative;
      // user-select: none;
      .section {
        display: flex;
        align-items: center;
        height: 34px;
        width: 162px;
        .titleBox{
          width: 140px;
          cursor: default;
          margin-right: 8px;
          //消除原生页面影响
          .one{
            font-size: 16px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            line-height: 24px;
            color: #FFFFFF;
            word-break: normal ;
            
          }
          .two{
            font-size: 10px;
            font-family: Source Han Sans CN;
            font-weight: 400;
            // line-height: 17px;
            color: #FFFFFF;
            letter-spacing: 6.5px;
            opacity: 0.7;
            word-break: normal ;
          }
        }
        svg{
    // display: none;
    color: #fff;
    cursor: help;
    font-size: 16px;
        }

        .tipBox{
          z-index: 3;
        }
      }
      .handleBox{
        position: absolute;
        width: 180px;
        height: 60px;
        top: 0;
        left: 0;
      }
    }

</style>