/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-27 22:12:14
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-08-15 17:11:01
 */
const express = require('express');
const http = require('http'); 
//由于现在得vue是单页应用，也就是实际上不会再浏览器history中增加历史，使用这个插件后可以解决刷新浏览器后出现空白页得问题。
const history = require('connect-history-api-fallback'); 
const bodyParser = require('body-parser'); 
const expressWs = require('express-ws');
const routes = require('./service/routes/index');
const app = express();
expressWs(app);

app.use(history());
app.use('/upload', express.static('./upload'));

app.use('/', express.static('./dist', { index: 'index.html' }));
app.all('/v1/*', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', '*');
  res.header('Content-Type', 'application/json;charset=utf-8');
  next();
});

app.use('/v1', routes);


app.use(bodyParser.json());//数据JSON类型
app.use(bodyParser.urlencoded({ extended: false }));//解析post请求数据


const httpServer = http.createServer(app);
httpServer.listen(1114, '0.0.0.0', () => {
  console.log('success');
});
