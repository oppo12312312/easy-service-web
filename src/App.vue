<!--
 * @Description: 
 * @Author: zhongshuai
 * @LastEditors: zhongshuai
 * @Date: 2019-02-21 10:13:54
 * @LastEditTime: 2019-07-01 14:02:13
 -->
<template>
  <div id="app">
    <img
      alt="  Vue logo"
      src="./assets/logo.png"
    >
    <serviceTest></serviceTest>
  </div>
</template>

<script>
import serviceTest from './components/serviceTest.vue';


export default {
  name: 'App',
  components: {
    serviceTest,
    // tree
  }
};
</script>

<style>
#app {
  font-family   : 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
