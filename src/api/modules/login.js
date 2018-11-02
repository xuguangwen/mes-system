import axios from 'axios';
export const login = params => axios.post('/m2_basicData/production/queryWorkDayAbstract.do', params);
export const getInfo = params => axios.post('/m2_basicData/production/queryWorkDayAbstract.do', params);
export const logout = params => axios.post('/m2_basicData/production/queryWorkDayAbstract.do', params);