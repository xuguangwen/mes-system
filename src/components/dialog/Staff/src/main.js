import Vue from 'vue'
import boxVue from './main.vue'
const Constructor = Vue.extend(boxVue)
let currentMsg, instance
const initInstance = () => {
  instance = new Constructor({
    el: document.createElement('div')
  })
}
const DialogBox = function (options, callback) {
  if (typeof options === 'string') {
    options = {
      message: options
    }
    if (typeof arguments[1] === 'string') {
      options.title = arguments[1]
    }
  } else if (options.callback && !callback) {
    callback = options.callback
  }
  return new Promise((resolve, reject) => { // eslint-disable-line
    currentMsg = {
      options: Object.assign({}, options),
      callback: callback,
      resolve: resolve,
      reject: reject
    }
    // 创建单例
    if (!instance || instance.reRender) {
      instance = null
      initInstance()
    }
    // 隐藏之后显示
    if (!instance.visible) {
      // 合并options
      let options = currentMsg.options
      for (let prop in options) {
        if (options.hasOwnProperty(prop)) {
          instance[prop] = options[prop]
        }
      }
      document.body.appendChild(instance.$el)
      instance.getList()
      Vue.nextTick(() => {
        instance.visible = true
      })
    }
  })
}

// 显示弹框
DialogBox.show = (title, options) => {
  if (typeof title === 'object') {
    options = title
    title = ''
  } else if (title === undefined) {
    title = ''
  }
  return DialogBox(Object.assign({
    title: title
  }, options))
}
// 手动关闭弹框
DialogBox.close = () => {
  this.visible = false
}
export default DialogBox
