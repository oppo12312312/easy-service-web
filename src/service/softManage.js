

/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-18 10:55:51
 */
import service from './service';
export default {
  //获取产品列表历史
  getSdktTypesHis(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespaces_id}/sdk-types`);
  },
  //获取产品列表最新测试版
  getSdktTypesNew(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespaces_id}/sdk-types/sdks?release-version=release`);
  },
  //最新正式版本
  getSdktTypesNewTest(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespaces_id}/sdk-types/sdks?release-version=test`);
  },
  //获取历史sdk
  getSdkHis(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespaces_id}/sdk-types/${param.sdk_type_id}/sdks`);
  },
  //sdkt推送给客户
  pushToConsumers(param) {
    return service.post(`/admin/${param.admin_id}/api/v1/sdks/${param.sdk_id}/push-to-consumers`, {
      consumer_ids: param.consumer_ids
    });
  }
};
