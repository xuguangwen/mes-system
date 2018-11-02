/*基础数据 api*/
import axios from 'axios'
export default {
  //查询工作日列表
  queryWorkDayAbstract: params => axios.post('/m2_basicData/production/queryWorkDayAbstract.do', params),
  queryWorkDayAbstract: params => axios.get('/m2_basicData/production/queryWorkDayAbstract.do', {params}),

}
