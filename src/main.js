import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import ElementUI from 'element-ui';
import i18n from './i18n/i18n'
import '@/styles/element-variables.scss'
import '@/styles/index.scss' // global css
import '@/assets/icon/iconfont.css'//icon图标
import "babel-polyfill";
import {ajax, loadjs } from './utils/ajax';//引入封装的工具类和方法
Vue.config.productionTip = false
Vue.prototype.ajax = ajax;//设置请求方法
Vue.prototype.loadjs = loadjs;//加载插件包例如echart，gojs
Vue.use(ElementUI);
new Vue({
    router,
    store,
    i18n,
    render: h => h(App)
}).$mount('#app');
