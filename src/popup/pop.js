/*
 * @Date: 2022-12-13 17:59:03
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-10 08:52:51
 */
// import popup from './src/popup/app.vue'

import { createApp } from 'vue'
import popup from './app.vue'

// 单独按需导入挂载
import 'element-plus/es/components/message/style/css'
import { ElMessage } from 'element-plus'



createApp(popup).use(ElMessage).mount('#pop')