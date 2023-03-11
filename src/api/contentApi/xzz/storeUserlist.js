/*
 * @Date: 2022-11-23 17:42:52
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-11 11:55:37
 */



const getUserlist = async () => {
    //筛选获取有效期内的用户列表
    let VALIDITY_PERIOD = 15 * 24 * 60 * 60 * 1000
    let VALIDITY_TIMESTAMP = Date.now() - VALIDITY_PERIOD
    let list = await API.Storage.get('userList')
    if(list == '') return []
    let validitylist = list.filter(item => item.timeStamp > VALIDITY_TIMESTAMP)
    return validitylist

}
const storeUserlist = async () => {
    //当有账号登录时,更新存储列表
    let info = await API.Storage.get('userInfo')
    if(info == '') return console.log('----异常退出,原因:用户账号信息不存在-----')
    let list = await  API.Storage.get('userList')
    if(list == '') {
        API.Storage.set({userList: [info]})
    }else{
        let newlist = list.filter(item => item.userid != info.userid)
        newlist.push(info)
        await  API.Storage.set({userList: newlist})
    }
}

const updateUserlist = async (userInfo) => {
    userInfo.timeStamp = Date.now()
    //删除和退出账号时更新账号列表
    let aa = await  API.Storage.get('userList')

    if(aa == '') return API.Storage.set({userList: [userInfo]})

    let newinfo = aa.filter(item => item.userid != userInfo.userid)
    newinfo.push(userInfo)
    await  API.Storage.set({userList: newinfo})
}


const deleteUserlist = async (userid) => {
    let aa = await  API.Storage.get('userList')
    if(aa == '') return 
    let newList = aa.filter(item => item.userid != userid)
    await  API.Storage.set({userList: newList})
}


export default {getUserlist, storeUserlist, updateUserlist, deleteUserlist}