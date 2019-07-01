

/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-20 11:03:33
 */
import service from './service';
export default {
  //获取产品列表历史
  getSdktTypesHis(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/sdk-types?search-by=${param.push}`);
  },
  //获取产品列表最新测试版
  getSdktTypesNew(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/sdk-types/sdks?release-version=release&search-by=${param.push}`);
  },
  //最新正式版本
  getSdktTypesNewTest(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/sdk-types/sdks?release-version=test&search-by=${param.push}`);
  },
  //获取历史sdk
  getSdkHis(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/sdk-types/${param.sdk_type_id}/sdks?search-by=${param.push}`);
  },
  getUserList(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/consumers`, {
      params: {
        'search-by': param.search_by,
        'split-by-pushed-sdk-id': param.splitByPushedSdkId
      }
    });
  },
  pushSdk(param) {
    return service.post(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/push-sdks`, {
      sdk_ids: param.sdk_ids
    });
  },
  //重置密码
  resetPassword(param) {
    return service.put(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/revoke-pwd`);
  },
  //修改用户信息
  editUser(param) {
    return service.put(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/account`, {
      name: param.name,
      email: param.email, 
      phone_number: param.phone_number,
      company_name: param.company_name,
      describe: param.describe,
    });
  }
};
