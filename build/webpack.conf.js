/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-08-05 18:00:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-08-06 17:50:20
 */
const path = require('path');
function externals() {
  console.log(path.resolve(__dirname, '../package.json'))
  let manifest = require(path.resolve(__dirname, '../package.json'));
  let dependencies = manifest.dependencies;
  let externals = {};
  for (let p in dependencies) {
    externals[p] = 'commonjs ' + p;
  }
  return externals;
}

module.exports = {
  entry:"./index.js",
  target: 'node',
  output:{
    path: path.resolve(__dirname, '../dist/'),
    filename: 'server.bundle.js'
  },
  externals: externals(),
  node: {
    console: true,
    global: true,
    process: true,
    Buffer: true,
    __filename: true,
    __dirname: true,
    setImmediate: true
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        },
        exclude: /(node_modules|bower_components)/,
      },
    ]
  }
}

