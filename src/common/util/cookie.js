/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-27 14:55:46
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-27 14:58:57
 */
export default {
  getCookie: (cname) => {
    const name = cname + '=';
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      const c = ca[i].trim();
      if (c.indexOf(name) === 0) return c.substring(name.length, c.length);
    }
    return '';
  }
};
