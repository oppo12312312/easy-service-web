/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-31 13:39:47
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-05 16:32:41
 */
import Vue from 'vue';
import ElementUI from 'element-ui';
import VueRouter from 'vue-router';
import App from './App.vue';
import router from '@/router'; // 路由
import 'element-ui/lib/theme-chalk/index.css';
import '@/assets/index.scss';

Vue.config.productionTip = false;
Vue.use(ElementUI);


Vue.use(VueRouter);

new Vue({
  router,
  render: h => h(App),

}).$mount('#app');
