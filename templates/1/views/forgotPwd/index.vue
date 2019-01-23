<template>
  <div class="first_resetPwd">
    <div class="vessel">
      <v-header :left-menu="true"/>
      <input 
        ref="captcha" 
        type="hidden" 
        name="a">
      <input 
        id="scene" 
        type="hidden" 
        name="scene" 
        value="nvc_login">
      <div class="main">
        <div class="title">{{ $t('login.resetPwd') }}</div>

        <div class="tab">
          <p 
            :class="{active:indexTab===0}" 
            @click="chose(0)">
            <span>{{ $t('login.iphone') }}</span>
          </p>
          <p 
            :class="{active:indexTab===1}" 
            @click="chose(1)">
            <span>{{ $t('login.email') }}</span>
          </p>
        </div>
        <ul>
          <li v-if="indexTab===0">
            <label>{{ $t('login.iphone') }}</label>
            <div class="iphone">
              <input
                v-model="account"
                :class="{borderRed:accountBol>0}"
                type="text"
                @blur="validation('phone', 0)"
                @focus="focus()"
              >
              <div class="selectBox">
                <country-code @obainVal="obainVal"/>
              </div>
            </div>
            <prompt 
              v-show="accountBol>0&&index==0" 
              :top="-12">
              <template>{{ accountBol==1?$t('prompt.accountEmpty'):(accountBol==2?$t('prompt.accountFormat'):$t('prompt.isPhone')) }}</template>
            </prompt>
          </li>
          <li v-if="indexTab===1">
            <label>{{ $t('login.email') }}</label>
            <input
              v-model="account"
              :class="{borderRed:accountBol>0}"
              type="text"
              @blur="validation('email', 0)"
              @focus="focus()"
            >
            <prompt 
              v-show="accountBol>0&&index==0" 
              :top="-12">
              <template>{{ accountBol==1?$t('prompt.accountEmpty'):(accountBol==2?$t('prompt.accountFormat'):$t('prompt.isPhone')) }}</template>
            </prompt>
          </li>
          <li>
            <label>{{ $t('login.code') }}</label>
            <div class="code">
              <input
                v-model="captcha"
                :class="{borderRed:captchaBol>0}"
                type="text"
                @blur="validation('captcha', 2)"
                @focus="focus()"
              >
              <div 
                class="codeBnt" 
                @click="obainCode">
                <countdown 
                  ref="code" 
                  :state="countdownState" 
                  @end="endCode"/>
              </div>
            </div>
            <prompt 
              v-show="captchaBol>0&&index==2" 
              :top="-12">
              <template>{{ captchaBol==1?$t('prompt.captchaEmpty'):$t('prompt.captchaFormat') }}</template>
            </prompt>
          </li>
          <li>
            <label>{{ $t('login.password') }}</label>
            <input
              v-model="password"
              :class="{borderRed:pwdBol>0}"
              type="password"
              @blur="validation('password', 1)"
              @focus="focus()"
            >
            <prompt 
              v-show="pwdBol>0&&index==1" 
              :top="-12">
              <template>{{ pwdBol==1?$t('prompt.pwdEmpty'):$t('prompt.pwdFormat') }}</template>
            </prompt>
          </li>
        </ul>
        <button 
          class="bnt" 
          @click="reset">{{ $t('bnt.reset') }}</button>
      </div>
      <v-footer/>
    </div>
  </div>
</template>

