/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-13 16:36:25
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-14 13:59:55
 */

import dayjs from 'dayjs';
export default {
  methods: {
    formatterDateTime(row, column, cellValue) {
      return this.dayToStr(cellValue);
    },
    dayToStr(value) {
      return dayjs(value).format('YYYY-MM-DD HH:mm:ss');
    },
    dateToStr(value) {
      return dayjs(value).format('YYYY-MM-DD');
    }
  }
};
