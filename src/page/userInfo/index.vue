<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:17:03
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-05 11:44:53
 -->
<template>
  <div class="meg-user-info">
    <megTitle>账户信息</megTitle>
    <el-form
      label-position="left"
      label-width="80px"
    >
      <el-form-item label="名称">
        <p>张三</p>
      </el-form-item>
      <el-form-item label="密码">
        <p>******</p>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="openEdit"
        >
          修改密码
        </el-button>
      </el-form-item>
    </el-form>
    
    <megTitle class="mt40">
      账户绑定信息
    </megTitle>

    <el-form
      label-width="80px"
      label-position="left"
    >
      <el-form-item label="绑定邮箱">
        <p>90402062@qq.com</p>
      </el-form-item>
      <el-form-item label="绑定手机">
        <p>12464753553</p>
      </el-form-item>
      <el-form-item label="公司名称">
        <p>北京旷视科技</p>
      </el-form-item>
    </el-form>
    <el-alert
      title="如有修改账户绑定信息的需求，请联系商务"
      type="success"
      :closable="false"
    >
    </el-alert>
    <editPassword
      v-if="editVisible"
      :visible.sync="editVisible"
    ></editPassword>
  </div>
</template>

<script>
import megTitle from '@/components/megTitle';
import editPassword from '@/page/userInfo/editPassword.vue';

export default {
  name: 'UserInfo',
  components: {
    megTitle,
    editPassword
  },
  data() {
    return {
      editVisible: false
   
    };
  },
  methods: {
    openEdit() {
      this.editVisible = true;
    }
  }

};
</script>

<style>

</style>
