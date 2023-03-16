<template>

<el-dropdown placement="right-start" @command="commentDownload">
                      <!-- <div class="title2">有图评价下载</div> -->
                      <span class="el-dropdown-link2">
                        <div class="title2">{{title}}</div>
                        <panelXzzLogoyjt type="true"/>
                      </span>
                  <template #dropdown>
                    <el-dropdown-menu  @mouseenter.enter="openOrClose('open')"
                        @mouseleave.enter="openOrClose()">
                        <!-- <el-dropdown-menu  > -->
                    <el-dropdown-item :command="item.value" v-for="item in commentOptions"
                    :key="item.value">评价前{{ item.value }}</el-dropdown-item>
                    </el-dropdown-menu>
                  </template>
                </el-dropdown>
</template>

<script setup>
const props = defineProps(['title', 'userPhone'])

</script>
<style  lang='scss' scoped>


</style>