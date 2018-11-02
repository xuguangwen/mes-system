import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
import '@/styles/index.scss';       // global css
import "babel-polyfill";
import { setAjaxHeader, ajax, loadjs } from './utils/ajax';//引入封装的工具类和方法
Vue.prototype.ajax = ajax;//设置请求方法
Vue.prototype.loadjs = loadjs;//加载插件包例如echart，gojs
Vue.use(ElementUI);
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app');