<template>
<div class="commentPanel">
        <vxe-modal  @hide="clearData" v-model="openCom" width="1202" :position="{top: 70}">
            <template #header></template>
            <!-- 全部内容的盒子 -->
            <div class="xzzcontainer">
                <!--标题-->
                <div class="topContainer">
                    <div class="leftSec">
                        <div class="titleSec">
                            <div class="headerTitle">评价下载</div>
                            <el-tooltip class="item" effect="dark" >
                                <template class="topTip" #content>
                                    <div style="margin-bottom: 5px;">1、软件会自动获取当前商品用户评价;</div>
                                    <div style="margin-bottom: 5px;">2、点击有图评价和无图评价按钮可以切换相应数据;</div>
                                    <div style="margin-bottom: 5px;">3、点击表格下载,会自动下载当前表格数据</div>
                                </template>
                                <div class="xzzsvg"><svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon3-tishi"></use></svg></div>
                            </el-tooltip>
                        </div>
                            <div class="myProgress" v-if="percentage != 0">
                              <span class="tiploading">加载进度</span>
                              <span class="pro"><el-progress :text-inside="true" :stroke-width="20" :percentage="percentage" /></span>
                            </div>
                    </div>
                    <div class="closeSec" @click="openCom = false"><svg class="xzzsymbol" aria-hidden="true"><use xlink:href="#xzzicon3-guanbi"></use></svg></div>
                </div>

                <div class="funcContainer">
                        <div class="selectBox">
                            <el-radio-group v-model="withPic" fill="#f8f8f8" text-color="#ff9712">
                              <el-radio-button label="有图评价"></el-radio-button>
                              <el-radio-button label="无图评价"></el-radio-button>
                            </el-radio-group>
                        </div>
                        <div class="dwnBtn">
                            <el-button type="primary" size="large" @click="downLoadExcel">表格下载</el-button>
                        </div>
                    </div>

                    <!-- 结果渲染区域 -->
                <div class="resultContainer">
                <div v-if="withPic == '有图评价'" class="picBox">
                    <vxe-table  width="auto" height="660" :data="dataWithPic" ref="table1" size="small" border
                        :loading="dataWithPic.length == 0" show-overflow="false" stripe >
                        <vxe-column type="seq" title="序号" width="60"></vxe-column>
                        <vxe-column title="评价时间" field="time" width="180"></vxe-column>
                        <vxe-column title="内容评价" field="detail" width="300" >
                          <template #default="{ row }">
                            <div class="commentCon">
                                <el-tooltip placement="top" style="width:200px;" :content="row.content">
                                    <div  class="content">{{row.content}}</div>
                                </el-tooltip>
                            </div>
                          </template>
                        </vxe-column>
                        <vxe-column field="videoUrl" title="视频链接" width="295" >
                            <template #default="{ row }">
                            <div class="videoCon">
                                <!-- <el-tooltip placement="top-start" width="200" :content="row.videoUrl"> -->
                                    <div class="videourl">{{row.videoUrl}}</div>
                                    <!-- <div  class="videourl">{{row.videoUrl}}</div> -->
                                <!-- </el-tooltip> -->
                            </div>
                          </template>
                        </vxe-column>
                        <vxe-column title="图片" width="290">
                          <template #default="{ row }">
                            <div class="imgCon">
                                <div class="list"  v-for="(item,index) in row.imglist" :key="index">
                                    <el-image :src="item" fit="fill" alt="" style="width: 56px; height: 56px" :preview-src-list="row.imglist" />
                                </div>
                            </div>
                          </template>
                        </vxe-column>
                    </vxe-table>
                </div>
                <div v-else class="noPicBox">
                    <vxe-table width="auto" height="660" :data="dataNoPic" ref="table1" size="small" border
                        :loading="dataNoPic.length == 0" show-overflow="false" stripe  >
                        <vxe-column type="seq" title="序号" width="60"></vxe-column>
                        <vxe-column title="评价时间" field="time" width="170"></vxe-column>
                        <vxe-column title="内容评价" field="detail" width="900" >
                          <template #default="{ row }">
                            <div class="commentCon">
                                <el-tooltip placement="top" width="200" :content="row.content">
                                    <div  class="content">{{row.content}}</div>
                                </el-tooltip>
                            </div>
                          </template>
                        </vxe-column>
                    </vxe-table>
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
const { openCom, percentage, dataWithPic, dataNoPic, withPic, docName } = storeToRefs(store)



    const  dwnPic = async () => {   //有图下载

        if(dataWithPic.value[0] == undefined){ return ElMessage.error({message: '当前商品没有有图评价数据,无法下载!', duration: 2000})}
       let commentList = dataWithPic.value.map(n => {
                let temp = {
                    content: n.content,
                    videoUrl: n.videoUrl || ''
                }
                n.imglist.map((n, i) => {
                    temp[`pic${i + 1}`] = n
                })
                return temp
            })
            let head = [
                { title: '评价内容', key: 'content', type: 'text' },
                { title: '视频链接', key: 'videoUrl', type: 'text' },
                { title: '图片1', key: 'pic1', type: 'image', width: 130, height: 130 },
                { title: '图片2', key: 'pic2', type: 'image', width: 130, height: 130 },
                { title: '图片3', key: 'pic3', type: 'image', width: 130, height: 130 },
                { title: '图片4', key: 'pic4', type: 'image', width: 130, height: 130 },
                { title: '图片5', key: 'pic5', type: 'image', width: 130, height: 130 },
                { title: '图片6', key: 'pic6', type: 'image', width: 130, height: 130 },
            ]
            let excelName = `${docName.value}_有图商品评价.xls`
            let size = await API.tableToExcel(head, commentList, excelName)
            API.emitter.emit('addTask', { filetype: 'doc', taskname: excelName, size, progress: 100 })
    }
    const  dwnNoPic = async () =>{   //无图下载

        if(dataNoPic.value[0] == undefined){ return ElMessage.error({message: '当前商品没有无图评价,无法下载!', duration: 2000})}
        let column = [
            {
              title: '评价内容', 
              key: 'content',
              type: 'text',
              width: 150,
              height: 150
            }
        ]

        let excelName = `${docName.value}_无图商品评价.xls`
        let size =  await API.tableToExcel(column, dataNoPic.value, excelName)
        API.emitter.emit('addTask',{filetype: 'doc',taskname: excelName,size, progress: 100})
        
    }
    const downLoadExcel = async () =>{
        withPic.value == '有图评价' ? await dwnPic() : await dwnNoPic()
    }
    const clearData = () => {
    store.$reset()
    }

</script>
<style lang='scss' scoped>

@import '../css/sass/commentPanel.scss';

</style>