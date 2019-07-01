<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-10 14:24:45
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 10:55:28
 -->
<template>
  <div class="meg-user-manage">
    <megTitle v-show="!dataile">
      客户管理
    </megTitle>
    <searchUser
      v-show="!dataile"
      @detaile="detaile"
    ></searchUser>
    <userDetaile
      @returnPage="returnPage"
      :userInfo="userInfo"
      v-if="dataile"
    ></userDetaile>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import searchUser from '@/page/userManage/searchUser.vue';
import userDetaile from './userDetaile';

export default {
  name: 'UserManage',
  components: {
    megTitle,
    searchUser,
    userDetaile
  },
  data() {
    return {
      dataile: false,
      userInfo: {}
    };
  },
  methods: {
    detaile(item) {
      this.dataile = true;
      this.userInfo = item;
    },
    returnPage() {
      this.dataile = false;
    }
  }

};
</script>

<style>

</style>
