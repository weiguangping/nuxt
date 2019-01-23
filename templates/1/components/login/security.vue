<template >
  <div class="first_popup first_verification">
    <div class="content">
      <i 
        class="iconfont icon-guanbi" 
        @click="cancel"/>
      <div class="title">{{ $t('login.security') }}</div>
      <div class="txt">
          
        <p v-if="data&&data.user.tel">
          {{ $t('login.iphone') }}：{{ data.user.tel|substring }}
        </p>
        <p v-else>
          {{ $t('login.email') }}：{{ data.user.email|substring }}
        </p>
      </div>
      <ul>
        <li v-if="data.strategy.indexOf('REMOTE')>-1">
          <label>
            {{ $t('login.code') }}
          </label>
          <div class="code">
            <input 
              v-model="captcha" 
              :class="{borderRed:captchaBol>0}" 
              type="text" 
              @blur="validation('captcha', 0)" 
              @focus="focus(0)">
            <div 
              class="codeBnt" 
              @click="obainCode" >
              <countdown 
                ref="code" 
                :state="countdownState" 
                @end="endCode"/>
            </div>
          </div>
          <prompt 
            v-show="captchaBol>0&&index==0" 
            :top="-32">
            <template>
              {{ captchaBol==1?$t('prompt.captchaEmpty'):$t('prompt.captchaFormat') }}
            </template>
          </prompt>
        </li>
        <li 
          v-if="data.strategy.indexOf('GOOGLE')>-1" 
          class="pwd">
          <label>{{ $t('login.googleTxt') }}</label>
          <grid 
            :bol="google.bol" 
            :val="google.val" 
            :focus="google.focus" 
            :type="1"/>
          <input 
            ref="first" 
            v-model="google.val" 
            type="text" 
            maxlength="6" 
            @focus="focus(1)" 
            @blur="validation('google',1)">
         
          <prompt 
            v-show="google.bol>0&&index==1" 
            :top="-32">
            <template>
              {{ google.bol==1?$t('prompt.googleEmpty'):$t('prompt.googleFormat') }}
            </template>
          </prompt>
        </li>
      
      </ul>
      <button 
        :class="{forbid:confirmIn}"
        class="bnt" 
        @click="determine">
        <img 
          v-show="confirmIn"
          src="../../assets/images/loading.svg" 
          class="rotate">
        <span v-show="!confirmIn">  {{ $t('bnt.confirm') }}</span>
      </button>
    </div>

  </div>
