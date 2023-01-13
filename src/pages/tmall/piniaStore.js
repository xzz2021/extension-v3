/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-12 16:27:53
 */

import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const piniaStore = defineStore('selfInfo', {
    state: () => {
      return {
        count: 0,
        info_id: 0,
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
      // diagnosisData2: (state) => {
      //   return API.isExpired(state.diagnosisData.timeTamp, 5) ? diagnosisData : {}
      // }
    }
  
  })

export const userStore = defineStore('userInfo', {
  state: () => {
    return {
      panelLocation: { lx: 60, ly: 120 },
    }
  },
  persist: true, //持久化
  actions: {  //支持异步
  },
  getters: {
  }
})
