/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-14 11:37:09
 */
import service from './service';
export default {
  //获取用户信息
  getUserInfo(param) {
    return service.get(`/consumers/${param.user_id}/api/v1/account`);
  },
  //修改密码
  editUserInfo(param) {
    return service.put(`/consumers/${param.user_id}/api/v1/account`, {
      current_pwd: param.current_pwd,
      new_pwd: param.new_pwd,
    });
  },
};
