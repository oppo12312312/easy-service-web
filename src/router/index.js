/*
 * @Description: 
 * @Author: zhongshuai
 * @LastEditors: zhongshuai
 * @Date: 2019-03-11 17:05:59
 * @LastEditTime: 2019-06-02 23:48:50
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import login from '@/page/login';
import layout from '@/page/layout';
import home from '@/page/home';
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
    //   redirect: '/largeCreen/index',
    //   children: childRoutes
    },
    
    {
      path: '/layout',
      name: 'layout',
      component: layout,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: home,
        }
      ]
    }, {
      path: '/test',
      name: 'test',
      component: test,
    }
  ]
});
