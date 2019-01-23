<template>
  <div id="Validation">
    <div class="shade"/>
    <div class="formBox">
      <div class="boxHeader">
        <div class="headerTitle">
          {{ $t("asset.authentication") }}
        </div>
        <div class="headerInfo">
          <div class="item">
            {{ $t("asset.account") }}：{{ customer.email?customer.email:customer.mobilePhone|formatPhone }}
          </div>
        </div>
        <div 
          class="close" 
          @click="close">
          <i class="iconfont icon-guanbi"/>
        </div>
      </div>
      <div class="boxMain">
        <ul>
          <!-- 资金密码 -->
          <li class="new-list-item">
            <div class="description-str">{{ $t('asset.assetLabel') }}</div>
            <grid 
              :bol="assetPassword.bol" 
              :val="assetPassword.val" 
              :focus="assetPassword.focus"/>
            <input 
              ref="first" 
              v-model="assetPassword.val" 
              class="validInput" 
              type="text" 
              maxlength="6" 
              @focus="focus('assetPassword')" 
              @blur="validation('assetPassword',0)" >
            <prompt 
              v-if="(assetPassword.bol>0 && focusIndex == 0)" 
              :top="-25">
              <template>{{ assetPassword.bol==1?$t('asset.assetErr'):$t('asset.assetErr2') }}</template>
            </prompt>
          </li>

          <!-- 谷歌密码 -->
          <li 
            v-show="strategy.strategy.withdrawStrategy.includes('GOOGLECODE')" 
            class="new-list-item">
            <div class="description-str">{{ $t('asset.googleLabel') }}</div>
            <grid 
              :type="1" 
              :bol="googlePassword.bol" 
              :val="googlePassword.val" 
              :focus="googlePassword.focus"/>
            <input 
              v-model="googlePassword.val" 
              class="validInput" 
              type="text" 
              maxlength="6" 
              @focus="focus('googlePassword')" 
              @blur="validation('googlePassword',1)" >

            <prompt 
              v-if="(googlePassword.bol>0 && focusIndex == 1)" 
              :top="-25">
              <template>{{ googleErr(googlePassword.bol) }}</template>
            </prompt>

            <!-- <div class="pswp__preloader__icn" v-show="isLoad">
              <div class="pswp__preloader__cut">
                <div class="pswp__preloader__donut"></div>
              </div>
            </div> -->
          </li>

          <!-- 短信邮箱验证 -->
          <li 
            v-show="strategy.strategy.withdrawStrategy.includes('MSG_EMAIL')" 
            class="new-list-item">
            <div class="description-str">{{ $t('asset.codeLabel') }}</div>

            <input 
              :class="{'formErr':code.bol!=0}" 
              v-model="code.val" 
              class="code" 
              type="text" 
              @blur="validation('code',2)">
            <div 
              class="obainCode" 
              @click="obtainCode">
              <countdown 
                ref="code" 
                :state="countdownState" 
                @end="countdownState=2"/>
            </div>
            <prompt 
              v-if="(code.bol>0 && focusIndex == 2)" 
              :top="-25">
              <template>{{ $t('asset.codeErr') }}</template>
            </prompt>
          </li>
        </ul>

        <Button 
          type="primary" 
          class="bnt" 
          style="position: relative" 
          @click="confirm">
          <span v-show="!isLoadFirst">{{ $t('wallet.confirm') }}</span>
          <div 
            v-show="isLoadFirst" 
            class="pswp__preloader__icn" 
            style="position: absolute;top: 50%;left: 50%;margin: -8px 0 0 -10px">
            <div class="pswp__preloader__cut">
              <div class="pswp__preloader__donut"/>
            </div>
          </div>
        </Button>
      </div>
    </div>
  </div>
