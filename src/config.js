/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-09 18:11:43
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-07-08 18:20:58
 */
const ip = '10.231.20.63' || process.env.design_ip;
// const ip = '127.0.0.1' || process.env.design_ip;
const url = `http://${ip}:1114/`;
export default {
  baseUiUrl: url + 'upload/unzip/',
  baseURL: url + 'v1/service/'
};
