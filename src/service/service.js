/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:34:35
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 15:17:49
 */
import axios from 'axios';
// const baseURL = 'http://10.122.104.47:3003';
const baseURL = '/';
import { Message } from 'element-ui';


const service = axios.create({
  baseURL,
  timeout: 1000
});
const returnLogin = function (status) {
  if (status === 403) {
    //跳转到登录
    window.location.href = window.location.origin;
  }
};

const messageError = function (error) {
  Message.error(error.response.data);
};

service.interceptors.response.use((response) => {
  returnLogin(response.status);
  return response;
}, (error) => {
  debugger;
  messageError(error);
  returnLogin(error.response.status);
  // window.location.href = window.location.origin;
  return Promise.reject(error);
});


export default service;
