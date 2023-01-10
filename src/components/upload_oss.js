/*
 * @Date: 2022-12-19 08:49:33
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-22 17:41:35
 */
const OSS = require('ali-oss')

const client = new OSS({
accessKeyId: "LTAIIRllTKvazXEG",
accessKeySecret: "yfxn7GDQGakAxlMTjaBRv2ERA4Bm4R",
bucket: "jcl-test-plugs",
// dir: "plugs/pddzd/20221222/",
endpoint: "https://oss-cn-shanghai.aliyuncs.com",
// useFetch: true,
        // secure: false
})

export const uploadOss = function (file, uid) {


  const promise = new Promise(function (resolve, reject) {
    // const client = new OSS(obj)
    const imgUrl = ossPath(file, uid)  // 生成自定义文件名
    // console.log('imgUrl: ', imgUrl);
    // eslint-disable-next-line no-tabs
    client.multipartUpload(imgUrl, file).then(function (result) {
      // console.log('result: ', result);
      // const url = 'https://jcl-test-plugs.oss-cn-shanghai.aliyuncs.com' + imgUrl
      resolve(imgUrl)
      // console.log('imgUrl: ', imgUrl);
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