</template>
<script>
import countdown from '../public/countdown/countdown'
import prompt from '../public/prompt/index.vue'
import grid from '../public/grid/index.vue'
import Validation from '~/assets/js/validation.js'
export default {
  components: {
    countdown,
    prompt,
    grid
  },
  filters: {
    substring(data) {
      if (data) {
        if (data.indexOf('@') > -1) {
          let arr = data.split('@')
          let name = data.substring(0, 4) + '***@' + arr[1]
          return name
        }
        let name =
          data.substring(0, 3) +
          '***' +
          data.substring(data.length - 4, data.length)
        return name
      }
    }
  },
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      countdownState: 0,
      google: {
        bol: 0,
        val: '',
        focus: false
      },
      captcha: '',
      captchaBol: 0,
      index: -1,
      bol: true,
      confirmIn: false
    }
  },
  watch: {
    google: {
      handler(newVal, oldVal) {
        if (newVal.val.length == 6 && this.captcha != '' && this.bol == true) {
          this.bol = false
          this.determine()
        } else {
          this.bol = newVal.val.length < 6 ? true : false
        }
      },
      deep: true
    }
  },
  created() {},
  methods: {
    cancel() {
      this.confirmIn = false
      this.$emit('cancel')
    },
    confirmCancel() {
      this.confirmIn = false
    },
    focus(type) {
      this.index = -1
      if (type == 1) {
        this.google.bol = 0
        this.google.focus = true
      }
    },
    validation(type, index) {
      this.index = index
      switch (type) {
        case 'captcha':
          this.captchaBol = Validation.code(this.captcha)
          break
        default:
          this.google.bol = Validation.google(this.google.val)
          this.google.focus = false
          break
      }
    },
    obainCode() {
      if (this.countdownState == 1 || this.countdownState == 3) {
        return false
      }
      this.countdownState = 1
      this.$api
        .loginObainCode()
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
          if (res.message === 'credential.doesnot.unique') {
            this.accountBol = 3
            this.countdownState = 2
            return false
          }
          this.$toast('err', this.$t('message.' + res.message), 2)
        })
    },
    endCode() {
      this.countdownState = 2
    },
    determine() {
      this.captchaBol = Validation.code(this.captcha)
      this.google.bol = Validation.google(this.google.val)
      if (this.captchaBol > 0 && this.data.strategy.indexOf('REMOTE') > -1) {
        this.index = 0
        return false
      }
      if (this.google.bol > 0 && this.data.strategy.indexOf('GOOGLE') > -1) {
        this.index = 1
        return false
      }
      this.confirmIn = true
      this.$emit('obainVal', {
        captcha_code: this.captcha,
        google_code: this.google.val
      })
    }
  }
}
</script>
<style lang="less">
.first_popup {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  z-index: 9;
  justify-content: center;
  align-items: center;
  .first_propmt {
    background-color: #0e121c;
    color: #687284;
    .position {
      i {
        color: #0e121c;
      }
    }
  }
  .content {
    display: inline-block;
    width: 400px;
    box-sizing: border-box;
    padding: 50px;
    position: relative;
    .icon-guanbi {
      font-size: 11px;
      position: absolute;
      right: 20px;
      top: 20px;
      cursor: pointer;
    }
    .title {
      padding-bottom: 22px;
      font-size: 20px;
      line-height: 1;
      text-align: left;
    }
    li {
      position: relative;
      margin-top: 30px;
      label {
        text-align: left;
        display: block;
        padding: 0px 0 10px 0;
        font-size: 12px;
        line-height: 1;
      }
      .txt {
        height: 40px;
      }
      input {
        width: 300px;
        height: 40px;
        border-radius: 4px;
        overflow-x: hidden;
        &.phone {
          width: 220px;
          border-bottom-left-radius: 0;
          border-top-left-radius: 0;
        }
      }
      .area {
        position: relative;
        input {
          text-align: center;
          font-size: 12px;
          width: 80px;
          border-bottom-right-radius: 0;
          border-top-right-radius: 0;
          border-right: 0;
          padding-right: 35px;
          cursor: pointer;
        }
        i {
          position: absolute;
          top: 50%;
          right: 18px;
          margin-top: -8px;
          font-size: 5px;
        }
      }
      &.pwd {
        input {
          position: absolute;
          top: 22px;
          opacity: 0;
          z-index: 9;
          left: 0;
        }
        a {
          height: 20px;
          width: 2px;
          display: inline-block;
          position: absolute;
          top: 10px;
        }
      }
    }
    .bnt {
      width: 140px;
      height: 40px;
      border-radius: 4px;
      border: 0;
      margin-top: 50px;
      cursor: pointer;
    }
    .location {
      position: absolute;
      top: 23px;
      right: 3px;
    }
    .code {
      padding-right: 120px;
    }
    .select {
      position: absolute;
      top: 62px;
      left: 0;
      right: 0;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 9;
      box-sizing: border-box;
      padding: 15px 0;
      height: 200px;
      li {
        cursor: pointer;
        margin-top: 0;
        height: 34px;
        padding: 0 15px 0 40px;
        line-height: 34px;
        img {
          position: absolute;
          left: 10px;
          margin: 9px 10px 9px 0;
        }
        span {
          display: block;
          &:nth-child(2) {
            float: left;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            width: 200px;
          }
          &:nth-child(3) {
            float: right;
          }
        }
      }
    }
  }
  @-webkit-keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .pwd a {
    animation: fade 3000ms infinite;
    -webkit-animation: fade 1000ms infinite;
  }
}
.first_verification {
  text-align: left;
  .txt {
    margin-top: -12px;
    p {
      font-size: 12px;
      text-align: left;
      line-height: 18px;
    }
  }
  .code {
    position: relative;
    input {
      padding-right: 110px;
      padding-left: 8px;
      box-sizing: border-box;
    }
    .codeBnt {
      position: absolute;
      top: 50%;
      right: 2px;
      margin-top: -18px;
    }
  }
}
</style>
