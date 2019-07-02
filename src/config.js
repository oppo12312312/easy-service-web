/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-09 18:11:43
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-07-01 16:15:42
 */
const ip = 'localhost' || process.env.design_ip;
const url = `http://${ip}:1114/`;
export default {
  baseUiUrl: url + 'upload/unzip/',
  baseURL: url + 'v1/service/'
};