</template>
<script>
import filter from "~/assets/js/filter.js";
import Verification from "~/assets/js/validation.js";
import countdown from "~/template/1/components/public/countdown/countdown.vue";
import grid from "~/components/grid/grid.vue";
import prompt from "~/components/prompt/prompt.vue";
export default {
  components: {
    countdown,
    grid,
    prompt
  },
  filters: {
    formatEmail(val) {
      return filter.substring(val);
    },
    formatPhone(val) {
      return filter.substring(val);
    }
  },
  props: {
    data: {
      type: Object,
      default: null
    },
    tokenId: {
      type: String,
      default: ""
    },
    strategy: {
      type: String,
      default: null
    },
    customer: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      statue: 0,
      assetPassword: {
        val: "",
        bol: 0,
        focus: false
      },
      googlePassword: {
        val: "",
        bol: 0,
        focus: false
      },
      code: {
        val: "",
        bol: 0
      },
      countdownState: 0,
      isEnd: 1,
      phoneState: 0,
      isLoad: false,
      isLoadFirst: false,
      focusIndex: -1
    };
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    close() {
      this.$emit("close");
    },

    googleErr(val) {
      switch (val) {
        case 1:
          return this.$t("asset.googleErr");
          break;
        case 2:
          return this.$t("asset.googleErr2");
          break;
      }
    },
    validation(type, i) {
      this.focusIndex = i;
      switch (type) {
        case "assetPassword":
          this.assetPassword.focus = false;
          this.assetPassword.bol = Verification.trade(this.assetPassword.val);

          break;
        case "googlePassword":
          this.googlePassword.focus = false;
          this.googlePassword.bol = Verification.google(
            this.googlePassword.val
          );

          break;
        case "code":
          this.code.bol = this.code.val == "" ? 1 : 0;

          break;
      }
    },
    obtainCode() {
      if (this.countdownState == 1 || this.countdownState == 3) {
        return false;
      }
      this.countdownState = 1;
      this.api
        .sendMsgCode({
          scene: "withdrawal"
        })
        .then(res => {
          this.countdownState = 3;
          this.$refs.code.obtainCode();
          this.$toast("success", this.$t("personal.sendSuccess"), 2);
        })
        .catch(res => {
          this.countdownState = 2;
          this.$toast("err", this.$t("personal.sendErr"), 2);
        });
    },
    confirm() {
      let _this = this;
      if (_this.strategy.strategy.withdrawStrategy.includes("GOOGLECODE")) {
        _this.validation("googlePassword", 1);
      }
      if (_this.strategy.strategy.withdrawStrategy.includes("MSG_EMAIL")) {
        _this.validation("code", 2);
      }
      _this.validation("assetPassword", 0);
      if (
        this.assetPassword.bol != 0 ||
        this.googlePassword.bol != 0 ||
        this.code.bol != 0
      ) {
        return false;
      }
      if (this.isLoadFirst) {
        return false;
      }
      this.isLoadFirst = true;
      this.api
        .getWithdrawal({
          coin_code: this.data.coin_code,
          amount: this.data.amount,
          publickey: this.data.publickey,
          memo: this.data.memo,
          password: this.assetPassword.val,
          google_code: this.googlePassword.val,
          code: this.code.val
        })
        .then(res => {
          this.isLoadFirst = false;
          this.$emit("VClose", {
            code: 200
          });
        })
        .catch(res => {
          this.$emit("VClose", {
            code: 500,
            msg: res.message
          });
        });
    },
    focus(type) {
      switch (type) {
        case "assetPassword":
          this.assetPassword.focus = true;
          break;
        case "googlePassword":
          this.googlePassword.focus = true;
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "~@/template/1/assets/less/personal.less";
.shade {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: #000;
  opacity: 0.6;
  z-index: 999;
}
.formBox {
  width: 400px;
  background-color: @color-1;
  position: fixed;
  z-index: 9999;
  top: 120px;
  left: 50vw;
  margin-left: -200px;
  padding: 50px;
  .boxHeader {
    .headerTitle {
      font-size: 20px;
      color: @color-16;
      font-weight: 900;
    }
    .headerInfo {
      margin: 10px 0 30px 0;
      .item {
        font-size: 12px;
        color: @color-57;
        margin-top: 10px;
      }
    }
    .iconfont {
      font-size: 10px;
      position: absolute;
      right: 14px;
      top: 20px;
      cursor: pointer;
    }
  }
  .bnt {
    width: 140px;
    height: 40px;
    margin-top: 50px;
    background-color: #ffc12a;
    color: @color-1;
    padding: 0;
    line-height: 40px;
  }
}

.boxMain ul li {
  padding-bottom: 25px;
  position: relative;
  label {
    width: 80px;
    display: inline-block;
    font-size: 14px;
    color: @color-27;
    padding-bottom: 5px;
  }
}

.boxMain ul li.new-list-item {
  padding: 0;
  margin-top: 30px;
  position: relative;

  .description-str {
    color: @color-56;
    font-size: 12px;
    margin-bottom: 10px;
  }
  .code {
    width: 100%;
    height: 40px;
    background-color: @color-1;
    border: 1px solid @color-14;
    &:focus {
      border: 1px solid @color-3!important;
    }
  }
  .obainCode {
    width: 88px;
    position: absolute;
    right: 2px;
    bottom: 1px;
    vertical-align: top;
  }
  .error-tip {
    position: absolute;
    right: 0;
    top: 0;
    background-color: @color-34;
    padding: 14px;
    border-radius: 4px;
    margin-top: -25px;
    .tip-rectangle {
      font-size: 12px;
      color: @color-5;
    }
  }

  .fake-input-box {
    display: flex;
    position: absolute;
    width: 100%;
  }
  .fake-input-box .fake-input-item {
    width: 40px;
    height: 40px;
    border: 1px solid @color-14;
    border-radius: 4px;
    font-size: 27px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  @keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  .fake-cursor-box {
    position: absolute;
    height: 100%;
    width: 1px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: fade 3000ms infinite;
    -webkit-animation: fade 1000ms infinite;

    .fake-cursor {
      width: 1px;
      height: 70%;
      background: #fff;
    }
  }

  .validInput {
    width: 100%;
    height: 40px;
    position: absolute;
    top: 28px;
    z-index: 100;
    opacity: 0;
  }
}

.formFocus {
  border: 1px solid @color-3!important;
}
.formErr {
  border: 1px solid @color-10!important;
}

.dot {
  width: 10px;
  height: 10px;
  background-color: @color-5;
  border-radius: 50px;
}
.pswp__preloader__icn {
  right: 0;
  top: 34px;
  margin-right: -24px;
}
</style>
