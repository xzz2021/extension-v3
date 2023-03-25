/*
 * @Date: 2022-10-29 16:39:29
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-25 15:22:09
 */
//------------注入函数到浏览器window---------------
// window._ = _
// window.jq = $


// 此处定义的注入js 环境  约等于   浏览器控制台========可以拿到最高权限==========
// function tte(para){
//     let ttt = window.pageConfig.product.imageList
//     window.postMessage(ttt, "*")
// }



// const xzzEval = (codeString) => {
//     let Fn = Function 
//     return new Fn('return ' + codeString )()
//   }


window.addEventListener('xzz', (params)=> {
    // console.log("🚀 ~ file: inject.js:26 ~ window.addEventListener ~ params:", params)
    try {
         /* 此处也可以直接传函数的执行体,以及形参,通过构造函数进行执行
         let fn = new Function('dd', "return dd")
         let res = fn('kjhibuu') */

        let res =  eval(params.detail.fn)
        // console.log("🚀 ~ file: inject.js:34 ~ window.addEventListener ~ res:", res)
        window.postMessage(res, "*")   //尽可能不使用通配符,明确指定来源窗口
    //     let targetOrigin = params.detail.currentHref
    //    window.postMessage(res, targetOrigin)

    } catch (error) {
    }
},false)


// let API2 = require('./aapi/index')
// ---------------------------------------------ceshi---------------------------hebing----------------------
// aa()
// window.tte = tte


// ======将所有content改成inject=====注入====的方法=======demo======不可使用,因为context的chrome不同====

// function injectScript(file_path, tag) {
//     var node = document.getElementsByTagName(tag)[0];
//     var script = document.createElement('script');
//     script.setAttribute('type', 'text/javascript');
//     script.setAttribute('src', file_path);
//     node.appendChild(script);
// }
// injectScript(chrome.runtime.getURL('./js/content.js'), 'body');