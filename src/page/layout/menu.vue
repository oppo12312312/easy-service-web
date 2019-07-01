<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:00:59
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 11:01:29
 -->
<template>
  <div class="meg-menu">
    <el-menu
      :default-active="active"
    >
      <el-menu-item
        v-for="item in menuCfg"
        :index="item.index+''"
        :key="item.index"
        @click="openPage(item.router)"
      >
        <i
          class="iconfont"
          :class="item.icon"
        ></i>
        <span slot="title">{{ item.name }}</span>
      </el-menu-item>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  data() {
    return {
      active: '0',
    };
  },
  computed: {
    menuCfg() {
      return this.$store.getters['menu/getMenuList'];
    }
  },
  mounted() {
    //刷新浏览器定位到指定的menu
    // const isMegvii = this.$cookies.get('megvii_user');
    // let role = '';
    // if (isMegvii === 'true') {
    //   role = 1;
    // } else {
    //   role = 2;
    // }
    // if (role === 1) {
    //   console.log('管理员');
    // const roleList = String(this.$cookies.get('user_role')).split('.');
    // const list = [];
    // if (roleList[0] !== 'null') {
    //   if (roleList.indexOf('SUPER_ADMIN') !== -1) {
    //     list.push(...this.menuCfg.slice(0));
    //   }
    //   if (roleList.indexOf('NAMESPACE_OWNER') !== -1) {
    //     list.push(...this.menuCfg.slice(3, 5));
    //   }
    //   if (roleList.indexOf('NAMESPACE_WRITER') !== -1) {
    //     list.push(...this.menuCfg.slice(4, 5));
    //   }
    //   if (roleList.indexOf('NAMESPACE_SUPPORTER') !== -1) {
    //     list.push(...this.menuCfg.slice(1, 3));
    //   }
    //   this.menuCfg = [...new Set(list)];
    // }
    // }

    // if (role === 2) {
    //   console.log('普通用户');
    // }
    // const item = this.menuCfg.filter(item => {
    //   return this.$route.path.split('/')[1] === item.router;
    // });
    this.active = this.menuCfg[0].index + '';
    this.$router.push(this.menuCfg[0].router);
  },
  methods: {
    openPage(name) {
      this.$router.push({
        name
      });
    }
  }

};
</script>

<style>

</style>
