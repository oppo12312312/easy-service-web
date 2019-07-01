/*
  * @Description: 
  * @Author: zhongshuai
  * @Date: 2019-06-14 11:31:40
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 18:12:41
  */
import service from './service';
export default {
  //授权统计列表
  getStatisticallist(param) {
    return service.get(`/consumers/${param.consumer_id}/api/v1/contracts`);
  },
  //授权统计列表
  adminGetStatisticallist(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts`);
  },
  //授权消耗详情
  userGetConsumption(param) {
    return service.get(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/consume-statistics`, {
      params: {
        'group-by': param.group_by,
        from: param.start_time,
        to: param.end_time
      }
    });
  },
  //授权消耗详情
  adminGetConsumption(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/consume-statistics?group-by=${param.group_by}&from=${param.start_time}&to=${param.end_time}`);
  },
  //授权变更接口
  userGetChangeHistory(param) {
    return service.get(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/change-history`);
  },
  //授权变更接口
  adminGetChangeHistory(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/change-history`);
  },
  //增加减少授权
  addStatistical(param) {
    return service.put(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}`, {
      change_num: param.change_num, 
      change_reason: param.change_reason
    });
  },
  //单次认证文件下载1
  adminSingleAuthentication(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/single-authentication`);
  },
  //单次认证文件下载2
  userSingleAuthentication(param) {
    return service.get(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/single-authentication`);
  },
  //双重认证授权下载3
  adminDoubleAuthentication(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/double-authentication`);
  },
  //双重认证授权下载4
  userDoubleAuthentication(param) {
    return service.get(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/double-authentication`);
  },
  //单次重置 5
  adminSingleAuthenticationPut(param) {
    return service.put(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/single-authentication`);
  },
  //单次重置 6
  userSingleAuthenticationPut(param) {
    return service.put(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/single-authentication`);
  },
  //双次重置 7
  adminDoubleAuthenticationPut(param) {
    return service.put(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/double-authentication`);
  },
  //双次重置 8
  userDoubleAuthenticationPut(param) {
    return service.put(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/double-authentication`);
  },
  //双重激活码下载 9
  adminDoubleAuthenticationActiveCode(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/double-authentication-active-code`);
  },
  //双重激活码下载 10
  userDoubleAuthenticationActiveCode(param) {
    return service.get(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/double-authentication-active-code`);
  },
  //消耗详情导出
  adminConsumeStatisticsExport(param) {
    return service.get(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/consume-statistics-export?group-by=${param.group_by}&from=${param.start_time}&to=${param.end_time}`);
  },
  //消耗详情导出
  userConsumeStatisticsExport(param) {
    return service.get(`/consumers/${param.consumer_id}/api/v1/contracts/${param.contract_id}/consume-statistics-export?group-by=${param.group_by}&from=${param.start_time}&to=${param.end_time}`);
  },
  //新增授权
  addContracts(param) {
    return service.post(`/admin/${param.admin_id}/consumers/${param.consumer_id}/api/v1/contracts`, {
      'sdk_type_id': param.sdk_type_id, 
      'contract_type': param.contract_type, 
      'authorized_days': param.authorized_days, 
      'purchased_count': param.purchased_count, 
      'node': param.node, 

    });
  }
};
