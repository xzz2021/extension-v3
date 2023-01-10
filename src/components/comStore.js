/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-10 14:31:16
 */

import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const comStore = defineStore('comInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        // 评价数据
        openCom: false,
        percentage: 0,
        dataWithPic: [],
        dataNoPic: [],
        commodityId:null,
        withPic: '有图评价',
        // 图片下载数据
        openImg: false,
        // percentage: 0,
        mainImg: [],
        detailImg: [],
        skuImg: [],
      }
    },
    // persist: true, //持久化
      actions: {  //支持异步
        increment() {
          this.count++
        },
    },
    getters: {
      // diagnosisData2: (state) => {
      //   return API.isExpired(state.diagnosisData.timeTamp, 5) ? diagnosisData : {}
      // }
    }
  
  })



//--------拿到响应式数据
//   const store = useUsersStore();
// const { name, age, sex } = storeToRefs(store);
//------------ 重置state-----------------
// store.$reset();
//-----------批量更改数据---------------
//store.$patch({
//   name: "张三",
//   age: 100,
//   sex: "女",
// });
//-----------------------------------

// export default { comStore }