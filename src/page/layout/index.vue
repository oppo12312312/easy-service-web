<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:00:44
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-02 22:46:07
 -->
<template>
  <div class="meg-layout">
    <layoutTitle></layoutTitle>
    <div class="meg-bottom">
      <layoutMenu></layoutMenu>
      <div class="meg-page">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import layoutMenu from '@/page/layout/menu';
import layoutTitle from '@/page/layout/title';
export default {
  name: 'Layout',
  components: {
    layoutMenu,
    layoutTitle
  }

};
</script>

<style>

</style>
