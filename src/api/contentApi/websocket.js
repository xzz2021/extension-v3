





function createWsConnect() {
  const ws = new WebSocket('ws://localhost:7777')
  ws.onopen = (e) => {
    console.log('---bg----连接----正常-----:', new Date())
    ws.send("bg")
  }
  
  ws.onmessage = (e) => {
      if(JSON.parse(e.data) == '编译完成了bg'){
        API.sendMessage({type: 'complier'})
      }
  }
ws.onclose =  (e) => {
    console.log('--------bg--------断开------:',e.code,'----------', new Date())
  }
ws.onerror =  (e) => {
    console.log('-------bg-----连接出错------:', new Date())
  }
}

DEBUG ? createWsConnect() : ''