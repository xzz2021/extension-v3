/*
 * @Date: 2022-12-13 17:59:03
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-04 17:28:09
 */
// import popup from './src/popup/app.vue'

import { createApp } from 'vue'
import popup from './app.vue'

// 单独按需导入挂载
import 'element-plus/es/components/message/style/css'
// import { ElMessage } from 'element-plus'  // 组件会自动导入

createApp(popup).mount('#pop')
// createApp(popup).use(ElMessage).mount('#pop')