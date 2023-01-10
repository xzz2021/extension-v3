<template>
    <div class="imageDownload">
        <vxe-modal  @hide="closeMe" v-model="openImg" width="1202" :position="{top: 70}">
            <template #header></template>
            <!-- 全部内容的盒子 -->
            <div class="xzzcontainer">
                <!--标题-->
                <div class="topContainer">
                    <div class="leftSec">
                        <div class="titleSec">
                            <div class="headerTitle">图片下载</div>
                            <el-tooltip class="item" effect="dark" placement="top">
                                <template class="topTip" #content>
                                    <div style="margin-bottom: 5px;">1、软件会自动获取当前商品图片及链接地址;</div>
                                    <div style="margin-bottom: 5px;">2、根据主图,详情图,sku图自动分类排序;</div>
                                    <div style="margin-bottom: 5px;">3、可以取消勾选不想下载的图片;</div>
                                    <div style="margin-bottom: 5px;">4、然后点击相应类别下载或者全部下载!</div>
                                </template>
                                <div class="xzzsvg"><svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon2-tishi"></use></svg></div>
                            </el-tooltip>
                        </div>
                            <div class="myProgress" v-if="percentage != 0">
                              <!-- <span class="tiploading">{{percentage == 100 ? '已完成':'加载中'}}</span> -->
                              <span class="tiploading">加载进度</span>
                              <span class="pro"><el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" /></span>
                            </div>
                    </div>
                    <div class="closeSec" @click="openImg = false"><svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon2-headerClose"></use></svg></div>
                </div>

                <div class="searchContainer">
                        <div class="searchBox">
                            <el-input v-model="LinkData" placeholder="请输入商品链接" clearable>
                                <template #append > <div  @click="searchBtn">搜索</div> </template>
                            </el-input>
                        </div>
                        <div class="divider"></div>
                        <div class="clearBtn">
                            <el-button @click="clearData">清空</el-button>
                        </div>
                        <div class="dwnBtn">
                            <el-button type="primary" @click="downLoadImg('all')">一键下载</el-button>
                        </div>
                    </div>

                    <!-- 图片渲染区域 -->
                <div class="resultContainer">
                    <!-- 主图 -->
                        <div class="imgBox" v-if="mainImg.length != 0">
                            <div class="category">
                                <el-checkbox :indeterminate="isIndeterminate.one" v-model="checkAll.one" @change="checkAllChange($event, 'mainImg','one')">主图</el-checkbox>
                                <el-button type="text"  class="dwnBtn" @click="downLoadImg('main')">下载主图</el-button>
                            </div>
                            <div class="checkList">
                                    <el-checkbox v-for="(item,index) in mainImg"  :value="item.isCheck" :key="index"  >
                                        <el-image :class="item.isCheck? 'hasBorder': ''" :src="item.src" fit="fill" style="width: 130px; height: 130px" @click="changeCheck(item,index,'mainImg')" ></el-image>
                                    </el-checkbox>
                            </div>
                        </div>
                    <!-- 详情图 -->
                        <div class="imgBox" v-if="detailImg.length != 0">
                            <div class="category">
                                <el-checkbox :indeterminate="isIndeterminate.two" v-model="checkAll.two" @change="checkAllChange($event, 'detailImg','two')">详情图</el-checkbox>
                                <el-button type="text"  class="dwnBtn" @click="downLoadImg('detail')">下载详情图</el-button>
                            </div>
                            <div class="checkList">
                                    <el-checkbox v-for="(item,index) in detailImg"  :value="item.isCheck" :key="index"  >
                                        <el-image :class="item.isCheck? 'hasBorder': ''" :src="item.src" fit="fill" style="width: 130px; height: 130px" @click="changeCheck(item,index,'detailImg')" ></el-image>
                                    </el-checkbox>
                            </div>
                        </div>
                    <!-- sku图 -->
                        <div class="imgBox" v-if="skuImg.length != 0">
                            <div class="category">
                                <el-checkbox :indeterminate="isIndeterminate.three" v-model="checkAll.three" @change="checkAllChange($event, 'skuImg','three')">sku图</el-checkbox>
                                <el-button type="text"  class="dwnBtn" @click="downLoadImg('sku')">下载sku图</el-button>
                            </div>
                            <div class="checkList">
                                    <el-checkbox v-for="(item,index) in skuImg"  :value="item.isCheck" :key="index"  >
                                        <el-image :class="item.isCheck? 'hasBorder': ''" :src="item.src" fit="fill" style="width: 130px; height: 130px" @click="changeCheck(item,index,'skuImg')" ></el-image>
                                    </el-checkbox>
                            </div>
                        </div>
                </div>
            </div>
        </vxe-modal>
        
    </div>
