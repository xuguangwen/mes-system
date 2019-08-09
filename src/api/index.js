
import basicData from './modules/basicData';//基础数据api
axios.defaults.timeout = 60000;
axios.defaults.withCredentials = true
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
//自动化ip部署
axios.defaults.baseURL = IPConfig.IP + ':' + IPConfig.Host
// axios.defaults.baseURL="http://www.imes-inc.ser:8000"
// 添加请求拦截器
axios.interceptors.request.use(config => {
  if (config.data && config.data.constructor != FormData) {
    config.data = qs.stringify(config.data);
    //不能这样设置，不然就会拦截所以的post header头只设置为当前。
    // config.headers={
    //   'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8',
    // }
    config.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
  }

  if (localStorage.getItem('token')) { //如果存在token，每个请求头都带上token
    config.headers.Authorization = localStorage.getItem('token');
  }
  if (localStorage.getItem('nowCompany')) {
    config.headers.corporationId = JSON.parse(localStorage.nowCompany).corporationId;
  }
  
  if (config.url.indexOf('/m2_field_management/') > -1) {
    if (localStorage.getItem("ReworkId")) {
      config.headers.productionBatchReworkId = localStorage.getItem("ReworkId");
    }
  }
  return config
}, error => {
  return Promise.reject(error);
});
// http response 拦截器
axios.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.clear();
          router.replace({
            path: '/login',
          });
          this.$message({
            message: error.response.data.msg,
            type: "error"
          });
      }
    }
    return Promise.reject(error.response.data) // 返回接口返回的错误信息
  });
export default {
  ...basicData
}
