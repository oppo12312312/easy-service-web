<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-21 13:59:59
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-21 14:40:38
 -->
<template>
  <div
    class="dbv1"
    v-loading="loading"
    element-loading-text="数据加载中"
  >
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: true
    };
  },
  mounted() {
    console.log(this.$route.path);
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      vm.$service.login.needLogin().then(data => {
        console.log(data);
        vm.loading = false;
        if (data.data.need_login) {
          if (from.query) {
            vm.$router.push({ path: '/login', query: from.query });
          } else {
            vm.$router.push({ name: 'login' });
          }
        } else {
          vm.enterSystem();
        }
      });
    });
  },
  methods: {
    enterSystem() {
      const enterName = this.$store.getters['menu/getMenuList'][0].router;
      this.$router.push({ name: enterName });
    },
  }

};
</script>

<style>

</style>
