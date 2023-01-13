/*
 * @Date: 2022-12-19 08:49:33
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-22 17:41:35
 */
const OSS = require('ali-oss')


export const uploadOss = function (file, uid , keypwd) {
  const promise = new Promise(function (resolve, reject) {
    const client = new OSS({
      accessKeyId: keypwd.accessKeyId,
      accessKeySecret: keypwd.accessKeySecret,
      bucket: keypwd.bucketName,
      endpoint: "https://oss-cn-shanghai.aliyuncs.com",
      })
    const imgUrl = ossPath(file, uid)  // 生成自定义文件名
    client.multipartUpload(imgUrl, file).then(function (result) {
      resolve(imgUrl)
    }).catch(function (err) {
      console.log(err)
      reject(err)
    })
  })
  return promise
}
/**
 * oss 文件格式 这个是项目中构建的存储图片的路径格式
 */
const ossPath = function (file, uid) {
  const date = new Date()
  const year = date.getFullYear()
  const month = ('0' + (date.getMonth() + 1)).slice(-2)
  const day = ('0' + date.getDate()).slice(-2)
  const imgType = file.name.split('.').pop() // 获取图片后缀
  const str = month + day + uid
  const ossImgPath = '/plugs/feedback/' + year + month + '/' + str + '.' + imgType
  return ossImgPath
}
