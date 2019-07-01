/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-31 13:39:47
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 11:03:06
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import VueCookies from 'vue-cookies';
import App from './App.vue';
import router from '@/router'; // 路由
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.scss';
import service from '@/service/index.js';
import store from '@/store/index.js';
import i18n from '@/common/lang';


Vue.config.productionTip = false;

Vue.use(ElementUI, {
  i18n: (key, value) => i18n.t(key, value)
});

Vue.use(VueCookies);
Vue.prototype.$service = service;
Vue.use(VueRouter);
//前端拦截
router.beforeEach((to, from, next) => {
  debugger;
  console.log('.........');
  console.log(to.name + from.name);
  if (to.name === 'login' || to.name === 'home') {
    next();
  } else {
    // debugger;
    service.login.needLogin().then(data => {
      if (data.data.need_login) {
        next({ name: 'login' });
      } else {
        next();
      }
    });
  }
});
router.beforeEach((to, from, next) => {
  debugger;
  if (to.name === 'home') {
    console.log('...................');
    let roleList = [];
    if (window.$cookies.get('megvii_user') === 'true') {
      console.log('管理员menu设置');
      roleList = String(window.$cookies.get('user_role')).split('.');
      store.commit('menu/setMenuList', roleList);
    } else {
      console.log('普通用户menu设置');
      store.commit('menu/setMenuList', roleList);
    }
    next();
  } else {
    next();
  }
});


new Vue({
  router,
  store,
  i18n,
  render: h => h(App),

}).$mount('#app');
