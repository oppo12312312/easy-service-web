/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-08-15 17:06:46
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-08-26 17:16:28
 */
const service = {
  massage(ws) {
    console.log('message');
    ws.on('message', () => {
      ws.send(4134);
    });
  }
};
module.exports = service;
