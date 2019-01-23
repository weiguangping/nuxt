<template>
  <div class="first_login">
    <div class="vessel">
      <v-header :left-menu="true"/>
      <div class="main">
        <input 
          ref="captcha" 
          type="hidden" 
          name="a">
        <input 
          id="scene" 
          type="hidden" 
          name="scene" 
          value="nvc_login">
        <div class="title">
          {{ $t('login.title') }}
        </div>
        <ul>
          <li>
            <label>
              {{ $t('login.account') }}
            </label>
            <input 
              v-model="username" 
              :class="{borderRed:usernameBol>0}" 
              type="text"
              @blur="validation('username', 0)" 
              @focus="focus()" 
              @keyup.13="login">
            <prompt 
              v-show="usernameBol>0&&index==0" 
              :top="-12">
              <template>
                {{ usernameBol==1?$t('prompt.accountEmpty'):(usernameBol==2?$t('prompt.usernameErr'):$t('prompt.existPhone')) }}
              </template>
            </prompt>
          </li>
          <li>
            <label>
              {{ $t('login.password') }}
            </label>
            <input 
              v-model="password" 
              :class="{borderRed:pwdBol>0}" 
              type="password"
              @blur="validation('password', 1)" 
              @focus="focus()" 
              @keyup.13="login">
            <prompt 
              v-show="pwdBol>0&&index==1" 
              :top="-12">
              <template>
                {{ pwdBol==1?$t('prompt.pwdEmpty'):$t('prompt.pwdFormat') }}
              </template>
            </prompt>
          </li>
        </ul>
        <button 
          :class="{forbid:loginIn}"
          class="bnt" 
          @click="login"><img 
            v-show="loginIn"
            src="../../assets/images/loading.svg" 
            class="rotate"> <span v-show="!loginIn">{{ $t('bnt.login') }}</span></button>
        <div 
       
          class="box">
          <router-link :to="{path:'/pwd'}">{{ $t('login.forget') }}</router-link>
          <router-link 
            :to="{path:'/register'}" 
            class="fr">{{ $t('login.registered') }}
          </router-link>
        </div>
      </div>
      <v-footer/>
      <security 
        v-if="bol"
        ref="security" 
        :data="obj" 
        @cancel="cancel" 
        @obainVal="obainVal"/>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import {
  vHeader,
  prompt,
  security,
  vFooter
} from '../../components/login/index.js'

import Validation from '~/assets/js/validation.js'
// import "~/assets/js/auth.js";
export default {
  name: 'Login',
  head() {
    return {
      title: this.$t('seo.login.title')
    }
  },
  components: {
    vHeader,
    prompt,
    vFooter,
    security
  },
  data() {
    return {
      bol: false,
      isLogin: '',
      username: '183761416@qq.com',
      usernameBol: 0,
      password: 'huang0228',
      pwdBol: 0,
      index: -1,
      obj: '',
      scene: 'nvc_login',
      callback: 'jsonp_callback',
      loginIn: false
    }
  },
  created() {},
  mounted() {},
  methods: {
    ...mapActions(['setLoginStatus']),
    login() {
      this.usernameBol = this.username == '' ? 1 : 0
      this.pwdBol = this.password == '' ? 1 : 0
      if (this.usernameBol > 0) {
        this.index = 0
        return false
      }
      if (this.pwdBol > 0) {
        this.index = 1
        return false
      }
      this.loginIn = true
      this.$api
        .login({
          username: this.username,
          password: this.password
          // a: getNVCVal(),
          // scene: this.scene,
          // _captcha_version: 1,
          // callback: this.callback
        })
        .then(res => {
          this.strategy()
          // if (res.authenticated) {
          //   this.strategy();
          // }
        })
        .catch(res => {
          this.$toast('err', this.$t('message.' + res.message))
        })
    },
    strategy() {
      this.$api.loginStrategy().then(res => {
        switch (res.strategy) {
          case 'PWD':
            this.setLoginStatus(true)
            this.$router.push('/')
            this.loginIn = false
            break
          default:
            this.obj = res
            this.bol = true
            break
        }
      })
    },
    verifying(data) {
      this.$api
        .loginVerifying({
          captcha_code: data.captcha_code,
          google_code: data.google_code
        })
        .then(res => {
          if (res.code == 302) {
            this.setLoginStatus(true)
            this.$router.push('/')
            return false
          }

          if (res == false) {
            this.$toast('err', this.$t('message.codeErr'), 2)
            return false
          }
          this.loginIn = false
          this.$refs.security.confirmCancel()
        })
        .catch(res => {
          this.$refs.security.confirmCancel()
          this.$toast('err', this.$t('message.' + res.message), 2)
        })
    },
    obainVal(data) {
      //console.log(data)
      this.verifying(data)
    },
    focus() {
      this.index = -1
    },
    validation(type, index) {
      this.index = index
      switch (type) {
        case 'username':
          this.usernameBol = this.username == '' ? 1 : 0
          break
        case 'password':
          this.pwdBol = this.password == '' ? 1 : 0
          break
      }
    },
    cancel() {
      this.loginIn = false
      this.bol = false
    }
  }
}
</script>

<style lang="less">
@import '../../assets/less/login.less';
.first_login {
  color: #cbd0d6;

  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
  .vessel {
    width: 100%;
    min-height: 100%;
    background: url(../../assets/images/loginBg.png) center 389px
      no-repeat#0E121C;
    position: relative;
    .main {
      padding: 130px 0 657px 0;
      width: 468px;
      margin: auto;
      .title {
        font-size: 32px;
        font-weight: 600;
        font-family: PingFangSC-Semibold;
        padding-bottom: 20px;
      }
      ul {
        li {
          position: relative;
          label {
            display: block;
            font-size: 12px;
            padding: 20px 0 10px 0;
          }
          input {
            width: 100%;
            height: 50px;
            border-radius: 4px;
            padding: 0 20px;
            display: block;
            box-sizing: border-box;
          }
        }
      }
      button {
        width: 100%;
        height: 50px;
        border-radius: 4px;
        display: block;
        border: 0;
        margin: 60px 0 30px 0;
        cursor: pointer;
        position: relative;

        img {
          width: 25px;
        }
        span {
          vertical-align: top;
          line-height: 28px;
        }
      }
      .box {
        a {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
