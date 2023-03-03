<template>


</template>
<script setup>
import { getOrderList, setOrderList } from './js/JDorderTag.js'
// 订单备注 start
// 获取订单备注信息

const getOrderTagJDVue = async () => {
    ElMessage.success({ message:"开始获取订单备注信息"});
    let odList = [251720707226, "jd_75b39cc757d30"]
    let ua = navigator.userAgent;
    let data = await getOrderList(document.cookie, ua, odList)
    console.log("data" , data)
}

// 设置订单备注信息
const setOrderTagJDVue = async () =>{
    ElMessage.success({ message:"开始设置订单备注信息"});
    const odList = [251720707226,251506941780]
    let ua = navigator.userAgent;
    //let data = await setOrderList(curCookies.value, ua, odList, "js_test", 4, 2);
    let data = await setOrderList(document.cookie, ua, odList, "", 0, 2);
    console.log("data" , data)
}
// 订单备注 end


</script>
<style  lang='scss' scoped>


</style>