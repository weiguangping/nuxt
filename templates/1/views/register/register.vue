<template>
  <div>
    <first-header v-if="!$store.state.bol"></first-header>
      <div class="view">
        <div class="register">

          <div id="register">
            <div class="main">
              <input type="hidden" id="scene" name="scene" value="nvc_register">
              <input type="hidden" name="a" ref="captcha">
              <div class="title">{{$t('login.registered')}}</div>
              <div class="tab">
                <p :class="{active:indexTab===0}" @click="chose(0)">
                  <span>{{$t('login.iphoneReg')}}</span>
                </p>
                <p :class="{active:indexTab===1}" @click="chose(1)">
                  <span>{{$t('login.emailReg')}}</span>
                </p>
              </div>
              <ul>
                <li v-if="indexTab===0">
                  <label>{{$t('login.iphone')}}</label>
                  <div class="iphone">
                    <input
                      type="text"
                      v-model="account"
                      @blur="validation('phone', 0)"
                      @focus="focus()"
                      :class="{borderRed:accountBol>0}"
                    >
                    <div class="selectBox">
                      <country-code @obainVal="obainVal"></country-code>
                    </div>
                  </div>
                  <prompt :top="-12" v-show="accountBol>0&&index==0">
                    <template>{{accountBol==1?$t('prompt.accountEmpty'):(accountBol==2?$t('prompt.accountFormat'):$t('prompt.existPhone'))}}</template>
                  </prompt>
                </li>
                <li v-if="indexTab===1">
                  <label>{{$t('login.email')}}</label>
                  <input
                    type="text"
                    v-model="account"
                    @blur="validation('email', 0)"
                    @focus="focus()"
                    :class="{borderRed:accountBol>0}"
                  >
                  <prompt :top="-12" v-show="accountBol>0&&index==0">
                    <template>{{accountBol==1?$t('prompt.accountEmpty'):(accountBol==2?$t('prompt.emailFormat'):$t('prompt.existPhone'))}}</template>
                  </prompt>
                </li>
                <li>
                  <label>{{$t('login.loginPwd')}}</label>
                  <input
                    type="password"
                    v-model="password"
                    @blur="validation('password', 1)"
                    @focus="focus()"
                    :class="{borderRed:pwdBol>0}"
                  >
                  <prompt :top="-12" v-show="pwdBol>0&&index==1">
                    <template>{{pwdBol==1?$t('prompt.pwdEmpty'):$t('prompt.pwdFormat')}}</template>
                  </prompt>
                </li>
                <li>
                  <label>{{$t('login.code')}}</label>
                  <div class="code">
                    <input
                      type="text"
                      v-model="captcha"
                      @blur="validation('captcha', 2)"
                      @focus="focus()"
                      :class="{borderRed:captchaBol>0}"
                    >
                    <div @click="obainCode" class="codeBnt">
                      <countdown ref="code" @end="endCode" :state="countdownState"></countdown>
                    </div>
                    <prompt :top="-54" v-show="captchaBol>0&&index==2">
                      <template>{{$t('prompt.captchaEmpty')}}</template>
                    </prompt>
                    <!-- <prompt :top="-54">
                      <template>{{$t('prompt.captchaEmpty')}}</template>
                    </prompt> -->
                  </div>
                </li>

                <li>
                  <label>{{$t('login.invitation')}}</label>
                  <input type="text" v-model="invitation_code">
                </li>
              </ul>

              <button
                class="bnt"
                @click="register"
                :class="!checkBol?'dropdown':''"
              >{{$t('login.registered')}}</button>
              <div class="bottom">
                <div class="fl">
                  <i @click="check" :class="{'icon-gouxuan1':checkBol}" class="iconfont"></i>
                  <span>{{$t('txt.txt1')}}</span>
                  <a
                    target="_blank"
                    :href="$store.state.homeURL+'#/common/page/USER_AGREEMENT'"
                  >{{$t('txt.txt2')}}</a>
                </div>
                <div class="fr">
                  {{$t('txt.txt3')}}
                  <router-link :to="{path:'/login'}">{{$t('txt.txt4')}}</router-link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    <first-footer v-if="!$store.state.bol"></first-footer>
  </div>
</template>

