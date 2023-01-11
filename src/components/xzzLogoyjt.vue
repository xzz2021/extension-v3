<!--
 * @Date: 2022-12-08 15:11:25
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-11 10:35:02
-->
<template>

            <svg :class="type?'xzzsvg2': 'xzzsvg'" class="xzzsymbol" aria-hidden="true"> 
                <use :xlink:href="hide ? '#xzzicon3-' : '#xzzicon3-youjt'"></use>
            </svg>
</template>
<script setup>
const props = defineProps(['hide', 'type'])
// fs不传时默认是14
</script>
<style  lang='scss' scoped>

.xzzsvg{
    font-size: 10px; 
    margin-right: 15px;
}

.xzzsvg2{
    font-size: 10px; 
    margin-left:5px;
}

</style>