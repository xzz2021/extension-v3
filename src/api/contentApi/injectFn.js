/*
 * @Date: 2023-02-24 08:44:55
 * @LastEditors: xzz2021
 * @LastEditTime: 2023-02-24 09:12:08
 */


// 此处函数是用于与inject通信,从而获得浏览器真实window数据
const injectFn = (fn) => {
    return new Promise((resolve, reject) => {
        try {
            window.dispatchEvent(new CustomEvent("xzz", { detail:`(${fn})()`}))
            window.addEventListener('message', function xzz(e) {
                resolve(e.data)
                window.removeEventListener('message',xzz)
            })
        } catch (error) {
            reject(error)
        }
    })
}

export default { injectFn }
