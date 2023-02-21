
/*
 * @Date: 2022-10-29 16:39:29
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-21 14:38:43
 */
/*
encryption code
original code:https://github.com/xzz2021/myfunction
keyword: auto import function from file
*/

// const files = require.context('./', true, /\.js$/)

// //对象引入
// function importAllModule(files) {

//   let obj222 = {}
// //   file['keys']()  //模块名称组成的数组  [{aa: 'fn',yy: 'fn2'}, bb: {}, cc:{}]
//   let fileArr = files['keys']()
// for(let i = 0; i < fileArr.length; i++) {
//   obj222 = { ...obj222, ...fileArr[i] }
// }

//   return obj222
// }



// function importAllModule2(files){
//   const obj1={};
//   let obj2={};
//   for(let item of files['keys']()){
    
//     obj1[item]=files(item);
//     console.log("🚀 ~ file: index.js:35 ~ importAllModule2 ~ files(item)", files(item))
//   }

//     for(let item2 in obj1){
//       obj2={...obj2,...obj1[item2]};
//     }
//     console.log("🚀 ~ file: index.js:42 ~ importAllModule2 ~ obj2", obj2)
//       return obj2;
//     }

//     function importAllModule3(files){
//       const obj1=[];
//       let obj222={};
//       for(let item of files['keys']()){
//         obj1.push(files(item))
//       }
//       console.log("🚀 ~ file: index.js:51 ~ importAllModule3 ~ obj1", obj1)

//       for(let i = 0; i < obj1.length; i++) {
//         obj222 = { ...obj222, ...obj1[i] }
//       }
//       console.log("🚀 ~ file: index.js:58 ~ importAllModule3 ~ obj222", obj222)
//           return obj222;
//         }
// // Object.assign(Window, importAllModule(file))

//   let contentApi =   importAllModule3(files)

//   export {contentApi}

// console.log("🚀 ~ file: index.js:46 ~ contentApi", contentApi)

// 文件引入
//  const autoImport = req => files.keys().map(req)
//  autoImport(files)



// ----------------------搭配export default {wait222}---食用----------------------------------------
// let moduleExports = [];
// let exportObj = {};

// const r = require.context('./', true, /\.js$/);
// r.keys().forEach(key=> {
//     // let attr = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.'));
//     // console.log("🚀 ~ file: index.js:83 ~ r.keys ~ key", key)
//     try {
//       let aa = require(key);
//       moduleExports.push(aa)
      
//     } catch (error) {
      
//     }
// });
// moduleExports.forEach((item, index) => {
//   exportObj = {...exportObj,...item };
// }
//   )

// module.exports = exportObj;
//-----------------------------------------------------------------------------------------------


const fs = require('fs')
const { resolve } = require('path');

function getWholeKey(path, callback) {
  /*
  0.获取所有文件
  1. 读取第一层目录,提出文件
  2. 读取第二层目录,提出文件
  3. 读取第三层目录,提出文件
  */
 let FilesArray = {}
  fs.readdirSync(path, { withFileTypes: true}).forEach(Dirent => {
      // console.log("🚀 ~ file: index.js:72 ~ fs.readdir ~ Dirent:", Dirent)
      if(Dirent.name.includes('index.js') === true) return
      if(Dirent.isFile()){
          // console.log("🚀 ~ file: index.js:75 ~ fs.readdirSync ~ Dirent.name:", Dirent.name)
          let reqDir = `${path.replace('aapi', '.')}/${Dirent.name}`
        //   let modobj = require(reqDir)
        callback(reqDir)
        //   // console.log("🚀 ~ file: index.js:79 ~ fs.readdirSync ~ reqDir:", reqDir)
        //   FilesArray = { ...FilesArray, ...modobj }
        //   console.log("🚀 ~ file: index.js:76 ~ fs.readdirSync ~ modobj:", modobj)
      }else {
          // console.log("🚀 ~ file: index.js:76 ~ fs.readdirSync ~ `./${path}/${Dirent.name}`:", `./${path}/${Dirent.name}`)
          //第一层 mod 第二层 mod/aaa
          newpath = path + '/' + Dirent.name
          getWholeKey(newpath, callback)
      }
  })
  return FilesArray
}

// let FilesArray2 = {}
getWholeKey('aapi', (path)=> {
    let modobj = require(path)
    // console.log("🚀 ~ file: index.js:134 ~ getWholeKey ~ modobj:", modobj)
    // FilesArray2 = { ...FilesArray2, modobj }
})


// console.log("🚀 ~ file: index.js:137 ~ module:", exports)
// console.log("🚀 ~ file: index.js:132 ~ FilesArray2:", FilesArray2)
     // module.exports = oobj
// console.log("🚀 ~ file: index.js:90 ~ oobj:", oobj)
// export {oobj} 