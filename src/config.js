/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-09 18:11:43
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-07-02 18:58:02
 */
const ip = '10.231.20.63' || process.env.design_ip;
const url = `http://${ip}:1114/`;
export default {
  baseUiUrl: url + 'upload/unzip/',
  baseURL: url + 'v1/service/'
};
