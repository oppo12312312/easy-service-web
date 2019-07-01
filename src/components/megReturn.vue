<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 14:06:09
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-11 14:35:31
 -->
<template>
  <div
    class="meg-return"
    @click="click"
  >
    <i class="iconfont icon-fanhui"></i>
    <span>
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  name: 'MegReturn',
  methods: {
    click() {
      this.$emit('click');
    }
  }

};
</script>

<style>

</style>
