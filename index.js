/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-27 22:12:14
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-11 09:22:25
 */
//express_demo.js 文件
// 
const express = require('express');
const http = require('http'); 
const bodyParser = require('body-parser'); 
const routes = require('./service/routes/index.js');

const app = express();


app.all('/v1/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  //Access-Control-Allow-Headers ,可根据浏览器的F12查看,把对应的粘贴在这里就行
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use('/upload', express.static('./upload'));
app.use('/design', express.static('./dist'));
app.use('/v1', routes);


app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据


const httpServer = http.createServer(app);
httpServer.listen(1114, '0.0.0.0', () => {
  console.log('success');
});
