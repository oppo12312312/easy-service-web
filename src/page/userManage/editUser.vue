<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-11 14:48:25
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-27 14:35:57
 -->

<template>
  <el-form
    ref="form"
    :model="form"
    label-width="80px"
  >
    <el-form-item label="名称">
      <el-input v-model="editForm.name"></el-input>
    </el-form-item>
    <el-form-item label="密码">
      <span>原始密码不可见/重置之后发送邮件生成随机密码串</span>
      <el-button
        class="ml20"
        size="medium"
        @click="resetPassword"
      >
        重置密码
      </el-button>
    </el-form-item>
    <el-form-item label="绑定邮箱">
      <el-input v-model="editForm.email"></el-input>
    </el-form-item>
    <el-form-item label="绑定手机">
      <el-input v-model="editForm.phone_number"></el-input>
    </el-form-item>
    <el-form-item label="公司名称">
      <el-input v-model="editForm.company_name"></el-input>
    </el-form-item>
    <el-form-item label="">
      <el-button
        size="medium"
        type="primary"
        @click="enterChange"
      >
        确认变更
      </el-button>
      <el-button
        size="medium"
        type="warning"
        @click="reset"
      >
        放弃修改
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'EditUser',
  props: {
    form: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  data() {
    return {
      editForm: {
        name: '',
        email: '',
        phone_number: '',
        company_name: ''
      }
    };
  },
  computed: {
    adminId() {
      return this.$store.getters['user/getAdminId'];
    },
  },
  watch: {
    form() {
      this.reset();
    }
  },
  methods: {
    reset() {
      this.editForm = Object.assign(this.editForm, this.form);
    },
    resetPassword() {
      this.$service.userManage.resetPassword({
        admin_id: this.adminId,
        consumer_id: this.form.id
      }).then(() => {
        this.$message.success('密码重置成功！');
      });
    },
    enterChange() {
      this.$service.userManage.editUser({
        admin_id: this.adminId,
        consumer_id: this.form.id,
        ...this.editForm 
      }).then(() => {
        Object.assign(this.form, this.editForm);
        this.$message.success('用户信息修改成功！');
      });
    }

  }
};
</script>

<style>

</style>