<script>
import {
  vHeader,
  vFooter,
  countdown,
  prompt,
  countryCode
} from '../../components/forgotPwd'
import Validation from '~/assets/js/validation.js'
export default {
  name: 'Pwd',
  components: {
    vHeader,
    vFooter,
    countdown,
    countryCode,
    prompt
  },
  data() {
    return {
      indexTab: 0,
      index: -1,
      countdownState: 0,
      prefix: '86',
      checkBol: true,
      account: '13799252402',
      accountBol: 0,
      password: '',
      pwdBol: 0,
      captcha: '',
      captchaBol: 0,
      scene: 'nvc_login',
      callback: 'jsonp_callback'
    }
  },

  mounted() {
    require('~/assets/js/auth.js')
  },
  methods: {
    chose(i) {
      this.account = ''
      this.password = ''
      this.captcha = ''

      this.index = -1
      this.accountBol = 0
      this.pwdBol = 0
      this.captchaBol = 0
      this.indexTab = i
      this.countdownState = 0
    },
    obainVal(data) {
      if (data.type == 'country') {
        this.prefix = data.d
      }
    },
    focus() {
      this.index = -1
    },
    validation(type, index) {
      this.index = index
      switch (type) {
        case 'phone':
          this.accountBol = Validation.phone(this.account)
          break
        case 'email':
          this.accountBol = Validation.email(this.account)
          console.log(this.accountBol)
          break
        case 'password':
          this.pwdBol = Validation.password(this.password)
          break
        case 'captcha':
          this.captchaBol = Validation.code(this.captcha)
          break
      }
    },
    obainCode() {
      this.index = 2
      if (this.countdownState == 1 || this.countdownState == 3) {
        return false
      }
      if (this.indexTab == 0) {
        this.accountBol = Validation.phone(this.account)
      }
      if (this.indexTab == 1) {
        this.accountBol = Validation.email(this.account)
      }
      if (this.accountBol > 0) {
        this.index = 0
        return false
      }
      this.countdownState = 1
      this.$api
        .pwdCaptha({
          prefix: '+' + this.prefix,
          account:
            this.indexTab == 0
              ? '+' + this.prefix + this.account
              : this.account,
          a: getNVCVal(),
          scene: 'nvc_message',
          _captcha_version: 1,
          callback: this.callback
        })
        .then(res => {
          if (res) {
            this.countdownState = 3
            this.$refs.code.obtainCode()
            this.$toast('success', this.$t('message.sendSuccess'), 2)
          } else {
            this.countdownState = 3
            this.$toast(
              'success',
              this.$t('message.oauth2_captcha_check_error'),
              2
            )
          }
        })
        .catch(res => {
          if (res.message === 'credential.doesnot.exist') {
            this.accountBol = 3
            this.countdownState = 2
            let err = res.message
            if (err.includes('credential.doesnot.exist')) {
              this.$toast('err', this.$t(`message.credential_doesnot_exist`), 2)
            } else {
              this.$toast('err', this.$t(`message.${err}`), 2)
            }
            return false
          }
        })
    },
    endCode() {
      this.countdownState = 2
    },
    check() {
      this.checkBol = !this.checkBol
    },
    reset() {
      if (this.indexTab == 0) {
        this.accountBol = Validation.phone(this.account)
      }
      if (this.indexTab == 1) {
        this.accountBol = Validation.email(this.account)
      }
      this.pwdBol = Validation.password(this.password)
      this.captchaBol = Validation.code(this.captcha)
      if (this.accountBol > 0) {
        this.index = 0
        return false
      }
      if (this.pwdBol > 0) {
        this.index = 1
        return false
      }
      if (this.captchaBol > 0) {
        this.index = 2
        return false
      }

      this.$api
        .reset({
          prefix: '+' + this.prefix,
          account:
            this.indexTab == 0
              ? '+' + this.prefix + this.account
              : this.account,
          password: this.password,
          captcha: this.captcha,
          a: getNVCVal(),
          scene: this.scene,
          _captcha_version: 1,
          callback: this.callback
        })
        .then(res => {
          if (res) {
            this.$toast('success', this.$t('message.updateSuccess'), 2)
            this.$router.push('/' + this.$route.params.lang + '/login')
          } else {
            this.$toast('err', this.$t('message.updateError'), 2)
          }
        })
        .catch(res => {
          this.$toast('err', this.$t('message.' + res.message), 2)
        })
    }
  }
}
</script>

<style lang="less">
@import url('../../assets/less/login');

.first_resetPwd {
  .vessel {
    width: 100%;
    min-height: 100%;
    background: url(../../assets/images/firstLoginBg.png) center 464px no-repeat
      #0e121c;
    position: relative;
    background-repeat: no-repeat;

    box-sizing: border-box;
  }
  .main {
    width: 468px;
    margin: auto;
    padding-bottom: 587px;
    padding-top: 130px;
    .title {
      padding: 0 0 40px 0;
      font-size: 32px;
      font-family: PingFangSC-Semibold;
      font-weight: 600;
      letter-spacing: 2px;
      line-height: 1;
    }
    .tab {
      margin-bottom: 20px;
      p {
        line-height: 1;
        font-size: 14px;
        padding-bottom: 15px;
        font-weight: 400;
        display: inline-block;
        margin-right: 50px;
        box-sizing: border-box;
        span {
          cursor: pointer;
        }
        &.active {
          padding-bottom: 10px;
        }
      }
    }
    ul {
      li {
        position: relative;
        label {
          display: block;
          font-size: 12px;
          padding: 20px 0 10px 0;
          text-align: left;
        }
        input {
          width: 100%;
          height: 50px;
          border-radius: 4px;
          padding: 0 20px;
          display: block;
          box-sizing: border-box;
        }
        .iphone {
          position: relative;
          input {
            padding-left: 98px;
          }
          .selectBox {
            position: absolute;
            top: 1px;
            left: 0;
            width: 88px;
            line-height: 48px;
            z-index: 5;
          }
        }

        .code {
          position: relative;
          input {
            padding-right: 110px;
          }
          .codeBnt {
            position: absolute;
            top: 50%;
            right: 1px;
            margin-top: -19px;
          }
        }
      }
    }
    .bnt {
      width: 100%;
      height: 50px;
      border-radius: 4px;
      display: block;
      border: 0;
      margin: 60px 0 30px 0;
      cursor: pointer;
    }
    .bottom {
      .fl {
        line-height: 14px;
        i {
          width: 14px;
          height: 14px;

          border-radius: 2px;
          float: left;
          -webkit-user-select: none;
          cursor: pointer;
          &.icon-gouxuan1 {
            border: 0;
            font-size: 14px;
          }
        }
        span {
          font-size: 12px;
          padding: 0 10px;
          float: left;
        }
      }
      .fr {
        font-size: 12px;

        a {
          margin-left: 5px;
        }
      }
      a {
        font-size: 12px;
      }
    }
  }
}
</style>
