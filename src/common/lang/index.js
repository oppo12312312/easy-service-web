/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-21 10:33:45
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-21 14:46:14
 */
import VueI18n from 'vue-i18n';
import Vue from 'vue';
import cn from '@/common/lang/cn.js';
import en from '@/common/lang/en.js';
import localStorage from '@/common/util/localStorage.js';

//element
import enEle from 'element-ui/lib/locale/lang/en';
import cnEle from 'element-ui/lib/locale/lang/zh-CN';
//select
import selectCn from '@/common/lang/selectCn.js';
import selectEn from '@/common/lang/selectEn.js';


Vue.use(VueI18n);
const def = localStorage.getStore('lang');
export default new VueI18n({
  locale: def || 'zh-CN', // 语言标识
  messages: {
    'zh-CN': {
      ...cn,
      ...cnEle,
      ...selectCn
    }, // 中文语言包
    'en-US': {
      ...en,
      ...enEle,
      ...selectEn
    } // 英文语言包
  }
});
