/*
 * @Description: 
 * @Author: zhongshuai
 * @LastEditors: zhongshuai
 * @Date: 2019-03-11 17:05:59
 * @LastEditTime: 2019-06-05 14:39:23
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import message from '@/page/message';
import layout from '@/page/layout';
import login from '@/page/login';
import userInfo from '@/page/userInfo';
import downloadCenter from '@/page/downloadCenter';
import statistical from '@/page/statistical';

import test from '@/page/test';
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
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
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
      redirect: '/home',
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
        }
      ]
    }, {
      path: '/test',
      name: 'test',
      component: test,
    }
  ]
});
