/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-18 14:41:56
 */
import service from './service';
export default {
  //查询系统推送消息接口
  getList(param) {
    return service.get(`admin/${param.amdin_id}/api/v1/event-records?search-by=${param.name}&type=${param.type}`);
  },
  getUserList(param) {
    return service.get(`/admin/${param.amdin_id}/consumers/${param.consumer_id}/api/v1/account-log`);
  },
  //获取所有的操作类型
  getEventTypes(param) {
    return service.get(`/admin/${param.amdin_id}/api/v1/event-types`);
  }
};
