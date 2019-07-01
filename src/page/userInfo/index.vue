<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-06-02 15:17:03
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-28 16:36:32
 -->
<template>
  <div class="meg-user-info">
    <megTitle>账户信息修改</megTitle>
    <el-form
      :rules="rules"
      :model="ruleForm" 
      ref="form"
      label-position="left"
      label-width="100px"
    >
      <el-form-item
        label="名称"
        prop="userName"
      >
        <el-input
          :disabled="true"
          v-model="ruleForm.userName"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="当前密码"
        prop="oldPwd"
      >
        <el-input
          v-model="ruleForm.oldPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="新密码"
        prop="newPwd"
      >
        <el-input
          v-model="ruleForm.newPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item
        label="确认新密码"
        prop="confirmPwd"
      >
        <el-input
          v-model="ruleForm.confirmPwd"
          type="password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="changePassword"
        >
          确认修改密码
        </el-button>
      </el-form-item>
    </el-form>
    
    <megTitle class="mt40">
      绑定信息(只读）
    </megTitle>

    <el-form
      label-width="100px"
      label-position="left"
    >
      <el-form-item label="绑定邮箱">
        <el-input
          v-model="email"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="绑定手机">
        <el-input
          v-model="phone"
          :disabled="true"
        ></el-input>
      </el-form-item>
      <el-form-item label="公司名称">
        <el-input
          v-model="company"
          :disabled="true"
        ></el-input>
      </el-form-item>
    </el-form>
    <el-alert
      show-icon
      title="如有修改账户绑定信息的需求，请联系商务"
      type="info"
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
      editVisible: false,
      ruleForm: {
        oldPwd: '',
        newPwd: '',
        confirmPwd: '',
        userName: '',
      },
     

      email: '',
      phone: '',
      company: '',
      rules: {
        oldPwd: [{ required: true, message: '请输入当前密码', trigger: 'blur' }],
        newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        confirmPwd: [{ required: true, message: '请确认新秘密', trigger: 'blur' }],
      }
   
    };
  },
  computed: {
    userId() {
      return this.$store.getters['user/getUserInfo'].id;
    },
  },
  mounted() {
    this.$service.userInfo.getUserInfo({ user_id: this.userId })
      .then((response) => {
        console.log(response);
        this.ruleForm.userName = response.data.name;
        this.email = response.data.email;
        this.phone = response.data.phone_number;
        this.company = response.data.company_name;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    changePassword() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.ruleForm.newPwd !== this.ruleForm.confirmPwd) {
            this.$message.warning('两次输入的密码不一样！');
          } else {
            this.$service.userInfo.editUserInfo({ 
              user_id: this.userId,
              new_pwd: this.ruleForm.newPwd,
              current_pwd: this.ruleForm.oldPwd, 
            })
              .then(() => {
                this.$message.success('修改成功！');
              })
              .catch(() => {
                // this.$message.warning('当前密码错误！');
              });
          }
        }
      });
    }
  }

};
</script>

<style>

</style>
