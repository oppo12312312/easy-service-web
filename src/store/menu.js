/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-28 10:59:25
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 16:32:13
 */
import localStorage from '@/common/util/localStorage.js';
export default {
  namespaced: true,
  state: {
    userInfo: {},
    menuList: [{
      index: 0,
      name: '消息中心',
      icon: 'icon-message',
      router: 'message',
    },
    {
      index: 1,
      name: '账号信息',
      icon: 'icon-user-info',
      router: 'userInfo',
    },
    {
      index: 2,
      name: '下载中心',
      icon: 'icon-upload',
      router: 'downloadCenter',
    },
    {
      index: 3,
      name: '授权统计',
      icon: 'icon-tongji',
      router: 'statistical',
    },
    {
      index: 4,
      name: '日志审计',
      icon: 'icon-rizhi',
      router: 'log',
      role: ['SUPER_ADMIN']
    },
    {
      index: 5,
      name: '客户管理',
      icon: 'icon-yonghuguanli',
      router: 'userManage',
      role: ['SUPER_ADMIN', 'NAMESPACE_SUPPORTER']
    },
    {
      index: 6,
      name: '软件管理',
      icon: 'icon-ruanjianfuwu1',
      router: 'softManage',
      role: ['SUPER_ADMIN', 'NAMESPACE_SUPPORTER']
    },
    {
      index: 7,
      name: '分区管理',
      icon: 'icon-zuzhi',
      router: 'namespaceManage',
      role: ['SUPER_ADMIN', 'NAMESPACE_OWNER']
    },
    {
      index: 8,
      name: '发布管理',
      icon: 'icon-fabu',
      router: 'releaseManage',
      role: ['SUPER_ADMIN', 'NAMESPACE_OWNER', 'NAMESPACE_WRITER']
    }]
  },
  getters: {
    getMenuList: () => {
      return localStorage.getStore('menuList');
    }
  },

  mutations: {
    setMenuList: (state, roleList) => {
      debugger;
      console.log(state.menuList);
      console.log(roleList);
      //暂时屏蔽 方便测试
      if (roleList.length === 0) {
        state.menuList = state.menuList.slice(0, 4);
        console.log(state.menuList);
      } else {
        const list = state.menuList.slice(4, 9);
        const menu = [];
        console.log(list);
        const contain = function (source, target) {
          const result = source.filter((item) => {
            return target.indexOf(item) > -1;
          });
          return (result.length > 0);
        };
        for (const item in list) {
          if (contain(roleList, list[item].role)) {
            menu.push(list[item]);
          }
        }
        if (menu.length !== 0) {
          state.menuList = [...new Set(menu)];
        } else {
          state.menuList = list;
        }
        console.log(state.menuList);
      }
      localStorage.setStore('menuList', state.menuList);
    }
  }
};
