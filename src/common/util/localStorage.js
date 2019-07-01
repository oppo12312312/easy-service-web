/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-14 16:20:27
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-14 16:21:26
 */
/**
 * 存储localStorage
 */
export default {
  setStore: (name, content) => {
    if (!name) return;
    if (typeof content !== 'string') {
      content = JSON.stringify(content);
    }
    window.localStorage.setItem(name, content);
  },
  
  /**
   * 获取localStorage
   */
  getStore: name => {
    if (!name) return null;
    let data = null;
    try {
      data = JSON.parse(window.localStorage.getItem(name));
    } catch (e) {
      data = window.localStorage.getItem(name);
    }
    return data;
  },
  
  /**
   * 删除localStorage
   */
  removeStore: name => {
    if (!name) return null;
    window.localStorage.removeItem(name);
  }
};
