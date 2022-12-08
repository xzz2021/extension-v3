<!--
 * @Date: 2022-12-08 15:11:25
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-08 16:09:15
-->
<template>

            <svg class="xzzsymbol xzzsvg" style="font-size: 10px; margin-right: 15px;"  aria-hidden="true"> 
                <use :xlink:href="hide ? '#xzzicon3-' : '#xzzicon3-youjt'"></use>
            </svg>
</template>
<script setup>
const props = defineProps(['hide'])
// fs不传时默认是14
</script>
<style  lang='scss' scoped>


</style>