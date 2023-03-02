/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-02 16:48:25
 */

import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const piniaStore = defineStore('selfInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        // panelLocation: { lx: 60, ly: 120 },
        panelLocation: JSON.parse(localStorage.getItem('panelLocation')) || { lx: 60, ly: 120 },
        count: 0,
        info_id: 0,
        // sitePlatform: '京东',
        urlCheck: window.location.href.indexOf('item.jd') == -1, //检查当前页是否是商品页,true则return弹出提示
        diagnosisStore:{
          show: false,
          percentage: 70,
          info_id: 0,
          diagnosisData: {},
        },
        currentHref:  window.location.href,
        userInfo: {
          userid: '',
          userToken: '',
          userPhone: '',
          timeStamp: ''
        },
        version: VERSION
        // proBar: {
        //   show: false,
        //   percentage: 0
        // }
        // userList: [{
        //   userid: '',
        //   userToken: '',
        //   userPhone: '',
        //   timeStamp: ''
        // }],
      }
    },
    // persist: true, //持久化
      actions: {  //支持异步
        async increment() {
          await API.wait(6)
          this.count++
        },
        storeLoc(loc){
          this.panelLocation = loc
          localStorage.setItem('panelLocation', JSON.stringify(loc))
          }
        // async storingLoc(val){
        //   this.panelLocation = val
            
        // },
        // async getLocation(){
        //   this.panelLocation = await API.Storage.get('panelLocation') || {lx: 60, ly: 110}
        // }
        // //自动获取当前登录用户信息挂载到store里
        // async getUserinfo(){
        //   this.userInfo = await API.Storage.get('userInfo')
        // },
        // //自动获取用户信息列表,即历史登录记录并挂载到store里
        // async getUserlist(){
        //   this.userList = await API.Storage.get('userList')
        // },
        //自动更新当前登录用户信息并挂载到store里,配合账号切换功能
        // async updateUserinfo(){
        //   let aaa = await API.Storage.get('userInfooo')
        //   console.log('aaa: ', aaa == '');
        // }
    },
    getters: {
      // panelLocation: (state) => {
      //   let aa = localStorage.getItem('panelLocation')
      //   return  aa ? JSON.parse(aa)  : { lx: 60, ly: 120 }
      // }
    }
  })

export const userStore = defineStore('userInfo', {
  // arrow function recommended for full type inference
  state: () => {
    return {
      panelLocation: { lx: 60, ly: 120 },
      // userInfo: {
      //   userid: '',
      //   userToken: '',
      //   userPhone: '',
      //   timeStamp: ''
      // },
      // userList: [{
      //   userid: '',
      //   userToken: '',
      //   userPhone: '',
      //   timeStamp: ''
      // }],
    }
  },
  persist: true, //持久化
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

// export default { piniaStore, userStore}