/*
 * @Date: 2022-10-15 14:04:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-01-11 17:56:35
 */
// const dayjs = require('dayjs')

// 此处定义所有外部引用的小模块
import dayjs from "dayjs"
import mitt from "mitt"
import JSZip  from 'jszip';
import { saveAs } from 'file-saver'  //JSZip压缩生成blob数据后必须结合file-saver使用,从而进行保存


export default {dayjs, JSZip, saveAs,  emitter:mitt()}