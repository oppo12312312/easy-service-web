/*
 * @Description: 
 * @Author: zhongshuai
 * @LastEditors: zhongshuai
 * @Date: 2019-03-11 17:05:59
 * @LastEditTime: 2019-06-25 13:58:03
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import message from '@/page/message';
import layout from '@/page/layout';
import login from '@/page/login';
import userInfo from '@/page/userInfo';
import downloadCenter from '@/page/downloadCenter';
import statistical from '@/page/statistical';
import log from '@/page/log';
import userManage from '@/page/userManage';
import softManage from '@/page/softManage';
import namespaceManage from '@/page/namespaceManage';
import releaseManage from '@/page/releaseManage';
import home from '@/page';
Vue.use(VueRouter);
/**
 * 自动化注册所有子路由
 */
let childRoutes = [];
const requireModules = require.context('@/page', true, /\.router.js$/);

requireModules.keys().forEach(fileName => {
  const file = requireModules(fileName);
  childRoutes = childRoutes.concat(file.default);
});


export default new VueRouter({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: home,
    },
    {
      path: '/login',
      name: 'login',
      component: login,
    },
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      children: [
        {
          path: '/message',
          name: 'message',
          component: message,
        },
        {
          path: '/userInfo',
          name: 'userInfo',
          component: userInfo,
        },
        {
          path: '/downloadCenter',
          name: 'downloadCenter',
          component: downloadCenter,
        },
        {
          path: '/statistical',
          name: 'statistical',
          component: statistical,
        },
        {
          path: '/log',
          name: 'log',
          component: log,
        },
        {
          path: '/userManage',
          name: 'userManage',
          component: userManage,
        },
        {
          path: '/softManage',
          name: 'softManage',
          component: softManage,
        },
        {
          path: '/namespaceManage',
          name: 'namespaceManage',
          component: namespaceManage,
        },
        {
          path: '/releaseManage',
          name: 'releaseManage',
          component: releaseManage,
        }
      ]
    }
  ]
});
