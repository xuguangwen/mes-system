import axios from 'axios';
import qs from 'qs';
import {Message,MessageBox} from 'element-ui';
import store from '@/store';
import { getToken } from '@/utils/auth';
//api
import basicData from './modules/basicData';
// 带cookie请求
axios.defaults.withCredentials = true;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.baseURL = 'http://192.168.1.112:8000';
axios.defaults.timeout=5000 // 请求超时时间
// 添加请求拦截器
axios.interceptors.request.use(config => {
  if (config.data && config.data.constructor != FormData) {
    config.data = qs.stringify(config.data);
  }else if (store.getters.token) {
    config.headers['token'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  return Promise.reject(error);
});
// response 拦截器
axios.interceptors.response.use(response => {
    //code为非20000是抛错 可结合自己业务进行修改
    const res = response.data
    if (res.code !== 20000) {
      Message({
        message: res.message,
        type: 'error',
        duration: 5 * 1000
      })
      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出', {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('FedLogOut').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
);

export default {
  ...basicData
}
