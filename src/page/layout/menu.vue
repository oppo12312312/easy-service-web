<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:00:59
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-02 23:37:11
 -->
<template>
  <div class="meg-menu">
    <el-menu
      :default-active="active"
      background-color="#0A1544"
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
      menuCfg: [
        {
          index: 1,
          name: '账号信息',
          icon: 'icon-user-info',
          router: 'home',
        },
        {
          index: 2,
          name: '下载中心',
          icon: 'icon-upload',
          router: 'home',
        },
        {
          index: 3,
          name: '授权统计',
          icon: 'icon-tongji',
          router: 'home',
        }
      ]
    };
  },
  computed: {
    active() {
      return this.menuCfg[0].index + '';
    }
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
