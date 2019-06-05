<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-05 11:12:48
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-05 11:46:30
 -->
<template>
  <el-dialog
    title="修改密码"
    :visible.sync="visible"
    width="500px"
    :before-close="handleClose"
  >
    <el-form
      ref="form"
      :rules="rules"
      :model="form"
      label-width="100px"
    >
      <el-form-item
        label="当前密码"
        prop="oldPassword"
      >
        <el-input v-model="form.oldPassword"></el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="newPassword"
      >
        <el-input v-model="form.newPassword"></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码"
        prop="newPasswordConfirm"
      >
        <el-input v-model="form.newPasswordConfirm"></el-input>
      </el-form-item>
    </el-form>
  
    <span
      slot="footer"
      class="dialog-footer"
    >
      <el-button @click="handleClose">取 消</el-button>
      <el-button
        type="primary"
        @click="enter"
      >确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'EditPassword',
  props: {
    visible: {
      type: Boolean,
      default() {
        return false;
      },
    },
    userId: {
      type: String,
      default: ''
    },
    form: {
      type: Object,
      default() {
        return {
          oldPassword: '',
          newPassword: '',
          newPasswordConfirm: ''
        };
      }
    }
  },
  data() {
    return {
      rules: {
        oldPassword: [
          { required: true, message: '请输入当前密码', trigger: 'blur' },
        ],  
        newPassword: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ], 
        newPasswordConfirm: [
          { required: true, message: '请再次确认密码', trigger: 'blur' },
        ], 
      }
    };
  },
  methods: {
    handleClose() {
      this.$emit('update:visible', false);
    },
    enter() {
      this.$refs.form.validate(() => {});
    }
  }

};
</script>
