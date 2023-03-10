/*
 * @Date: 2022-11-23 17:05:18
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-10 12:00:56
 */
const getSmsCode  = async (obj) => {
    let config = {
        url: '?s=Home.Account.sendCode',
        method: 'post',
        body: obj
        }

      let msg = {type: 'myfetch', config}
      let res = await  API.sendMessage(msg)
      console.log("🚀 ~ file: loginBackend.js:15 ~ getSmsCode ~ msg:", msg)
  console.log('----验证码发送返回数据---------',res)
  // if(res.indexOf('后端服务器错误') != -1) { return ElMessage.error({ElMessage: '服务器错误,请联系后端api管理员', duration: 1000, showClose: true})}
  if (res.ret == 200 && res.msg == '') {
    ElMessage.success({ message: '验证码发送成功:请查收!', duration: 1500 })
  } else {
    ElMessage.error({ message: `验证码发送失败,原因:${res.data.msg}`, duration: 1500 })
  }
}


const submitLogin  = async (obj) => {
    let res =  await  API.sendMessage({type: 'myfetch', config:{url: '/?s=Home.Account.codelogin',body: obj }})  
    // console.log('res: ', res);
    if (res.ret == undefined) return ElMessage.error({ message: `登陆失败,后端接口异常,原因:${res}`, duration: 3000, showClose: true })
    if (res.ret == 400) return ElMessage.error({ message: `登陆失败,原因:${res.msg}`, duration: 3000, showClose: true })
    return res
}
export default {getSmsCode, submitLogin}