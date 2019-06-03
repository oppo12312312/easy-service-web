<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-31 14:46:49
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-02 15:19:57
 -->

<template>
  <div class="login-container db v">
    <div class="login-title">
      <div class="login-logo">
      </div>
      <div class="login-text">
        旷视软件客户服务中心
      </div>
    </div>

    <div class="login-form">
      <div 
        class="login-form-right" 
        @keyup.enter="handleLogin"
      >
        <div class="title">
          <span>用户登录</span>
        </div>
        <div class="login-form-title">
          用户名
        </div>
        <div class="login-form-input username-input">
          <el-input
            placeholder="请输入用户名"
            autofocus
            clearable
            v-model="loginForm.userName" 
            prefix-icon="iconfont icon-username"
          >
          </el-input>
        </div>
        <div class="login-form-title password">
          密码 
        </div>
        <div class="login-form-input password-input">
          <el-input
            placeholder="请输入密码"
            type="password"
            v-model="loginForm.password" 
            clearable
            prefix-icon="iconfont icon-password"
          >
          </el-input>
        </div>
        <div 
          class="login-confirm" 
          @click="handleLogin"
        >
          登录
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      }
    };
  },
  methods: {
    handleLogin() {
      this.$router.push({
        name: 'home'
      });
    }
  }

};
</script>
