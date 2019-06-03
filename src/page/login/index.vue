<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-31 14:46:49
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-03 15:05:06
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

    <div
      class="login-form"
      v-if="login"
    >
      <div 
        class="login-form-right" 
        @keyup.enter="handleLogin"
      >
        <div class="title">
          <span></span>
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
    <div
      class="login-form"
      v-else
    >
      <div
        class="phone-verify"
      >
        <el-input
          v-model="verifyNumber"
          placeholder="请输入验证码"
        ></el-input>
        <el-button
          class="mt"
          :type="timeOver? 'primary': 'info'"
          :disabled="!timeOver"
        >
          {{ verifyText }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        userName: '',
        password: ''
      },
      verifyNumber: '',
      sec: 60,
      login: true,

    };
  },
  computed: {
    verifyText() {
      let re = '';
      if (this.timeOver) {
        re = '重新获取';
      } else {
        re = `${this.sec} s 之后重新获取`;
      }
      return re;
    },
    timeOver() {
      return this.sec === 0;
    }
  },
  watch: {
    login(value) {
      debugger;
      if (!value) {
        this.start();
      }
    }
  },
  methods: {
    handleLogin() {
      this.login = false;
    },
    start() {
      this.sec = 3;
      const scope = this;
      scope.timer = setInterval(() => {
        if (scope.sec > 0) {
          scope.sec--;
        } else {
          clearInterval(scope.timer);
        }
      }, 1000);
    }
  }

};
</script>
