/*
 * @Date: 2022-09-15 11:21:04
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-03 09:39:31
 */

import { defineStore } from 'pinia'

//------------此处可放置任意vue实例变量-------------------------
export const piniaStore = defineStore('selfInfo', {
    // arrow function recommended for full type inference
    state: () => {
      return {
        showMain2: true,  // 是否显示主面板  //这里定义在app里无法拿到,估计是template编译时没有对pinia的.value进行转换
        panelLocation: JSON.parse(localStorage.getItem('panelLocation')) || { lx: 60, ly: 120 },
        // sitePlatform: '京东',
        // urlCheck: window.location.href.indexOf('item.jd') == -1, //检查当前页是否是商品页,true则return弹出提示

        userInfo: {
          userid: '',
          userToken: '',
          userPhone: '',
          timeStamp: ''
        },

      }
    },
    getters: {
      // panelLocation: (state) => {
      //   let aa = localStorage.getItem('panelLocation')
      //   return  aa ? JSON.parse(aa)  : { lx: 60, ly: 120 }
      // },
      userPhone: (state) => {
        if(state.userInfo.userPhone == '') return ''
        let a = state.userInfo.userPhone + ''
        let b = a.substring(3,7)
        return  a.replace(b, '****')
      },
      userid: (state) => {
        return state.userInfo.userid
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
          },
        toggleShow(){
          this.showMain2 = !this.showMain2
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
   
  })

export const userStore = defineStore('userInfo', {
  // arrow function recommended for full type inference
  state: () => {
    return {
    }
  },
  actions: { 
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