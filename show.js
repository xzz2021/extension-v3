/*
 * @Date: 2022-11-12 15:12:12
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-15 17:48:28
 */

// 这里可以定义开发时需要用到的全局变量, 生产模式会自动置反
const SHOW= {
    //调试使用
    aashow: true,
    bb: false
}







export const getShow = key => {
    if(key){
        return SHOW
    }
    else{
      for(let i in SHOW){SHOW[i] = false}
      return SHOW
    }
}