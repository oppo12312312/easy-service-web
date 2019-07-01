/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 15:26:31
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 17:19:23
 */
import localStorage from '@/common/util/localStorage.js';
import cookies from '@/common/util/cookie.js';

export default {
  namespaced: true,
  state: {
    userInfo: {},
    userRole: {}
  },
  getters: {
    getUserInfo: () => {
      return localStorage.getStore('userInfo') || { id: Number(cookies.getCookie('admin_id') || localStorage.getStore('userInfo').id || 0) };
    },
    getUserRole: () => {
      return localStorage.getStore('userRole');
    },
    getAdminId: () => {
      return Number(cookies.getCookie('admin_id') || localStorage.getStore('userInfo').id || 0);
    }
  },
  mutations: {
    setUserInfo: (state, userInfo) => {
      state.userInfo = userInfo;
      localStorage.setStore('userInfo', userInfo);
    },
    setUserRole: (state, userRole) => {
      state.userRole = userRole;
      localStorage.setStore('userRole', userRole);
    }
  }
};
