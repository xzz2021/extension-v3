/*
 * @Date: 2022-12-06 17:13:35
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-11 16:11:58
 */




// let recconnectTime = 0



function createWsConnect() {
  window.recconnectTime ? '' : window.recconnectTime = 0
  const ws = new WebSocket('ws://localhost:7777')
  function checkConnect(){  // 不完全心跳检测,清除上次的ws,新开ws进行初始化操作
    setTimeout(() => {
      createWsConnect()
    }, 5000);
  }
  ws.onopen = (e) => {
    console.log('---bg----连接----正常-----:', new Date())
    ws.send("bg")
  }
  
  ws.onmessage = (e) => {
      if(JSON.parse(e.data) == '编译完成了bg'){
        chrome.runtime.sendMessage( {type: 'compiler'}, (response) => {
          response? resolve(response): resolve('异常中断')
        })
      }
  }
ws.onclose =  (e) => {  // 服务端或客户端主动断开时 触发
    console.log('--------bg--------断开------:',recconnectTime,'----------', new Date())
    //连接关闭后主动断开此次连接
    ws.close()
    recconnectTime ++    //  重连次数
    if(recconnectTime <= 10)  {checkConnect()}
  }
// ws.onerror =  (e) => {
//     console.log('-------bg-----连接出错------:', new Date())
//   }
}

// DEBUG ? createWsConnect() : ''