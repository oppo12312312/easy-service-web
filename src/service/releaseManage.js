/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-20 17:53:10
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 15:33:36
 */
import service from './service';
export default {
  //获取分区列表
  getList(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces`);
  },
  getSdk(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespace_id}/sdk-types`);
  },
  getSdkVersion(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespace_id}/sdk-types/${param.sdk_type_id}/sdks`);
  },
  createSdk(param) {
    return service.post(`/admin/${param.admin_id}/api/v1/sdk-types`, {
      name: param.name,

      namespace_id: param.namespace_id
    });
  },
  updateSdk(param) {
    return service.put(`/admin/${param.admin_id}/api/v1/sdk-types/${param.sdk_type_id}`, {
      name: param.name
    });
  },
  createSdkVersion(param) {
    return service.post(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespace_id}/sdk-types/${param.sdk_type_id}/sdks`, {
      version: param.version,
      status: param.status,
      release_version_type: param.release_version_type,
      release_node: param.release_node
    });
  },
  uploadSdkVersion(param) {
    return service.put(`/admin/${param.admin_id}/api/v1/sdks/${param.sdk_id}/upload`, {
      file: param.file,
     
    });
  },
  updateSdkVersion(param) {
    return service.put(`/admin/${param.admin_id}/api/v1/sdks/${param.sdk_id}`, {
      version: param.version,
      status: param.status
    });
  },
  deleteSdkVersion(param) {
    return service.put(`/admin/${param.admin_id}/api/v1/sdks/${param.sdk_id}/status`, {
      status: param.status,
    });
  },

};
