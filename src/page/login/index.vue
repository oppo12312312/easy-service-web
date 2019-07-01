<!--
 * @Description: 
 * @Author: zhongshuai
 * @Date: 2019-05-31 14:46:49
 * @LastEditors: zhongshuai
 * @LastEditTime: 2019-06-21 14:27:13
 -->

<template>
  <div
    class="dbv1"
  >
    <div
      class="login-container db v"
    >
      <div class="login-title">
        <div class="login-logo">
        </div>
        <div class="login-text">
          旷视软件客户服务中心
        </div>
        <div class="fx1"></div>
        <div class="lang-buttom">
          <div
            @click="lang = 'zh-CN'"
            :class="{ 'on': langCn}"
          >
            <span>中</span>
          </div>
          <div
            @click="lang = 'en-US'"
            class="en"
            :class="{'on': !langCn}"
          >
            <span>En</span>
          </div>
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
            <span>{{ $t('login.userLogin') }}</span>
          </div>
          <div class="login-form-title">
            {{ $t('login.userName') }}
          </div>
          <div class="login-form-input username-input">
            <el-input
              placeholder="请输入用户名"
              autofocus
              clearable
              v-model="loginForm.uname" 
              prefix-icon="iconfont icon-username"
            >
            </el-input>
          </div>
          <div class="login-form-title password">
            {{ $t('login.password') }}
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
            {{ $t('login.login') }}
          </div>
          <div
            v-if="isShowAdminLoginBtn"
            class="inter-login"
            @click="megviiLogin"
          >
            内部登录
          </div>
          <el-popover
            placement="bottom-end"
            width="200"
            trigger="click"
          >
            <ol>1、确认你的邮箱和密码输入正确</ol>
            <ol>2、联系旷视商务，修改您绑定的手机号码</ol>
            <el-button
              slot="reference"
              class="tip"
              type="text"
            >
              {{ $t('login.forgotPassword') }}？
            </el-button>
          </el-popover>
        </div>
      </div>
      <div
        class="login-form"
        v-else
      >
        <div
          class="phone-verify"
          @keyup.enter="handleVerify"
        >
          <div class="login-form-title">
            验证码
          </div>
          <el-row>
            <el-col :span="12">
              <el-input
                maxlength="6"
                v-model="verifyNumber"
                placeholder="请输6位入验证码"
              ></el-input>
            </el-col>
            <el-col
              :span="10"
              :offset="2"
            >
              <el-button

                @click="reVerifyNumber"
                type="text"
                :disabled="!timeOver"
              >
                {{ verifyText }}
              </el-button>
            </el-col>
          </el-row>
          <el-button
            class="mt"
            type="primary"
            @click="handleVerify"
          >
            确认登录
          </el-button>
          <el-popover
            placement="bottom-end"
            width="200"
            trigger="click"
          >
            <ol>1、确认你的手机短信功能正常</ol>
            <ol>2、联系旷视商务，修改您绑定的手机号码</ol>
            <el-button
              slot="reference"
              class="tip"
              type="text"
            >
              没有收到验证码？
            </el-button>
          </el-popover>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { setInterval, clearInterval } from 'timers';
import localStorage from '@/common/util/localStorage.js';
import { Message } from 'element-ui';
export default {
  name: 'Login',
  data() {
    return {
      lang: localStorage.getStore('lang') || 'zh-CN',
      loginForm: {
        uname: '',
        password: ''
      },
      verifyNumber: '',
      sec: 60,
      login: true,
      isShowAdminLoginBtn: !!this.$route.query.is_admin
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
    },
    langCn() {
      return this.lang === 'zh-CN';
    }
  },
  watch: {
    login(value) {
      if (!value) {
        this.start();
      }
    },
    lang(value) {
      localStorage.setStore('lang', value);
      this.$i18n.locale = value;
    }
  },
  beforeRouteEnter(to, from, next) {
    if (from.name === 'home') {
      next();
    } else {
      next(vm => {
        vm.$router.push({ name: 'home' });
      });
    }
  },

  methods: {
    handleLogin() {
      this.enterSystem();
      this.$service.login.login(this.loginForm).then(data => {
        //用户信息放入vuex管理
        const re = data.data;
        this.$store.commit('user/setUserInfo', {
          id: re.user_id
        });
        if (re.login_ok) {
          if (this.$cookies.get('megvii_user')) {
            this.$store.commit('user/setUserRole', {
              // 1:内部管理员
              role_id: 1
            });
            this.$router.push({ name: 'log' });
          } else {
            this.$store.commit('user/setUserRole', {
              // 1:普通用户
              role_id: 2
            });
            if (data.data.need_short_msg) {
              this.login = false;
              this.getShortMessage();
            } else {
              this.enterSystem();
            }
          }
          //
          // if (data.data.need_short_msg) {
          //   this.login = false;
          //   this.getShortMessage();
          // } else {
          //   this.enterSystem();
          // }
        } else {
          Message.closeAll();
          this.$message.warning('用户名或密码错误！');
        }
        console.log(data);
      });
    },
    // megviiLogin() {
    //   const url = serviceUrl.serviceUrl + '/api/v1/oauth2_login?oauth2-callback=' + document.location.href;
    //   window.location = url;
    //   // axios.get(url).then(() => {
    //   //   console.log('内部登录');
    //   // }).catch((error) => {
    //   //   console.log(error);
    //   // });
    // },
    enterSystem() {
      const enterName = this.$store.getters['menu/getMenuList'][0].router;
      this.$router.push({ name: enterName });
    },
    
    handleVerify() {
      this.$service.login.loginShortMessage({
        ...this.loginForm,
        short_msg: this.verifyNumber
      }).then(data => {
        if (data.data.short_msg_ok) {
          this.enterSystem();
        } else {
          Message.closeAll();
          this.$message.warning('验证码错误！');
        }
      });
    },
    getShortMessage() {
      this.$service.login.getShortMessage(this.loginForm).then(data => {
        if (data.data.short_msg_snd_ok) {
          this.$message.success('短信发送成功');
        }
      });
    },
    start() {
      const scope = this;
      scope.sec = 60;
      scope.timer = setInterval(() => {
        if (scope.sec > 0) {
          scope.sec--;
        } else {
          clearInterval(scope.timer);
        }
      }, 1000);
    },
    reVerifyNumber() {
      this.verifyNumber = '';
      this.start();
      this.getShortMessage();
    }
  }

};
</script>
