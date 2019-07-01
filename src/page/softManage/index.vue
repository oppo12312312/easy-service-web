<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-10 15:30:39
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-20 11:08:05
 -->

<template>
  <div class="meg-soft-manage">
    <megTitle class="mb20">
      软件管理
    </megTitle>
    <downSoft
      softType="softManage"
      :pushToUser="true"
      :showNameSpace="true"
      :adminId="adminId"
      @pushToUserFun="pushToUserFun"
    ></downSoft>
    <searchUserDia
      @enter="enter"
      v-if="visible"
      :splitByPushedSdkId="selectSdk.sdk_id"
      :visible.sync="visible"
    ></searchUserDia>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import downSoft from '@/page/downloadCenter/downSoft.vue';
import searchUserDia from '@/page/userManage/searchUserDia.vue';


export default {
  name: 'SoftManage',
  components: {
    megTitle,
    downSoft,
    searchUserDia
  },
  data() {
    return {
      visible: false,
      selectSdk: {}
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getAdminId'];
    }
  },
  methods: {
    pushToUserFun(item) {
      this.selectSdk = item;
      this.visible = true;
    },
    enter(value) {
      const ids = value.map(data => {
        return data.id;
      }); 
      this.$service.softManage.pushToConsumers({
        consumer_ids: ids,
        sdk_id: this.selectSdk.sdk_id,
        admin_id: this.adminId
      }).then(() => {
        this.$message.success('推送成功！');
      });
    }
  }

};
</script>

<style>

</style>
