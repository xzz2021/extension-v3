//定义单个自定义组件挂载入口

import xzzTest from './index.vue'


export default {
    install(app){
        app.component('xzzTest', xzzTest)
    }
}