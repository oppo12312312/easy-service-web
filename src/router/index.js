/*
 * @Description: 
 * @Author: zhongshuai
 * @LastEditors: zhongshuai
 * @Date: 2019-03-11 17:05:59
 * @LastEditTime: 2019-07-01 16:47:22
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import ui from '@/page/ui';
import layout from '@/page/layout';
import login from '@/page/login';

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
  // mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/ui'
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
      redirect: '/ui',
      children: [
        {
          path: '/ui',
          name: 'ui',
          component: ui,
        }
      ]
    }, {
      path: '/test',
      name: 'test',
      component: test,
    }
  ]
});
