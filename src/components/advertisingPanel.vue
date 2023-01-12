<template>

<div v-if="showAD" class="advertiseBox">
          <div class="transparentBox"></div>
          <div class="containerBox">
            <a href="https://www.junchenlun.com/" target="_blank">
            <img style="" class="xzzlogo"  src="https://junchenlunoffice.oss-cn-shenzhen.aliyuncs.com/advertisebg.png" alt="" />
            </a>
              <svg @click="showAD = false" class="xzzsymbol xzzsvg" style="font-size: 10px;"  aria-hidden="true"> 
                <use xlink:href="#xzzicon3-ppsb"></use>
            </svg>
          </div>
        </div>

</template>
<script setup>
    const props = defineProps(['openAd'])
    const showAD = ref(true)
    watch(() => props.openAd,  (newV, oldV) => {
     if(newV == true) {
         showAD.value = true
        }
  })

</script>
<style  lang='scss' scoped>
       // 广告吸附区域
    .advertiseBox{
      
      .transparentBox{
        background-color: transparent;
        height: 10px;
      }
      .containerBox{
        width: 180px;
        height: 60px;
        background-color: #f8f8f8c9; // 带透明度
        display: flex;
        align-items: center;
        justify-content: space-around;
        .xzzlogo{
          cursor: pointer;
          width: 107px; 
          height: 40px
        }
        .xzzsvg{
          font-size: 10px;
          color: #ccc;
          cursor: pointer;
        }

      }
    }

</style>