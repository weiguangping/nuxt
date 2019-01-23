<template>
  <div id="bindWallet">
    <div class="shade">
      <div 
        class="from" 
        @click="openBol = false">
        <div class="formHeader">
          <div class="formTitle">
            {{ $t('wallet.addAddress') }}
          </div>
          <div 
            class="close" 
            @click="close">
            <i class="iconfont icon-guanbi"/>
          </div>
        </div>
        <ul>
          <li @click.stop>
            <label>
              {{ $t("wallet.coinType") }}
            </label>
            <div class="select">
              <input 
                :class="{'formErr':selectVal.bol!=0}" 
                v-model="selectVal.val" 
                type="text" 
                readonly 
                @blur="validation(0)" 
                @click.stop="open" >

              <!-- <i class="iconfont icon-xialasanjiaoxing" @click.stop="open"></i> -->
              <div 
                v-show="openBol" 
                v-if="type!=1" 
                class="box">
                <p 
                  v-for="(item,index) in list" 
                  :key="index" 
                  @click="chose(item,index)">{{ item.coinCode }}
                  <i 
                    v-show="selectIndex==index" 
                    class="iconfont icon-gouxuan"/>
                </p>
              </div>
            </div>
            <prompt 
              v-show="selectVal.bol>0&&focusIndex==0" 
              :top="-25">
              <template>{{ $t('wallet.walletUrl') }}</template>
            </prompt>
          </li>

          <li class="url">
            <label>
              {{ $t("wallet.walletUrl") }}
            </label>
            <input 
              :class="{'formErr':publicKey.bol!=0}" 
              v-model="publicKey.val" 
              type="text" 
              @blur="validation(1)" >
            <prompt 
              v-show="publicKey.bol>0&&focusIndex==1" 
              :top="-25">
              <template>{{ $t('wallet.pleaseyUrl') }}</template>
            </prompt>
          </li>

          <li 
            v-if="selectVal.val=='EOS'" 
            class="url">
            <label>
              {{ $t("wallet.eosLabel") }}
            </label>
            <input 
              v-model="addressLabel" 
              type="text" >
          </li>
          <li 
            v-else-if="selectVal.val=='ETN'" 
            class="url">
            <label>
              {{ $t("wallet.etnLabel") }}
            </label>
            <input 
              v-model="addressLabel" 
              type="text" >
          </li>

          <li>
            <div>
              <label>
                {{ $t("wallet.code") }}
              </label>
            </div>
            <input 
              :class="{'formErr':captcha.bol!=0}" 
              v-model="captcha.val" 
              type="text" 
              @blur="validation(2)" >
            <div 
              class="obainCode" 
              @click="obtainCode">
              <countdown 
                ref="code" 
                :state="countdownState" 
                @end="countdownState = 2"/>
            </div>
            <prompt 
              v-show="captcha.bol>0&&focusIndex==2" 
              :top="-25">
              <template>{{ $t('wallet.pleaseyCode') }}</template>
            </prompt>
          </li>

          <li>
            <label>
              {{ $t("wallet.remark") }}
            </label>
            <input 
              v-model="remark" 
              maxlength="25" >
          </li>
        </ul>
        <Button 
          type="primary" 
          class="bnt" 
          @click="confirm">{{ $t('wallet.confirm') }}</Button>
      </div>
    </div>
  </div>
