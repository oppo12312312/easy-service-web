/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-31 13:39:47
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-08-29 10:44:39
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import axios from 'axios';
import App from './App.vue';
import router from '@/router'; // 路由
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.scss';
import config from '@/config.js';


Vue.config.productionTip = false;
Vue.use(ElementUI);
Vue.prototype.axiosObj = axios.create({
  baseURL: config.baseURL
});

Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),

}).$mount('#app');
