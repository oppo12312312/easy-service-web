<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:00:59
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-05 17:42:01
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
      menuCfg: [
        {
          index: 0,
          name: 'UI',
          icon: 'icon-message',
          router: 'message',
        },
        {
          index: 1,
          name: 'image',
          icon: 'icon-user-info',
          router: 'userInfo',
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
