/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-27 22:12:14
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-12 00:09:13
 */

const express = require('express');
const http = require('http'); 

const app = express();

app.use('/', express.static('./dist'));


const httpServer = http.createServer(app);
httpServer.listen(1115, '0.0.0.0', () => {
  console.log('success');
});
