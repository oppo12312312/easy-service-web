/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-08-05 18:13:09
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-08-06 16:37:29
 */
const webpack = require("webpack");
const config =  require("./webpack.conf");

console.log("start build node server")
webpack(config, (err, stats) => {
  if (err) throw err
  console.log("build node server success")
});