<script>
import firstRegister from '~/templates/1/views/register/index.vue'
import firstHeader from '~/templates/1/views/register/index.vue'
import countdown from "~/template/1/components/oauthPublic/countdown/countdown";
import countryCode from "~/template/1/components/oauthPublic/select/countryCode";
import prompt from "~/template/1/components/oauthPublic/prompt/prompt";
import Validation from "~/assets/js/validation.js";
export default {
  name: "register",
  components: {
    firstHeader,
    firstFooter,
    countdown,
    countryCode,
    prompt
  },
  data() {
    return {
      indexTab: 0,
      index: -1,
      countdownState: 0,
      prefix: "86",
      checkBol: true,
      account: "",
      accountBol: 0,
      password: "",
      pwdBol: 0,
      captcha: "",
      captchaBol: 0,
      invitation_code: "",
      scene: "nvc_register",
      callback: "jsonp_callback"
    };
  },
  computed: {
    fullAccount() {
      return this.indexTab == 0
        ? "+" + this.prefix + this.account
        : this.account;
    }
  },
  created() {
    if (this.$route.query.code) {
      this.invitation_code = this.$route.query.code;
    }
  },
  mounted() {
    require("~/assets/js/auth.js");
  },

  methods: {
    chose(i) {
      this.account = "";
      this.password = "";
      this.captcha = "";
      this.invitation_code = "";
      this.index = -1;
      this.accountBol = 0;
      this.indexTab = i;
      this.countdownState = 0;
    },
    obainVal(data) {
      if (data.type == "country") {
        this.prefix = data.data.d;
      }
    },
    focus() {
      this.index = -1;
    },
    validation(type, index) {
      this.index = index;
      switch (type) {
        case "phone":
          this.accountBol = Validation.phone(this.account);
          break;
        case "email":
          this.accountBol = Validation.email(this.account);

          break;
        case "password":
          this.pwdBol = Validation.password(this.password);
          break;
        case "captcha":
          this.captchaBol = Validation.code(this.captcha);
          break;
      }
    },
    obainCode() {
      this.index = 0;
      if (this.countdownState == 1 || this.countdownState == 3) {
        return false;
      }
      if (this.indexTab == 0) {
        this.accountBol = Validation.phone(this.account);
      }
      if (this.indexTab == 1) {
        this.accountBol = Validation.email(this.account);
      }
      if (this.accountBol > 0) {
        this.index = 0;
        return false;
      }
      this.countdownState = 1;
      this.api
        .registerCaptha({
          prefix: "+" + this.prefix,
          account: this.fullAccount,
          a: getNVCVal(),
          scene: "nvc_message",
          _captcha_version: 1,
          callback: this.callback
        })
        .then(res => {
          if (res) {
            this.countdownState = 3;
            this.$refs.code.obtainCode();
            this.$toast("success", this.$t("message.sendSuccess"), 2);
          } else {
            this.countdownState = 3;
            this.$toast(
              "success",
              this.$t("message.oauth2_captcha_check_error"),
              2
            );
          }
        })
        .catch(res => {
          if (res.message == "credential.doesnot.unique") {
            this.accountBol = 3;
            this.countdownState = 2;
            return false;
          }
          this.$toast("err", this.$t("message." + res.message), 2);
        });
    },
    endCode() {
      this.countdownState = 2;
    },
    check() {
      this.checkBol = !this.checkBol;
    },
    register() {
      if (!this.checkBol) {
        return false;
      }
      if (this.indexTab == 0) {
        this.accountBol = Validation.phone(this.account);
      }
      if (this.indexTab == 1) {
        this.accountBol = Validation.email(this.account);
      }
      this.pwdBol = Validation.password(this.password);
      this.captchaBol = Validation.code(this.captcha);
      if (this.accountBol > 0) {
        this.index = 0;
        return false;
      }
      if (this.pwdBol > 0) {
        this.index = 1;
        return false;
      }
      if (this.captchaBol > 0) {
        this.index = 2;
        return false;
      }

      this.api
        .register({
          prefix: "+" + this.prefix,
          account: this.fullAccount,
          password: this.password,
          captcha: this.captcha,
          invitation_code: this.invitation_code,
          a: getNVCVal(),
          scene: this.scene,
          _captcha_version: 1,
          callback: this.callback
        })
        .then(res => {
          if (res.code == 302) {
            this.$toast("success", this.$t("message.registerSuccess"), 2);
            this.$router.push(res.location);
          }
        })
        .catch(res => {
          this.$toast("err", this.$t("message." + res.message), 2);
        });
    }
  }
}
</script>

<style lang="less">
@import url('../../assets/less/login');
.register{
  background-image: url(../../assets/images/firstLoginBg.png);
  background-position:  center bottom;
  background-repeat: no-repeat;
  padding-bottom: 177px;
  padding-top: 80px;
}

#register {
  text-align: left;
  .main {
    width: 468px;
    margin: auto;
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

  .dropdown {
    cursor: not-allowed !important;
  }
}
</style>
