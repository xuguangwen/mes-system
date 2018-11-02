/*接口请求*/
import api from '@/api'
import axios from 'axios'

//设置请求头
export const setAjaxHeader = (data) => {
  if (!data) return
  axios.defaults.headers.post["Token"] = data.token;
}
/**
 * 封装ajax方法
 * 参数： 
 *   fun：string类型，api里面的接口的方法名
 *   data：请求参数
 *   callback：回调函数
 * 例1：
 *   this.ajax('user_getPublicKey',{}, e => {
 *     // do something
 *   });
 * 例2：
 *   this.ajax('user_getPublicKey',{}).then(e => {
 *     // do something
 *   });
 * 例3：
 *   this.ajax('user_getPublicKey',{}, e => {
 *     // do something
 *     
 *     // 不写return的话下面的then接收到的e就是undefined
 *     return e
 *   }).then(e => {
 *     // do something
 *   });
 * 例4：
 *   async () => {
 *     const e = await this.ajax('user_getPublicKey',{})
 *     // do something
 *   }
 */
export const ajax = async (fun, data, callback) => {
  try {
    const response = await api[fun](data);
    return callback ? callback(response.data) : response.data;
  } catch (error) {
    // console.log(error);
  }
}
