

/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-17 16:28:27
 */
import service from './service';
export default {
  //获取分区列表
  getList(param) {
    return service.get(`/admin/${param.admin_id}/api/v1/namespaces`);
  },
  creat(param) {
    return service.post(`/admin/${param.admin_id}/api/v1/namespaces`, {
      name: param.name
    });
  },
  delete(param) {
    return service.delete(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespace_id}`);
  },
  update(param) {
    return service.put(`/admin/${param.admin_id}/api/v1/namespaces/${param.namespace_id}`, {
      name: param.name,
      owners: param.owners,
      writers: param.writers,
      supporters: param.supporters
    });
  },
  addOwener(param) {
    return service.post(`/admin/${param.admin_id}/api/v1/namespace-owners`, {
      owners: param.owners
    });
  }
};
