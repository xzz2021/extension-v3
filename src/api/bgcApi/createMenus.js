// 创建右键菜单

const  createMenu = () => {
    let menuArr = [
      { "title": "拼多多工具", "url": "https://mobile.yangkeduo.com/" },
      { "title": "淘宝工具", "url": "https://www.taobao.com/" },
      { "title": "天猫工具", "url": "https://www.tmall.com/" },
      { "title": "京东工具", "url": "https://www.jd.com/" },
      { "title": "阿里国内工具", "url": "https://www.1688.com/" },
      { "title": "阿里国际工具", "url": "https://www.alibaba.com/" },
      { "title": "亚马逊工具", "url": "https://www.amazon.cn/" },
      { "title": "谋臣界官网", "url": "http://pddzd.junchenlun.com/plugs/index.html#/" }
    ]
    function open2(info, id){
      chrome.tabs.create({url: info.menuItemId, active: true,})
    }
    chrome.contextMenus.create({  
        "title": "谋臣界-电商工具箱",  
        "type": "normal",  
        "id": "bgc_context_menu",  
        "contexts": ['all'],
    });
    menuArr.forEach(item => {
      chrome.contextMenus.create({  
        "title": item.title,
        "id": item.url, 
        "type": "normal",  
        "parentId": "bgc_context_menu",
      }); 
    })
    chrome.contextMenus.onClicked.addListener(open2)
  }
  

  export default { createMenu }