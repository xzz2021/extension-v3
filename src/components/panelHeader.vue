<!--
 * @Date: 2022-12-08 17:05:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-08 17:30:49
-->
<template>
<header class="headerbox">
      <div class="section">
        <img  src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/plugs/logo1/logobg.png" alt="" />
        <el-tooltip  :disabled="tooldisabled"  effect="dark" placement="top">
              <template #content>
                <div>此区域按住鼠标左键可以自由拖动面板</div>
              </template>
              <svg @mousedown="tooldisabled = true" @mouseup="tooldisabled = false" class="xzzsymbol" aria-hidden="true">
                <use xlink:href="#xzzicon2-tishi"></use>
              </svg>
        </el-tooltip>
      </div>
    </header>
</template>
<script setup>
    const tooldisabled = ref(false)

</script>
<style  lang='scss' scoped>

    .headerbox {
      .section {
        display: flex;
        align-items: center;
        padding: 10px;
        background: linear-gradient(180deg, #ffad44 0%, #ff9712 100%);
        border-radius: 4px 4px 0 0;
        img{
            width: 107px; 
            height: 40px;
            margin-right: 25px;
        }
        svg{
            display: none;
            color: #fff;
            cursor: help;
            font-size: 16px;
        }
      }
      &:hover {
        svg{
          display: block;
        }
      }
    }

</style>