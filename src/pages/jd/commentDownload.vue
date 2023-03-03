<template>
<!-- 此处只定义执行方法, 评价下载公共面板在全局已挂载 -->
   <div></div>
   <!-- <commentPanel /> -->
</template>
<script setup>


//公共的store数据 
import {commentStore} from '../../components/comStore' 
const store = commentStore() 
const { openCom, percentage, dataWithPic, dataNoPic, docName, withPic } = storeToRefs(store)



const dataWithPicTemp = reactive({self:[]})
const dataNoPicTemp = reactive({self:[]})
const commodityId = ref(null)

    const  startDownload = async (num) =>{
        let skuUrl = window.location.href
        if(skuUrl.indexOf('item.jd') == -1) return ElMessage.error({message: '请进入商品页面,再点击下载', duration: 2000})
        let regs = skuUrl.match(/item.jd.com.*?(\d+)/)
        if(regs == null) return ElMessage.error({ message: '当前链接不是商品页面', showClose: true, duration: 46000 })
        commodityId.value = regs[1]
        docName.value = API.dayjs().format('YYYYMMDD') + commodityId.value
        openCom.value = true
        percentage.value = 10
        await getWholeData(num)
    }
    const getWholeData = async (num) =>{  //获取完整数据
        percentage.value = 30
        dataWithPicTemp.self = await getCommentsData(num, "pic")
        percentage.value = 70
        if(dataWithPicTemp.self.length == 0){ 
            console.log('当前商品未找到有图评价: =============');
            ElMessage.error({ message: '当前商品未找到有图评价', showClose: true, duration: 6000 })
            dataWithPic.value.length = 1  //没有评价时,给个null值,关闭loading效果
            withPic.value = '无图评价'  //有图评价没有时,自动切换到无图评价
            }else{
                let resultArr = []
                dataWithPicTemp.self.map(item => resultArr.push({time: item['time'], content: item['content'], imglist: item['imgs'],videoUrl: item['videos'][0]}))
                dataWithPic.value = resultArr
            }
        dataNoPicTemp.self = await getCommentsData(num, "nopic")
        percentage.value = 100
        if(dataNoPicTemp.self.length == 0){ 
            ElMessage.error({ message: '当前商品未找到无图评价', showClose: true, duration: 6000 })
            dataNoPic.value.length = 1
            // this.withPic = '有图评价'
            }else{
                let resultArr = []
                dataNoPicTemp.self.map(item => resultArr.push({time: item['time'], content: item['content']}))
                dataNoPic.value = resultArr
            }
    }
    const getCommentsData = async (cnum, pic_flag) =>{
        
    let commentUrl = "https://club.jd.com/comment/skuProductPageComments.action?callback=fetchJSON_comment98&productId=" + commodityId.value + "&score=0&sortType=5&page=0&pageSize=10&isShadowSku=0&fold=1"
    // 创建需要抓取的评价JSON链接数组 和 总页数
    let json_url_list = new Array();
    let total_page = 0;
    let tpage1 = parseInt(cnum * 10 / 100); 
    let tpage2 = cnum % 10;
    if(cnum < 10){
        total_page = 1;
    }else{
        if(tpage2 != 0){
            total_page = tpage1 + 1;
        }else{
            total_page = tpage1;
        }
    }
    for(var i = 0; i < total_page; i++){
        let jsonUrl = "https://club.jd.com/comment/skuProductPageComments.action?productId=" + commodityId.value + "&score=0&sortType=5&page=" + i + "&pageSize=10&isShadowSku=0&fold=1"
        // console.log('jsonUrl: ', jsonUrl);
        json_url_list.push(jsonUrl)
        // console.log('json_url_list: ', json_url_list);
    }

    // 获取数据
    let sumData = new Array();
    for(var i = 0; i< total_page; i++){
        let msg = {
            type: 'myfetch',
             
            config: { 
                method: 'GET',
                responseType: 'GBKJSON', 
                headers: {
                    'Content-Type': 'application/json'
                },
                url: json_url_list[i]
            }
        }
    
        let jsondata = await API.sendMessage(msg)
        jsondata = JSON.parse(jsondata)

        let nowPage = 0;
        if (jsondata.csv != undefined && jsondata.csv.indexOf('pageSize=') > -1 ){
            let regs = jsondata.csv.match(/pageSize=.*?(\d+)/);
            nowPage = regs != null ? regs[1] : 0;
        }
        // 获取最大页码
        let maxPage = jsondata.maxPage;
        // 初始化评价时间，默认获取当前时间
        // let nowTime = getMyDateTime();
        // let nowTime = dayjs().format('YYYY-MM-DD HH:MM:SS')
        let nowTime = API.dayjs().format('YYYYMMDD HH:MM:SS')

        let cmt_list = jsondata.comments
        for(var j = 0; j < cmt_list.length; j++){
            // 初始化序号
            let order = j + (nowPage-1) * 10 + 1;
            if (order <= cnum && nowPage <= maxPage){
                // 初始化每条评价的图片链接
                let imgUrls = new Array();
                // 初始化每条评价的视频链接
                let videoUrls = new Array();
                // 评价内容
                let content = cmt_list[j].content != undefined ? cmt_list[j].content : undefined;
                // 追加评价
                let after_content = cmt_list[j].afterUserComment != undefined ? cmt_list[j].afterUserComment : undefined;
                // 所有评价
                let all_content = "";
                if(content != undefined){
                    all_content = content.replace(/\n/g, ';')
                }
                if(after_content != undefined){
                    if (after_content.content != undefined){
                        all_content = all_content + ' ' + after_content.content.replace(/\n/g, ';')
                    }
                }
                
                // 评价时间
                let ctime = cmt_list[j].creationTime != undefined ? cmt_list[j].creationTime : nowTime;
                // 判断是否是无图
                let isNoPic = cmt_list[j].images != undefined ? false : true;

                if (cmt_list[j].images != undefined) {
                    for(var imgs = 0; imgs < cmt_list[j].images.length; imgs++){
                        let img_obj = cmt_list[j].images[imgs]
                        let imgObjUrl = undefined
                        if (cmt_list[j].images[imgs].imgUrl != undefined){
                            imgObjUrl = cmt_list[j].images[imgs].imgUrl
                            imgObjUrl = imgObjUrl.replace('.avif', '')
                            //imgObjUrl = imgObjUrl.replace('shaidan/s', '_jfs/')
                            imgObjUrl = "https:" + imgObjUrl
                            let regsi = imgObjUrl.match(/shaidan\/s.*?(\d+)_jfs/)
                            if(regsi != null){
                                imgObjUrl = imgObjUrl.replace(regsi[0], 'shaidan/jfs')
                            }
                            imgUrls.push(imgObjUrl)
                        }
                    }
                }
                if (cmt_list[j].videos != undefined) {
                    for(var vis = 0; vis < cmt_list[j].videos.length; vis++){
                        let video_obj = cmt_list[j].videos[vis]
                        let videoObjUrl = undefined
                        if (cmt_list[j].videos[vis].remark != undefined){
                            videoObjUrl = cmt_list[j].videos[vis].remark
                            videoUrls.push(videoObjUrl)
                        }

                    }
                }
            
                if (isNoPic == false && pic_flag == 'pic'){
                    let c_obj = {"order":order, "time":ctime, "content":all_content, "imgs":imgUrls, "videos":videoUrls}
                   sumData.push(c_obj)
                }
                if (isNoPic == true && pic_flag == 'nopic'){
                    let c_obj = {"order":order, "time":ctime, "content":all_content, "imgs":imgUrls, "videos":videoUrls}
                    sumData.push(c_obj)
                }
                    // console.log('sumData: ', sumData);
            }
        }
        await API.wait(1.5)
    }
    return sumData
    }

    onMounted(()=> {
        API.emitter.on('commentDownload', async num => {
            await startDownload(num)
        })
     })

// defineExpose({ startDownload })
</script>
<style lang='scss' scoped>

</style>