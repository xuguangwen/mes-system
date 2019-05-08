import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import ElementUI from 'element-ui';
import MesDialogUI from './components/dialog/index'
import i18n from './i18n/i18n'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/assets/icon/iconfont.css' //icon图标
import "babel-polyfill";
import {ajax,loadjs} from './utils/ajax'; //引入封装的工具类和方法
import filterFn from './utils/filter'
import gojs from "gojs"
Vue.prototype.gojs=gojs
Vue.config.productionTip = false
//全局过滤
Vue.prototype.filterFn = filterFn
Vue.prototype.ajax = ajax; //设置请求方法
Vue.prototype.loadjs = loadjs; //加载插件包例如echart，gojs
Vue.use(MesDialogUI);
Vue.use(ElementUI);
new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app');

//重写toFixed方法
Number.prototype.toFixed = function (n) {
  if (n > 20 || n < 0) {
    throw new RangeError('toFixed() digits argument must be between 0 and 20');
  }
  const number = this;
  if (isNaN(number) || number >= Math.pow(10, 21)) {
    return number.toString();
  }
  if (typeof (n) == 'undefined' || n == 0) {
    return (Math.round(number)).toString();
  }

  let result = number.toString();
  const arr = result.split('.');

  // 整数的情况
  if (arr.length < 2) {
    result += '.';
    for (let i = 0; i < n; i += 1) {
      result += '0';
    }
    return result;
  }

  const integer = arr[0];
  const decimal = arr[1];
  if (decimal.length == n) {
    return result;
  }
  if (decimal.length < n) {
    for (let i = 0; i < n - decimal.length; i += 1) {
      result += '0';
    }
    return result;
  }
  result = integer + '.' + decimal.substr(0, n);
  const last = decimal.substr(n, 1);

  // 四舍五入，转换为整数再处理，避免浮点数精度的损失
  if (parseInt(last, 10) >= 5) {
    const x = Math.pow(10, n);
    result = (Math.round((parseFloat(result) * x)) + 1) / x;
    result = result.toFixed(n);
  }

  return result;
}
