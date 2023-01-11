<!--
 * @Date: 2022-12-08 15:11:25
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-08 15:57:51
-->
<template>

            <svg class="xzzsymbol xzzsvg" style="font-size: 16px; margin-right: 4px;"  aria-hidden="true"> 
                <use :xlink:href="`#xzzicon3-${name}`"></use>
            </svg>
</template>
<script setup>
const props = defineProps(['name'])
// fs不传时默认是14
</script>
<style  lang='scss' scoped>


</style>