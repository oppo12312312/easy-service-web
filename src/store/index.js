/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 15:22:54
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-14 18:36:51
 */
import Vuex from 'vuex';
import Vue from 'vue';
import user from './user';
import menu from './menu';
Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    menu
  }
});
