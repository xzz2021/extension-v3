/*
 * @Date: 2023-03-08 17:33:05
 * @LastEditors: xzz
 * @LastEditTime: 2023-03-24 09:31:43
 */



export const copy = (el, binding) =>{
          el.addEventListener('mouseenter', function(){
            el.style.cursor = 'default'
          })
          el.addEventListener("click", function(){
              if (el.innerText == '') return
              navigator.clipboard.writeText(el.innerText)
            //   tt.view.Message.success({ message: ` '${el.innerText}' 已复制到剪切板`, type: 'success', offset: 70, duration: 2000 })
                })
            }

export const copy2 = (el, binding) =>{
  el.addEventListener('mouseenter', function(){
    el.style.cursor = 'default'
  })
  el.addEventListener("click", function(){
      if (el.innerText == '') return
      navigator.clipboard.writeText(el.innerText)
    //   tt.view.Message.success({ message: ` '${el.innerText}' 已复制到剪切板`, type: 'success', offset: 70, duration: 2000 })
        })
    }