/*
 * @Date: 2023-03-10 16:23:43
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-10 16:45:58
 */
//定义批量全局自定义组件挂载入口
//这样可以达到在  没有自动引入组件插件 的情况下, 也能随处使用已定义的组件

import xzzTest from "./xzztest";
import xzzTest2 from "./xzztest2";

const components = [
    xzzTest,
    xzzTest2,
]



export default {
    install(app){
        components.map(item => { app.use(item) })
    }
}