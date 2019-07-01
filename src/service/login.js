/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-19 16:07:59
 */
import service from './service';
export default {
  //查询系统推送消息接口
  login(param) {
    return service.post('/consumers/login', {
      uname: param.uname,
      password: param.password
    });
  },
  megviiLogin() {
    return service.get('/api/v1/oauth2_login');
  },
  //判断是否需要登录
  needLogin() {
    return service.get('/consumers/need_login');
  },
  //获取短信接口
  getShortMessage(param) {
    return service.post('/consumers/get-short-message', {
      uname: param.uname,
      password: param.password
    });
  },
  //短信登录接口
  loginShortMessage(param) {
    return service.post('/consumers/login-short-message', {
      uname: param.uname,
      password: param.password,
      short_msg: param.short_msg
    });
  },
};
