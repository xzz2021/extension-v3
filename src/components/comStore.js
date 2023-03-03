/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-03 10:01:10
 */

import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const commentStore = defineStore('commentStore', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        // 评价数据
        openCom: false,
        percentage: 0,
        dataWithPic: [],
        dataNoPic: [],
        docName: '',
        withPic: '有图评价',
      }
    },
      actions: {  //支持异步
    },
    getters: {
    }
  })


  export const imageStore = defineStore('imageStore', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        // 图片下载数据
        openImg: false,
        percentage: 0,
        mainImg: [],
        detailImg: [],
        skuImg: [],
        zipname: '',
        LinkData: '',
      }
    },
      actions: {  //支持异步
    },
    getters: {
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


// setup写法

// export const tempStore = defineStore('tempInfo', () => {
//   const count = ref(7)

//  return { count}
// })