/*
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-20 17:06:37
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-21 14:49:23
 */
export default {
  methods: {
    getLabelByVal(selectName, val) {
      const re = this.$t(`select.${selectName}`).filter(item => {
        return val === item.value;
      });
      return re.length > 0 ? re[0].label : '';
    }
  }
};
