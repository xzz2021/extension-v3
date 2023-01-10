<!--
 * @Date: 2022-12-13 16:22:15
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-10 15:13:21
-->
<template>

    <loginPanel ref="loginRef" />

    <taskProgress ref="taskProgressRef" />
    <operateHistory  ref="operateHistoryRef" />
    <feedbackPanel  ref="feedbackPanelRef" />
    <!-- <commentPanel  /> -->
    <!-- <progressBar /> -->

</template>
<script setup>

const loginRef = ref(null)     // 子组件ref要声明才能拿到
const taskProgressRef = ref(null)
const operateHistoryRef = ref(null)
const feedbackPanelRef = ref(null)


const exchangeShow = (msg) => {
    switch(msg){    //   子组件所有需要调用的值和方法都需要先暴露出去defineExpose
                case 'operate' : operateHistoryRef.value.Visible = true
                    break;
                case 'task' : taskProgressRef.value.taskShow = true
                    break;
                case 'feedback' : feedbackPanelRef.value.show = true
                    break;
                case 'login' : loginRef.value.loginShow = true
                    break;
                case 'logout' : API.Storage.remove('userInfo'); loginRef.value.checkPhone = false
                    break;
                // case 'taskProgress' : taskProgressRef.value.show = true
                //     break;
                default : ''
                    break
            }
}

    onMounted(() => {
        // 监听所有打开组件的调用事件
        API.emitter.on('open', (msg) => exchangeShow(msg))
    })

</script>
<style  lang='scss' scoped>


</style>