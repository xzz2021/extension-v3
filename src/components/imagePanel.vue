<template>
    <div class="imagePanel">
        <vxe-modal  @hide="closeMe" v-model="openImg" width="1202" :position="{top: 70}">
            <template #header></template>
            <!-- 全部内容的盒子 -->
            <div class="xzzcontainer">
                <!--标题-->
                <div class="topContainer">
                    <div class="leftSec">
                        <div class="titleSec">
                            <div class="headerTitle">图片下载</div>
                            <el-tooltip class="item" effect="dark" >
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
                    <div class="closeSec" @click="openImg = false"><svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon3-guanbi"></use></svg></div>
                </div>

                <div class="searchContainer">
                        <div class="searchBox">
                            <el-input v-model="LinkData" size="large" placeholder="请输入商品链接" clearable>
                                <template #append > <div  @click="searchBtn">搜索</div> </template>
                            </el-input>
                        </div>
                        <div class="divider"></div>
                        <div class="clearBtn">
                            <el-button @click="clearData" color="#eeeeee" size="large">清空</el-button>
                        </div>
                        <div class="dwnBtn">
                            <el-button type="primary" @click="downLoadImg('all')" size="large">一键下载</el-button>
                        </div>
                    </div>

                    <!-- 图片渲染区域 -->
                <div class="resultContainer">
                    <!-- 主图 -->
                        <div class="imgBox" v-if="mainImg.length != 0">
                            <div class="category">
                                <el-checkbox :indeterminate="isIndeterminate.self['one']" v-model="checkAll.self['one']" @change="checkAllChange($event,'one')">主图</el-checkbox>
                                <el-button text type="primary" class="dwnBtn" @click="downLoadImg('main')">下载主图</el-button>
                            </div>
                            <div class="checkList">
                                    <el-checkbox v-for="(item,index) in mainImg" v-model="item.isCheck" :key="index" @change="checkboxChange($event,index, 'one')">
                                        <el-image  :class="item.isCheck? 'hasBorder': ''" :src="item.src" fit="fill" style="width: 130px; height: 130px" ></el-image>
                                    </el-checkbox>
                            </div>
                        </div>
                    <!-- 详情图 -->
                        <div class="imgBox" v-if="detailImg.length != 0">
                            <div class="category">
                                <el-checkbox :indeterminate="isIndeterminate.self['two']" v-model="checkAll.self['two']" @change="checkAllChange($event,'two')">详情图</el-checkbox>
                                <el-button text type="primary" class="dwnBtn" @click="downLoadImg('detail')">下载详情图</el-button>
                            </div>
                            <div class="checkList">
                                    <el-checkbox v-for="(item,index) in detailImg"  v-model="item.isCheck" :key="index" @change="checkboxChange($event,index, 'two')" >
                                        <el-image :class="item.isCheck? 'hasBorder': ''" :src="item.src" fit="fill" style="width: 130px; height: 130px" ></el-image>
                                    </el-checkbox>
                            </div>
                        </div>
                    <!-- sku图 -->
                        <div class="imgBox" v-if="skuImg.length != 0">
                            <div class="category">
                                <el-checkbox :indeterminate="isIndeterminate.self['three']" v-model="checkAll.self['three']" @change="checkAllChange($event, 'three')">sku图</el-checkbox>
                                <el-button text type="primary" class="dwnBtn" @click="downLoadImg('sku')">下载sku图</el-button>
                            </div>
                            <div class="checkList">
                                    <el-checkbox v-for="(item,index) in skuImg"  v-model="item.isCheck" :key="index" @change="checkboxChange($event,index, 'three')" >
                                        <el-image :class="item.isCheck? 'hasBorder': ''" :src="item.src" fit="fill" style="width: 130px; height: 130px"  ></el-image>
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
const { openImg, percentage, mainImg, detailImg, skuImg, zipname, LinkData } = storeToRefs(store)

    const checkAll = reactive({self:{one: true, two: true, three: true}})
    const isIndeterminate = reactive({self:{one: false, two: false, three: false}})

    const checkboxChange = (event,index,id) => {
         let checkedIt = null
            let all = null
         if(id =='one'){
            all = mainImg.value.length
            mainImg.value[index].isCheck = event
            checkedIt = mainImg.value.filter(it => it.isCheck == true)
         }else if(id=='two'){
            all = detailImg.value.length
            detailImg.value[index].isCheck = event
            checkedIt = detailImg.value.filter(it => it.isCheck == true)
         }else {
            all = skuImg.value.length
            skuImg.value[index].isCheck = event
            checkedIt = skuImg.value.filter(it => it.isCheck == true)
         }

        if(checkedIt.length == 0) {
            isIndeterminate.self[id] = false
            checkAll.self[id] = false
        } else if(checkedIt.length == all){
            isIndeterminate.self[id] = false
            checkAll.self[id] = true
        }else{
            isIndeterminate.self[id] = true
        }
    }

    const checkAllChange = (event,id) => {  //选中状态双向绑定切换
            checkAll.self[id] = event
            isIndeterminate.self[id] = false
            if(id =='one'){
                 mainImg.value.map(item => item.isCheck = event)
                }else if(id=='two'){
                    detailImg.value.map(item => item.isCheck = event)
                }else {
                    skuImg.value.map(item => item.isCheck = event)
                }
        }
    
    const searchBtn = () =>{
        console.log('搜索功能')
      }
    const  clearData = () => {
            LinkData.value = ''
            store.$reset()
        }
    const  closeMe =  () =>{
        clearData()
        }
    const   downLoadImg = async (arg) => {
            let type = arg == 'main' ? '主图' : arg == 'detail' ? '详情图' : arg == 'sku' ? 'sku图' : '全部图片' 
            let newzipname = zipname.value + type
            let selectData = []
            
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
            // console.log('selectData: ', toRaw(selectData));
            selectData = selectData.filter(item=>item.isCheck == true)
            selectData = toRaw(selectData)
            if(selectData.length == 0) return this.$message.error('数据为空,请重新选择下载')
            // console.log('===========zhixing-===1111===========')
            //保存每一张图片
            let selectZip = new API.JSZip() 
            selectData.forEach( (item, index) => {
                let base64URL =  API.imgToBase64(item.src)
                selectZip.file(item.name, base64URL, {base64: true})
            })

            //生成压缩包并下载
            let dataSave = await selectZip.generateAsync({ type: 'blob', compression: 'DEFLATE', compressionOptions: { level: 1 } })
            API.saveAs(dataSave, `${newzipname}.zip`)
            API.emitter.emit('addTask', { filetype: 'zip', taskname: `${newzipname}.zip`, size: dataSave.size, progress: 100 })
        }

</script>
<style lang='scss' scoped>
@import '../css/sass/imagePanel.scss';
</style>