</template>


<script setup>


//公共的store数据 
import {comStore} from './comStore' 
const store = comStore() 
const { openImg, percentage, mainImg, detailImg, skuImg } = storeToRefs(store)


// Reflect
// 


// this.$nextTick(callback)



//






        const  LinkData = ref('')
        const zipname = ref('')
        const checkAll = {one:true,two:true,three:true}
        const isIndeterminate = {one:false,two:false,three:false}

        const checkAllChange = (event, arg,id) => {  //选中状态双向绑定切换
            checkAll[id] = event
            isIndeterminate[id] = false
            [arg].value.map(item => item.isCheck = event)
        }
        const changeCheck = (item,index, arg,id) =>{  //选中事件监听
        let all = [arg].value.length 
        [arg].value[index].isCheck = !item.isCheck
        let checkedIt = [arg].value.filter(item => item.isCheck == true)
        if(checkedIt.length == 0) {
            isIndeterminate[id] = false
            checkAll[id] = false
        } else if(checkedIt.length == all){
            isIndeterminate[id] = false
            checkAll[id] = true
        }else{
            isIndeterminate[id] = true
        }
      }
      const searchBtn = () =>{
        console.log('搜索功能')
      }
     const startDownload = async (platform) =>{
            openImg.value = true
            percentage.value = 10
            let url = location.href
            LinkData.value = url
            let plattitle = platform == 'pc' ? '电脑端' : '移动端'
            let shopId = url.match(/com\/(\d*)/g)[0].slice(4)
            zipname.value = '京东' + dayjs().format('YYYYMMDD') + plattitle + shopId
            platform == 'pc' ? await getData() : await getDataMobile()
            
        }
    const  clearData = () => {
            LinkData.value = ''
            store.$reset()
        }
    const  closeMe =  () =>{
        clearData()
        }
    const  getData = async () => {
            await getMainImg()
            // console.log('mainImg: ', this.mainImg)
            percentage.value = 30
            await getDetailImg()
            percentage.value = 80
            // console.log('detailImg: ', this.detailImg)
            await getSkulImg()
            percentage.value = 100
            // console.log('skuImg: ', this.skuImg)
        }
    const  getDataMobile = async () =>{
            await getMainImgm()
            percentage.value = 30
            // console.log('mainImgmmm: ', this.mainImg)
            await getDetailImgm()
            detailImg.value.map(item => {
                item.src = item.url
                item.isCheck = true})
                //修改指定键
            percentage.value = 80
            // console.log('detailImgmmmm: ', this.detailImg)
            await getSkulImgm()
            percentage.value = 100
            // console.log('skuImgmmm: ', this.skuImg)
        }
        // 获取PC端主图链接
    const   getMainImg = async () => {
            if (document.getElementById('spec-list') != null) {
                let mainImgEles = document.getElementById('spec-list').getElementsByTagName('img');
                let mainl = mainImgEles.length
                if (mainl > 0) {
                    for (let i = 0; i < mainl; i++) {
                        let mainImgUrl = mainImgEles[i].currentSrc;
                        let urlregs = mainImgUrl.match(/.com\/.*?jfs/)
                        if (urlregs != null) {
                            mainImgUrl = mainImgUrl.replace(urlregs[0], '.com/n1/jfs').replace('.avif', '')
                        }
                        let name = '主图' + (i + 1) + '.jpg';
                        let src = mainImgUrl;
                        mainImg.value.push({ name, src, isCheck:true })
                    }
                }
            }
        }
        //获取PC详情图-zz
    const   getDetailImg = async() =>{
            // 获取skuID
            let skuId = undefined;
            let skuUrl = window.location.href;
            let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
            if (skuUrlregs != null) {
                skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
            }

            // 获取mainSkuId
            let mainSkuId = undefined;
            let regsmain = document.getElementsByTagName('html')[0].innerHTML.match(/mainSkuId:.*?(\d+)/);
            if (regsmain != null) {
                mainSkuId = regsmain[1];
            }

            // 获取详情图JSON链接 
            let dtlUrl = "https://cd.jd.com/description/channel?skuId=" + skuId + "&mainSkuId=" + mainSkuId + "&charset=utf-8";
            let config = {
                method: 'GET',
                url: dtlUrl
            }
            let htmlres1 = await 浏览器_跨域axios(config);
            let htmlres = htmlres1.data.content;

            var img = htmlres.match(/(http:\/\/.*?avif)/ig);
            if (img == null) {
                img = htmlres.match(/(https:\/\/.*?avif)/ig);

            }
            if (img == null) {
                img = htmlres.match(/(image:url\(\/\/.*?avif)/ig);
            }
            if (img == null) {
                img = htmlres.match(/\/\/.*?.avif/ig);
            }

            let img_list = new Array()
            for (var i = 0; i < img.length; i++) {
                if (img[i].indexOf('.jpg') > -1 || img[i].indexOf('png') > -1 || img[i].indexOf('gif') > -1) {
                    let img_url = img[i].match('.+\\.(jpg|png|gif)')[0]
                    img_url = img_url.replace('image:url(', 'https:');
                    img_url = img_url.replace('http:', 'https:');
                    img_url = img_url.replace('.avif', '');
                    img_list.push(img_url);
                }
            }
            img_list.forEach((item, index) => {
                this.detailImg.push({ src: item, name: '详情图' + (index + 1) + '.jpg', isCheck:true })
            })
        }
        // 获取PC端SKU图
    const   getSkulImg = async() => {
            if (document.getElementById('choose-attr-1') != null) {
                if (document.getElementById('choose-attr-1').getElementsByTagName('a').length > 0) {
                    let skuList = document.getElementById('choose-attr-1').getElementsByTagName('a');
                    for (let i = 0; i < skuList.length; i++) {
                        let skuData = skuList[i];
                        // 获取sku图链接
                        let skuUrl = undefined;
                        if (skuData.getElementsByTagName('img').length > 0) {
                            skuUrl = skuData.getElementsByTagName('img')[0].currentSrc;
                            let urlregs = skuUrl.match(/.com\/.*?jfs/)
                            if (urlregs != null) {
                                skuUrl = skuUrl.replace(urlregs[0], '.com/n1/jfs')
                                skuUrl = skuUrl.replace('.avif', '')
                            }
                        }
                        // 获取sku名称
                        let skuName = "SKU图" + i.toString();
                        if (skuData.getElementsByTagName('i').length > 0) {
                            skuName = "SKU图-" + skuData.getElementsByTagName('i')[0].innerText;
                        }
                        // result.push({"url" : skuUrl, "name" : skuName})
                        // this.skuImg.push({name:`${skuName.toString()}.jpg`,url:skuUrl})
                        this.skuImg.push({ name: `SKU图${i + 1}.jpg`, src: skuUrl, isCheck:true })
                    }
                }
            }
        }
    const   getMainImgm = async () => {
            // 获取skuID
            let skuId = undefined;
            let skuUrl = window.location.href;
            let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
            if (skuUrlregs != null) {
                skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
            }

            // 获取移动端主图链接
            let url = "https://item.m.jd.com/product/" + skuId + ".html"
            let config = {
                method: 'GET',
                url
            }
            let htmlres1 = await 浏览器_跨域axios(config);
            let htmlres = htmlres1.data;
            let regs = htmlres.match(/\"image\":\[.*?(\S+)\],\"shopInfo\"/)
            if (regs != null) {
                let imgstrall = regs[1].replace(/"/g, '').split(',');
                //https://m.360buyimg.com/mobilecms/jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg
                if (imgstrall instanceof Array) {
                    for (var i = 0; i < imgstrall.length; i++) {
                        let name = '主图' + (i + 1) + '.jpg';
                        let src = "https://m.360buyimg.com/mobilecms/" + imgstrall[i];
                        this.mainImg.push({ name, src, isCheck:true })
                    }
                }
            }
        }
    const   getDetailImgm = async () => {
            // 获取skuID
            let skuId = undefined;
            let skuUrl = window.location.href;
            let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
            if (skuUrlregs != null) {
                skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
            }

            let url = 'https://api.m.jd.com/ware/detail/getIntroduceInfo?appid=m_core&functionId=item_intruduce_info&body={"par":"' + skuId + '_d' + skuId + '_normal"}'

            await fetch(url).then((res) => {
                return res.text()
            }).then((res1) => {
                let res2 = res1.replace(/\\"/g, '')
                let regs = res2.match(/http.*?jpg/gi)
                if (regs != null) {
                    for (var i = 0; i < regs.length; i++) {
                        let imgstr = regs[i].replace('.avif', "").replace('http', 'https')
                        this.detailImg.push({ name: `详情图${i + 1}.jpg`, url: imgstr })
                    }
                }
                let regs2 = res2.match(/http.*?png/gi)
                if (regs2 != null) {
                    for (var i = 0; i < regs2.length; i++) {
                        let imgstr = regs2[i].replace('.avif', "").replace('http', 'https')
                        this.detailImg.push({ name: `详情图${i + 1}.jpg`, url: imgstr })
                    }
                }
                let regs3 = res2.match(/http.*?gif/gi)
                if (regs3 != null) {
                    for (var i = 0; i < regs3.length; i++) {
                        let imgstr = regs3[i].replace('.avif', "").replace('http', 'https')
                        this.detailImg.push({ name: `详情图${i + 1}.jpg`, url: imgstr })
                    }
                }

                let regs4 = res1.match(/sku\/jfs(.*?)jpg/g)
                if (regs4 != null) {
                    for (let k = 0; k < regs4.length; k++) {
                        let url = 'https://m.360buyimg.com/' + regs4[k]
                        this.detailImg.push({ name: `详情图${k + 1}.jpg`, url })
                    }
                }
                let regs5 = res1.match(/sku\/jfs(.*?)png/g)
                if (regs5 != null) {
                    for (let k = 0; k < regs5.length; k++) {
                        let url = 'https://m.360buyimg.com/' + regs5[k]
                        this.detailImg.push({ name: `详情图${k + 1}.jpg`, url })
                    }
                }
                let regs6 = res1.match(/sku\/jfs(.*?)gif/g)
                if (regs6 != null) {
                    for (let k = 0; k < regs6.length; k++) {
                        let url = 'https://m.360buyimg.com/' + regs6[k]
                        this.detailImg.push({ name: `详情图${k + 1}.jpg`, url })
                    }
                }
            })
        }
    const   getSkulImgm = async () =>  {
            // 获取skuID
            let skuId = undefined;
            let skuUrl = window.location.href;
            let skuUrlregs = skuUrl.match(/item.jd.com.*?(\d+)/);
            if (skuUrlregs != null) {
                skuId = skuUrlregs.length >= 2 ? skuUrlregs[1] : undefined;
            }

            let url = "https://item.m.jd.com/product/" + skuId + ".html"
            let config = {
                method: 'GET',
                url
            }
            let htmlres1 = await 浏览器_跨域axios(config);
            let htmlres = htmlres1.data;
            // console.log('htmlres: ==============', htmlres);
            let regs = htmlres.match(/\"newColorSize\":\[(.*?)\],\"errCode\"/)
            if (regs != null) {
                let imgobjall = regs[1].split('},');
                if (imgobjall instanceof Array) {
                    for (var i = 0; i < imgobjall.length; i++) {
                        let objstr = imgobjall[i];
                        if (objstr.indexOf('}') == -1) {
                            objstr = objstr + '}';
                            let objjson = jq.parseJSON(objstr);
                            //console.log(objjson)
                            if (objjson.imagePath != undefined) {
                                let imgUrl = "https://m.360buyimg.com/mobilecms/" + objjson.imagePath;
                                // let skuname = objjson['1'];
                                // let type = objjson['2'];
                                // let type2 = objjson['3'].replace(/[^\u4e00-\u9fa5^a-zA-Z^\d\[\]]\【\】]/gi, "_");
                                // let skuNameAll = "SKU图_" + skuname + '_' + type + '_' + type2;
                                //https://m.360buyimg.com/mobilecms/s750x750_jfs/t1/216662/8/14146/130257/62286b0dE9672aa78/edb22fd36dfd0481.jpg!q80.dpg
                                // let img_obj = {
                                //     "url": imgUrl,
                                //     "name": skuNameAll
                                // }
                                // skuImgList.push(img_obj);
                                let name = `SKU图${(i + 1)}.jpg`
                                this.skuImg.push({ name, src: imgUrl, isCheck:true })
                            }
                        }
                    }
                }
            }
        }
    const   downLoadImg = async (arg) => {
            let type = arg == 'main' ? '主图' : arg == 'detail' ? '详情图' : arg == 'sku' ? 'sku图' : '全部图片' 
            let newzipname = zipname.value + type
            let selectData = []
            let selectZip = new JSZip()
            switch (arg) {
                case 'main': selectData = mainImg.value
                    break;
                case 'detail': selectData = detailImg.value
                    break;
                case 'sku': selectData = skuImg.value
                    break;
                case 'all': selectData = [...mainImg.value, ...detailImg.value, ...skuImg.value]
                    break;
                default: ''
                    break
            }
            selectData = selectData.filter(item=>item.isCheck == true)
            if(selectData.length == 0) return this.$message.error('数据为空,请重新选择下载')
            //保存每一张图片
            selectData.forEach((item, index) => {
                let base64URL =  API.imgToBase64(item.url)
                selectZip.file(item.name, base64URL, {base64: true})
            })
            //生成压缩包并下载
            let dataSave = await selectZip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 1 } })
            saveAs(dataSave, newzipname)
            API.emitter.emit('addTask', { filetype: 'zip', taskname: `${newzipname}.zip`, size, progress: 100 })
        }

</script>
<style lang='scss' scoped>
@import '../css/sass/imagePanel.scss';
</style>