/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-12 17:07:12
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-27 12:17:21
 */
const config = require('./src/config');
module.exports = {
  devServer: {
    proxy: {
      '/api': {
        target: config.serviceUrl,
        changeOrigin: true,
      },
      '/admin': {
        target: config.serviceUrl,
        changeOrigin: true,
      },
      '/consumers': {
        target: config.serviceUrl,
        changeOrigin: true,
      }
    }
  }
};