</template>
<script>
import Verification from "~/assets/js/validation.js";
import countdown from "~/template/1/components/public/countdown/countdown.vue";
import prompt from "~/components/prompt/prompt.vue";
export default {
  components: {
    countdown,
    prompt
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    type: {
      type: [Number, String],
      default: 0
    }
  },
  data() {
    return {
      selectVal: {
        val: "",
        bol: false
      },
      publicKey: {
        val: "",
        bol: false
      },
      addressLabel: "",
      captcha: {
        val: "",
        bol: false
      },
      remark: "",
      openBol: false,
      selectIndex: -1,
      publicKeyBol: 0,
      captchaBol: 0,
      currencyType: "",
      currencyTypeBol: 0,
      isEnd: 1,
      focusIndex: 0,
      countdownState: 0
    };
  },
  mounted() {},
  methods: {
    init(cions) {
      this.selectVal.val = cions;
    },
    close() {
      this.$emit("close");
    },
    open() {
      this.openBol = !this.openBol;
    },
    chose(val, index) {
      this.selectIndex = index;
      this.selectVal.val = val.coinCode;
      this.currencyType = val.coinCode;
      this.openBol = !this.openBol;
      this.selectVal.bol = 0;
    },
    // changeIndex(index) {
    //   this.focusIndex = index;
    // },
    validation(type) {
      this.focusIndex = type;
      if (type == 0 && this.type != 1) {
        this.selectVal.bol = this.currencyType == "" ? 1 : 0;
        return;
      } else if (type == 1) {
        this.publicKey.bol = Verification.code(this.publicKey.val);
        return;
      } else if (type == 2) {
        this.captcha.bol = Verification.code(this.captcha.val);
        return;
      }
    },
    obtainCode() {
      if (this.countdownState == 1 || this.countdownState == 3) {
        return false;
      }
      this.countdownState = 1;
      this.api
        .sendMsgCode({
          scene: "bingWallet"
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
      this.validation(2);
      this.validation(1);
      this.validation(0);
      if (
        _this.selectVal.bol != 0 ||
        _this.publicKey.bol != 0 ||
        _this.captcha.bol != 0
      ) {
        return false;
      }
      _this.$toast(
        "loading",
        _this.$t("wallet.committing"),
        undefined,
        undefined,
        { bol: true }
      );
      _this.api
        .operateWalletItem({
          coin_code: _this.selectVal.val,
          publickey: _this.publicKey.val,
          code: _this.captcha.val,
          remark: _this.remark,
          memo: _this.addressLabel,
          operate: "ADD"
        })
        .then(
          res => {
            _this.close();
            _this.$toast("success", _this.$t("wallet.addressSucess"), 2);
          },
          res => {
            _this.$toast("err", _this.$t(`err.${[res.message]}`), 2);
          }
        );
    }
  }
};
</script>
<style>
i.iconfont.icon-guanbi:hover {
  color: #687284;
}
</style>
<style lang="less" scoped>
.shade {
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
  background: @color-39;
  .from {
    background: @color-1;
    position: fixed;
    // z-index: 1000;
    width: 400px;
    // height: 600px;
    left: 50%;
    top: 50vh;
    margin-top: -340px;
    margin-left: -200px;
    .formHeader {
      position: relative;
      padding: 50px;
      .formTitle {
        font-size: 20px !important;
        font-weight: 900;
        color: #cbcfd6;
      }
      .close {
        position: absolute;
        right: 20px;
        top: 20px;
        cursor: pointer;
      }
    }
    ul {
      padding: 0 50px 0 50px;
      li {
        position: relative;
        margin-bottom: 30px;
        .select {
          .box {
            position: absolute;
            border-radius: 4px;
            top: 68px;
            width: 100%;
            max-height: 180px;
            overflow: auto;
            z-index: 1001;
            background-color: #161c2c;
            box-shadow: 0 4px 14px 6px rgba(0, 0, 0, 0.2);
            p {
              position: relative;
              padding: 10px 15px;
              font-size: 12px;
              color: @color-5;
              cursor: pointer;
              i {
                color: #ffc12a;
                position: absolute;
                top: 11px;
              }
            }
            p:hover {
              background-color: #ffc12a;
              color: #161c2c;
              i {
                color: #161c2c;
              }
            }
          }
          input {
            cursor: pointer;
          }
        }
        label {
          display: block;
          color: @color-5;
          margin-bottom: 10px;
          font-size: 12px;
        }
        .iconfont {
          font-size: 10px;
          position: absolute;
          right: 14px;
          bottom: 13px;
          cursor: pointer;
        }
        .formErr {
          border: 1px solid @color-10;
        }
        .formFocus {
          border: 1px solid @color-3;
        }
        input {
          width: 100%;
          height: 40px;
          background-color: #161c2c;
          border: 1px solid #474f5f;
          border-radius: 4px;
          font-size: 12px;
          color: @color-2;
          padding: 0 8px;
          &:focus {
            border: 1px solid @color-3!important;
          }
        }
        .propmt {
          display: block;
          position: relative;
          padding: 15px 14px;
          border-radius: 4px;
          color: #697184;
          position: absolute;
          right: 0;
          top: 0;
          text-align: center;
          i {
            position: absolute;
            width: 12px;
            left: 10px;
            bottom: 0;
            margin-bottom: -8px;
            color: @color-32;
          }
        }
      }
    }
    .bnt {
      width: 140px;
      height: 40px;
      margin: 20px 50px 50px 50px;
      background-color: #ffc12a;
      color: @color-1;
      padding: 0;
      line-height: 40px;
      &:hover {
        background-color: #ffca4a;
      }
      &:focus {
        background-color: #efaa00;
      }
    }
    .obainCode {
      width: 88px;
      position: absolute;
      right: 2px;
      bottom: 1px;
      vertical-align: top;
    }
    // .obainCode button {
    //   width: 100%;
    //   border-radius: 0;
    //   background-color: transparent;
    //   border: none;
    //   color: #474f5f;
    //   display: inline-block;
    //   height: 12px !important;
    //   padding: 0;
    //   height: 36px;
    //   line-height: 12px;
    //   border-left: 1px solid #474f5f;
    //   outline: none !important;
    // }
  }
}
</style>
