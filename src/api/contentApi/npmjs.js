/*
 * @Date: 2022-10-15 14:04:40
 * @LastEditors: xzz2021
 * @LastEditTime: 2022-12-01 15:27:52
 */
// const dayjs = require('dayjs')

// 此处定义所有外部引用的小模块
import dayjs from "dayjs"
import mitt from "mitt"
import JSZip  from 'jszip';
import { saveAs } from 'file-saver'
// const jszip = require('jszip')


export default {dayjs, JSZip, saveAs,  emitter:mitt()}