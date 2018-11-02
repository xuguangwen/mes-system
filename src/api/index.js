import axios from 'axios'
import qs from 'qs'
import basicData from './modules/basicData';
// axios 配置
axios.defaults.timeout = 10000;
// 带cookie请求
axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.baseURL='http://192.168.1.112:8000'
// 添加请求拦截器
axios.interceptors.request.use(config => {
  if (config.data && config.data.constructor != FormData) {
    config.data = qs.stringify(config.data);
  }
  return config
}, error => {
  return Promise.reject(error);
});
export default {
  ...basicData
}
