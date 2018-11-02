/*可以异步加载cdn的js，这样避免如echartsjs打包在项目里面，彻底和项目分离*/
const loadjs = (url) => {
  return new Promise((resolve, reject) => {
    let exist = false
    Array.prototype.slice.call(document.getElementsByTagName('script')).forEach(item => {
      if (item.src === url) {
        resolve()
        exist = true
      }
    })
    // 不存在才加载script
    if (!exist) {
      let script = document.createElement('script')
      script.src = url
      document.body.appendChild(script)
      if (document.all) { //如果是IE
        script.onreadystatechange = () => {
          if (script.readyState == 'loaded' || script.readyState == 'complete') {
            resolve()
          }
        }
      } else {
        script.onload = () => {
          resolve()
        }
      }
    }
  })
}

export default loadjs
