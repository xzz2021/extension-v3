/*
 * @Date: 2022-12-07 17:14:09
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-07 18:01:29
 */

// 此文件定义二次promise封装的chrome api,为了自定义并方便拿到返回值
const chromeApi = {

    // 实现文件(视频)下载并返回size
    download(obj){
    console.log('------------我zhixing了-------------------------')
    // let obj = { url: message.url, filename: message.name }
        return new Promise((resolve, reject) => {
            chrome.downloads.download(obj, () => {
                fetch(obj.url).then( (res)=> res.blob()).then((res)=>
                    resolve(res.size)
                )
                 })
        })
    }
}

export default { chromeApi }