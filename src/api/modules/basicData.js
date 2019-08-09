/*基础数据 api*/
import axios from 'axios'
export default {
  //查询工作日列表：eg：A模块下的get请求，查询接口queryList接口
 postAqueryList: params => axios.post('/A/queryList.do', params),
 getAqueryList: params => axios.get('/A/queryList.do', {params}),
 putAXXX: params => axios.get('/A/queryList.do', params),
 deleteQMqualityScheme:params=>axios.delete('/m2_quality/api/v1/qualityScheme',{params}),  //删除检测方案
}
