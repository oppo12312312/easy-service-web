/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-14 11:35:29
 */
import service from './service';
export default {
  //查询系统推送消息接口
  getMessages(param) {
    return service.get(`/consumers/${param.user_id}/api/v1/messages`);
  }
};
