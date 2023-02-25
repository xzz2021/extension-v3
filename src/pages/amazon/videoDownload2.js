/*
 * @Date: 2023-02-21 17:00:05
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-24 17:43:25
 */




//通过抓取页面json数据提取所有主图视频url

 const videoDownload2 = async () => {
  let curHref = window.location.href
  if(curHref.indexOf('/dp/') == -1) return ElMessage.error({ message: `请进入商品详情页面使用`, duration: 3000, showClose: false})
        let shopId = curHref.match(/\/dp\/(.*?)\W/)[1]
        const htmlData = $('#imageBlockVariations_feature_div script').text()
        // console.log("🚀 ~ file: videoDownload2.js:19 ~ videoDownload2 ~ htmlData:", htmlData)
        let rawData = htmlData.match(/parseJSON\(\'(.*?)\'\)\;/)[1]
        // console.log("🚀 ~ file: videoDownload2.js:21 ~ videoDownload2 ~ rawData:", rawData)
        let jsonToObj = JSON.parse(rawData)
        // console.log("🚀 ~ file: app.vue:372 ~ test111 ~ jsonToObj:", jsonToObj)
        // return
        //拿到所有视频url组成的数组
        let videosArr = jsonToObj.videos.map(item => item.url)
        // console.log("🚀 ~ file: app.vue:374 ~ test111 ~ videosArr:", videosArr)
        let videoNum = videosArr.length
        if(videoNum== 0) {
          ElMessage.error({ message: `当前商品没有视频`, duration: 3 * 1000, showClose: false, })
        } else if(videoNum == 1){
          let name = API.dayjs().format('YYYYMMDD') + '_' + shopId  + '_商品视频.mp4'
            let size = await  API.sendMessage({type: 'downloads', url: videosArr[0], name})
          //获取视频体积
          API.emitter.emit('addTask', { filetype: 'video', taskname: name, size: API.caculateFileSize(size), timeStamp: Date.now(), progress: 100 })
        }else {
          ElMessage.success({ message: `当前商品有${videoNum}个视频正在全力下载,请耐心等候!`, duration: 3 * 1000, showClose: false, })
          let name = API.dayjs().format('YYYYMMDD')  +  '_' + shopId + '_批量商品视频.mp4'
          //获取视频体积
          let size
          for(let i = 0; i < videoNum; i++) {
            size += await API.sendMessage({type: 'downloads', url: videosArr[i], name: `商品${shopId}/` + `${i + 1}` + '-' + '商品视频.mp4'} );
            // console.log("🚀 ~ file: videoDownload2.js:44 ~ videoDownload2 ~ size:", size)
          }
          // videosArr.forEach(async (item, index) => {
          // })
          API.emitter.emit('addTask', { filetype: 'video', taskname: name, size: API.caculateFileSize(size), timeStamp: Date.now(), progress: 100 })
          // console.log("🚀 ~ file: videoDownload2.js:43 ~ videoDownload2 ~ size:", size)
        }
}


export { videoDownload2 }

