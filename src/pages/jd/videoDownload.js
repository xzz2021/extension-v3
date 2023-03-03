/*
 * @Date: 2023-02-21 17:00:05
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-03-03 11:25:38
 */

///////////pageConfig.product.videoData.playUrl
 const videoDownload = async () => {

    if (window.location.href.indexOf('item.jd') == -1) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
    API.emitter.emit('openPro')  //调用打开蒙版进度条
    return
    let regs = window.location.href.match(/item.jd.com.*?(\d+)/);
      let skuId = regs.length >= 2 ? regs[1] : undefined;
      $('.video-icon').click()
      let url = $('video source').attr('src')
      if(url == undefined) return  ElMessage.error({ message: '当前商品没有视频',  duration: 1500,})
      let name = new API.dayjs().format('YYYYMMDD') + '_' + skuId + '_商品视频.mp4'
    let size = await  API.sendMessage({type: 'downloads', url, name}) 
    // console.log('size: ', size);
    size && ElMessage.success({ message: `视频下载完成`, duration: 2500,})
    // return
    API.emitter.emit('addTask',{filetype: 'video',taskname: name, size,  progress: 100})
}


export { videoDownload }