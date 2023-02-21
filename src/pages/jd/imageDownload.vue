<template>
<div></div>
</template>
<script setup>


//公共的store数据 
import {comStore} from '../../components/comStore' 
const store = comStore() 
const { openImg, percentage, mainImg, detailImg, skuImg, zipname, LinkData } = storeToRefs(store)

    const startDownload = async (platform) =>{
            openImg.value = true
            percentage.value = 10
            let url = location.href
            LinkData.value = url
            let plattitle = platform == 'pc' ? '电脑端' : '移动端'
            let shopId = url.match(/com\/(\d*)/g)[0].slice(4)
            zipname.value = '京东' + API.dayjs().format('YYYYMMDD') + plattitle + shopId
            getIds()
            percentage.value = 20
            platform == 'pc' ? await getData() : await getDataMobile()
            percentage.value = 100
        }


    //全局获取商品id
    const skuId = ref('')
    const mainSkuId = ref('')
    const getIds = async () =>{
                // 获取skuID
    let regs = location.href.match(/item.jd.com.*?(\d+)/);
    skuId.value = regs.length >= 2 ? regs[1] : undefined;

    // 获取mainSkuId
    // let mainSkuId = null
    let script_list = $('script');
    for(let i=0; i<script_list.length; i++){
        let script_text = script_list[i].innerText;
        if(script_text.indexOf('mainSkuId:') > -1){
            let regs = script_text.match(/mainSkuId:.*?(\d+)/);
            mainSkuId.value = regs.length >= 2 ? regs[1] : undefined; 
        }
    }
    }
    const getData = async () => {
        await getMainImg()
        percentage.value = 40
        // console.log('mainImg: ', mainImg.value);
        await getDetailImg()
        percentage.value = 60
        // console.log('detailImg: ', detailImg.value);
        await getSkulImg()
        percentage.value = 80
        // console.log('skuImg: ', skuImg.value);

    }
    const getDataMobile = async () => {
        await getMainImgm()
        await getDetailImgm()
        await getSkulImgm()
    }
    // 获取PC端主图链接
    const getMainImg = async () => {
    let main_tag_list = $('#spec-list ul li img');
    for (var i = 0; i < main_tag_list.length; i++){
        let img_url = main_tag_list[i].src;
        img_url = img_url.replace('n5/s54x54_jfs', 'n1/jfs');
        img_url = img_url.match('.+\\.(jpg|png)')[0]
        img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            // main_img_list.push(img_url);
            let name = '主图' + (i + 1) + '.jpg';
            let src = img_url;
            mainImg.value.push({name,src, isCheck: true})
            // console.log('mainImg.value: ', mainImg.value);
        }
    }
    }
    //获取PC详情图
    const getDetailImg = async () => {


    // 获取详情图JSON链接 
    let dtl_url 
    if (skuId.value != undefined && mainSkuId.value != undefined){
         dtl_url = "https://cd.jd.com/description/channel?skuId=" + skuId.value + "&mainSkuId=" + mainSkuId.value + "&charset=utf-8"
    }

    let msg = {
        type: 'myfetch',
         
        config: { 
            method: 'GET',
            responseType: 'GBKJSON', 
            headers: {
                'Content-Type': 'application/json'
            },
            url: dtl_url
        }
    }

    let contents = await API.sendMessage(msg)
    //let contents = response.body.content;
    var img = contents.match(/(http:\/\/\S+.avif)/ig);
    if(img == null){
        img = contents.match(/(https:\/\/\S+.avif)/ig);

    }
    if(img == null){
        img = contents.match(/(image:url\(\/\/\S+.avif)/ig);
    }
    let img_list = new Array()
    for(var i = 0; i < img.length; i++){
        if(img[i].indexOf('.jpg') > -1 || img[i].indexOf('png') > -1){
            let img_url = img[i].match('.+\\.(jpg|png)')[0]
            img_url = img_url.replace('image:url(', 'https:');
            img_url = img_url.replace('http:', 'https:');
            img_list.push(img_url);
        }
    }

    img_list.forEach((item,index)=>{
        detailImg.value.push({src: item, name: '详情图' + (index + 1) + '.jpg', isCheck: true})
        })
    }
    // 获取PC端SKU图
    const getSkulImg = async () => {

    let sku_tag_img_list = $('#choose-attrs div div div a img');
    // let sku_tag_text_list = $('#choose-attrs div div div a i');
    for (var i = 0; i < sku_tag_img_list.length; i++){
        let img_url = sku_tag_img_list[i].src;
        let img_text = sku_tag_img_list[i].alt.replace('/', '')
        img_url = img_url.replace('n9/s40x40_jfs', 'n1/jfs').match('.+\\.(jpg|png)')[0].replace('http:', 'https:')
        // img_url = img_url.match('.+\\.(jpg|png)')[0]
        // img_url = img_url.replace('http:', 'https:')
        if(img_url.indexOf('png') > -1 || img_url.indexOf('jpg') > -1){
            // let img_obj = {
            //     "url": img_url,
            //     "text": img_text
            // }
            // sku_list.push(img_obj);
            skuImg.value.push({name:`SKU图${i+ 1}-${img_text}.jpg`,src:img_url, isCheck: true})
            // console.log('skuImg.value: ', skuImg.value);
        }
    }
    }
    //----------移动端---------------
    const getMainImgm = async () => {
     let url = "https://item.m.jd.com/product/" + skuId.value + ".html"
    let msg = {
        type: 'myfetch',
        config: { 
            method: 'GET',
            responseType: 'TEXT',
            url: url
        }
    }
    let contents = await API.sendMessage(msg)
    //console.log(contents)
    // let mainImgList = new Array()
    let regs = contents.match(/\"image\":\[.*?(\S+)\],\"shopInfo\"/)
    if(regs!=null){
        let imgstrall = regs[1].replace(/"/g,'').split(',');
        //https://m.360buyimg.com/mobilecms/jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg
        if(imgstrall instanceof Array){
            for(var i = 0; i<imgstrall.length; i++){
                let name = '主图' + (i + 1) + '.jpg';
                let src = "https://m.360buyimg.com/mobilecms/" + imgstrall[i];
                mainImg.value.push({name,src, isCheck: true})
    }}}
    }
    const getDetailImgm = async () => {
        let url = 'https://api.m.jd.com/ware/detail/getIntroduceInfo?appid=m_core&functionId=item_intruduce_info&body={"par":"' + skuId.value + '_d' + skuId.value + '_normal"}'
    // let dtlImgList = new Array()
    await fetch(url).then((res) => {
        return res.text()
    }).then((res1) => {
        //console.log(res1)
        let res2 = res1.replace(/\\"/g,'')
        //console.log(res2)
        let regs = res2.match(/<img src=.*?(\S+) alt=>/gi)
        //console.log(regs)
        if(regs !=null){
            
            if(regs instanceof Array){
                for(var i=0;i<regs.length; i++){
                    let imgstr = regs[i].replace('<img src=',"");
                    let imgUrl = imgstr.replace(' alt=>',"");
                    // dtlImgList.push(imgUrl);
                    detailImg.value.push({ name: `详情图${i + 1}.jpg`, src:imgUrl, isCheck: true })
                }
            }
        }else{
            let regs = res2.match(/<img src=.*?(\S+)>/gi)
            if(regs instanceof Array){
                for(var i=0;i<regs.length; i++){
                    let imgstr = regs[i].replace('<img src=',"");
                    let imgUrl = imgstr.replace('/>',"");
                    imgUrl = imgUrl.split(' ')[0]
                    //console.log(imgUrl)
                    // dtlImgList.push(imgUrl);
                    detailImg.value.push({ name: `详情图${i + 1}.jpg`, src:imgUrl, isCheck: true })
                }
            }
        }
    })
    }
    const getSkulImgm = async () => {
        let url = "https://item.m.jd.com/product/" + skuId.value + ".html"
    let msg = {
        type: 'myfetch',
        config: { 
            method: 'GET',
            responseType: 'TEXT',
            url: url
        }
    }

    let contents = await API.sendMessage(msg)
    //console.log(contents)
    // let skuImgList = new Array()
    let regs = contents.match(/\"newColorSize\":\[(\S+)\],\"errCode\"/)
    if(regs!=null){
        let imgobjall = regs[1].split('},');
        if(imgobjall instanceof Array){
            for(var i=0; i< imgobjall.length; i++){
                let objstr = imgobjall[i];
                if(objstr.indexOf('}') == -1){
                    objstr = objstr + '}';
                    let objjson = JSON.parse(objstr);
                    //console.log(objjson)
                    if(objjson.imagePath != undefined){
                        let imgUrl = "https://m.360buyimg.com/mobilecms/" + objjson.imagePath;
                        let skuname = objjson['1'];
                        let type = objjson['2'];
                        let type2 = objjson['3'].replace(/[^\u4e00-\u9fa5^a-zA-Z^\d\[\]]\【\】]/gi, "_");
                        let skuNameAll = skuname + '_' + type + '_' + type2;
                        //https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg!q80.dpg
                        // let img_obj = {
                        //     "url": imgUrl,
                        //     "text": skuNameAll
                        // }
                        // skuImgList.push(img_obj);
                        let name = `SKU图${(i + 1)}${skuNameAll.replace('/','')}.jpg`
                        skuImg.value.push({name,src:imgUrl, isCheck: true})
                    }
                }
            }
        }
    }
    }
    //压缩并下载所有文件
    const zipData = async (arg, zipname) =>  {

    //   selectData.value = []
      let selectZip = new API.jszip()  
      //每次运行都会new一个新对象,之所以需要new一个对象,在于新赋的值都是新的new对象,没有原型链数据残留,
      //如果在API里先new,因为是全局对象,始终存在,所以会导致数据在全局累加
      switch(arg){
        case 'main':      selectData.value = mainImg.value
          break;
        case 'detail':    selectData.value = detailImg.value
          break;
        case 'sku':       selectData.value = skuImg.value
          break;
        case 'all':       selectData.value = [...mainImg.value, ...detailImg.value, ...skuImg.value]
          break;
        default: ''
          break
      }
      //保存每一张图片
        selectData.value = selectData.value.filter(item=>item.isCheck == true)
       selectData.value.forEach( (item, index) => {
        let base64URL =  API.imgToBase64(item.src)
        // console.log('base64URL: ', base64URL)
        // return
        selectZip.file(item.name, base64URL, {base64: true})
      })
      //生成压缩包并下载
    //   return
       let dataSave = await selectZip.generateAsync({type: 'blob', compression: 'DEFLATE', compressionOptions: {level: 1}})
        // console.log('dataSave: ', dataSave); //blob对象
        saveAs(dataSave, zipname)
        API.emitter.emit('addTask',{filetype: 'zip',taskname: `${zipname}.zip`,size: dataSave.size,  progress: 100})
    }
    onMounted(()=> {
        API.emitter.on('imageDownload', async platform => {
            await startDownload(platform)
        })
     })
//setup内部的实例对象默认只在内部,外部调用需要手动暴露出去
    // defineExpose({ startDownload })
</script>
<style lang='scss' scoped>
</style>