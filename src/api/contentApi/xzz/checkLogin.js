/*
 * @Date: 2022-12-02 17:07:14
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-09 11:33:39
 */


//监听添加移除的公共事件
const checkLogin ={
    targetEvent(e) {
      //三种方式兼容不同浏览器
      e.stopImmediatePropagation()
      e.cancelBubble = true //IE
      e.stopPropagation()
      // loginRef.value.loginShow = true  //因为api里拿不到ref所以无法抽离,只能在此处定义
      API.emitter.emit('open','login')
    },

  //未登录时的添加拦截事件
   addEvent () {
      let item = $('.entranceBox')
      let item2 = $('.el-dropdown-menu')
       for(let i=0; i<item.length; i++){
        item[i].addEventListener('click',this.targetEvent,'capture')
      }
      for(let i=0; i<item2.length; i++){
        item2[i].addEventListener('click',this.targetEvent,'capture')
      }
  },
  //登录后的移除拦截事件
   removeEvent() {
      let item = $('.entranceBox')
      let item2 = $('.el-dropdown-menu')
       for(let i=0; i<item.length; i++){
        item[i].removeEventListener('click',this.targetEvent, 'useCapture')
      }
      for(let i=0; i<item2.length; i++){
        item2[i].removeEventListener('click',this.targetEvent, 'useCapture')
      }
  }

}
  //----☆☆☆☆☆☆----------------☆☆☆☆☆☆--------


  export default { checkLogin }