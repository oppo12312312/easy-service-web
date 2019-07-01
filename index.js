/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-27 22:12:14
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-25 13:58:38
 */
//express_demo.js 文件
// 
const express = require('express');
const http = require('http'); 
// const history = require('connect-history-api-fallback'); 
const proxy = require('express-http-proxy'); 
const config = require('./src/config');
const app = express();
// app.use(history());
app.use(express.static('./dist'));
app.use('/api', proxy(config.serviceUrl));

const httpServer = http.createServer(app);
httpServer.listen(9900, '0.0.0.0', () => {
  console.log('success');
});
