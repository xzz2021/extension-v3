/*
 * @Date: 2023-02-13 17:12:25
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-21 14:28:40
 */

/**   正则_url解析所有参数
 @param {String} 参数1
 @example 
 Data_parse_url("https://mobile.yangkeduo.com/goods.html?aaa=111")
 @returns {Object} '{aaa:111}'
 */
const wait =  (seconds) => {
    console.log("🚀 ~ file: wait.js:15 ~ wait ~ seconds", seconds)
    // return  new Promise((resolve) => setTimeout(resolve, seconds * 1000));
} 

module.exports = {wait}
// export default {wait}