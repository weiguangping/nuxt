<template>
  <div class="tokens">
    <div
      class="box assetsPopup"
      @click.stop="openBol = false"
    >
      <div class="from">
        <ul>
          <li>
            <label>
              {{ $t('assets.tokens.adress') }}
            </label>
            <div class="select">
              <input
                v-model="btcKey"
                :class="{'formErr':btcKeyBol!=0&&focusIndex!=1,'formFocus':focusIndex==1}"
                style="padding-right:130px;"
                type="text"
                @focus="changeIndex(1)"
                @blur="valiAddress"
              >
              <div class="btn">
                <span
                  style="margin-left:0;"
                  @click.stop="open"
                >{{ $t('asset.selectBtn') }}</span>
              </div>
              <div
                v-show="openBol"
                class="box"
              >
                <p @click="addAddress">{{ $t('asset.addAddress') }}</p>
                <p
                  v-for="(item,index) in list"
                  :class="{active:selectIndex==index}"
                  :key="index"
                  @click="chose(item,index)"
                >{{ item.publicKey }}</p>
              </div>
            </div>
            <div
              v-show="btcKeyBol>0&&focusIndex==1.5"
              class="publicPropmt"
              style="top: 50px"
            >
              <span v-show="btcKeyBol==1">{{ $t('assets.wallet.pleaseyUrl') }}</span>
              <span v-show="btcKeyBol==2">{{ $t('prompt.from.noAddress') }}</span>
              <i class="iconfont icon-page-dowm"/>
            </div>
          </li>

          <li
            v-show="tokens.coinCode=='EOS'"
            class="clearfix eosLi"
          >
            <div class="fr available clearfix">
              <span class="item">
                <span
                  v-show="!isNoAddress"
                  class="checkbox"
                  @click="noAddress"
                />
                <i
                  v-show="isNoAddress"
                  class="iconfont icon-gouxuan1"
                  @click="noAddress"
                /> {{ $t('asset.noAddress') }}
              </span>
            </div>
            <label class="fl">
              {{ $t('asset.addressTip') }}
            </label>
            <div class="clear">
              <input
                :class="{'formErr':addressTipBol!=0&&focusIndex!=3,'formFocus':focusIndex==3}"
                v-model="addressTip"
                type="text"
                @focus="changeIndex(3)"
                @blur="validation3"
              >
            </div>
            <div
              v-show="addressTipBol>0&&focusIndex==3.5"
              class="publicPropmt"
            >
              <span>{{ $t('asset.AddressBol') }}</span>
              <i class="iconfont icon-page-dowm"/>
            </div>
          </li>

          <li
            v-show="tokens.coinCode=='ETN'"
            class="clearfix eosLi"
          >
            <div class="fr available clearfix">
              <span class="item">
                <span
                  v-show="!isNoAddress"
                  class="checkbox"
                  @click="noAddress"
                />
                <i
                  v-show="isNoAddress"
                  class="iconfont icon-gouxuan1"
                  @click="noAddress"
                /> {{ $t('asset.noPaymentId') }}
              </span>
            </div>
            <label class="fl">
              {{ $t('asset.paymentID') }}
            </label>
            <div class="clear">
              <input
                :class="{'formErr':addressTipBol!=0&&focusIndex!=3,'formFocus':focusIndex==3}"
                v-model="addressTip"
                type="text"
                @focus="changeIndex(3)"
                @blur="validation3"
              >
            </div>
            <div
              v-show="addressTipBol>0&&focusIndex==3.5"
              class="publicPropmt"
            >
              <span>{{ $t('asset.PaymentIdBol') }}</span>
              <i class="iconfont icon-page-dowm"/>
            </div>
          </li>

          <li class="clearfix">
            <div class="fr available clearfix">
              <span class="item"> {{ $t('assets.tokens.limit') }}：
                <span>{{ tokens.withdrawDailyLimit | toPrecise }}</span>
              </span>
              <span
                class="item"
                style="margin-left:20px;"
              > {{ $t('assets.tokens.available') }}：
                <span>{{ tokens.availableAmount | toPrecise }}</span>
              </span>
            </div>
            <label class="fl">
              {{ $t('assets.tokens.number') }}
            </label>
            <div class="clear">
              <input
                :class="{'formErr':btcNumBol!=0&&focusIndex!=2,'formFocus':focusIndex==2}"
                v-model="btcNum"
                type="text"
                @focus="changeIndex(2)"
                @blur="validation()"
              >
            </div>
            <div
              v-show="btcNumBol>0&&focusIndex==2.5"
              class="publicPropmt"
            >
              <span>{{ $t('assets.tokens.plaseNumber') }}</span>
              <i class="iconfont icon-page-dowm"/>
            </div>
          </li>

          <li class="bottomLi">
            <div class="free">
              <label>
                {{ $t('assets.tokens.fee') }}
              </label>
              <input
                v-model="paceFeeRate"
                type="text"
                readonly
                style="width: 220px;margin-right: 8px"
              >
            </div>
            <div class="free fr">
              <label>
                {{ $t('assets.tokens.account') }}
              </label>
              <input
                v-model="account"
                type="text"
                readonly
                style="width: 220px"
              >
            </div>
          </li>
        </ul>

        <!-- 底部温馨提示 -->
        <div class="bottomB clearfix">
          <div class="text fl">
            <template v-if="tokens.coinCode !== 'ETN'">
              {{ $t("asset.warmPrompt") }}：<br > {{ $t("asset.tokenText1") }}{{ tokens.minWithdrawAmnt }}。<br > {{ $t("asset.tokenText2") }}<br > {{ $t("asset.tokenText3") }}<br >
            </template>
            <template v-else>
              {{ $t("asset.warmPrompt") }}：<br > {{ $t("asset.tokenText1ETN") }}<br > {{ $t("asset.tokenText2ETN") }}<br > {{ $t("asset.tokenText3ETN") }}<br >
            </template>
          </div>
          <div class="btn fr">
            <button @click="confirm">{{ $t("asset.withdrawCoin") }}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Verification from "~/assets/js/validation.js";
import filter from "~/assets/js/filter.js";
export default {
  name: "",
  components: {},
  filters: {
    toPrecise(val) {
      return filter.toPrecise(val, 8);
    }
  },
  props: {
    tokens: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      openBol: false,
      btcKey: "",
      selectIndex: -1,
      list: "",
      btcKeyBol: 0,
      btcNum: "",
      btcNumBol: 0,
      paceFeeRate: "",
      account: "",
      focusIndex: 0,
      isNoAddress: false,
      addressTip: "",
      addressTipBol: 0
    };
  },
  watch: {
    // availableAmount => 可用余额
    // withdrawDailyLimit => 单日最大提币数量
    // coinPricePrecision => 币种保留小数位
    // maxWithdrawAmnt => 单笔最大提币数量
    btcNum(val, oldVal) {
      if (
        this.tokens.maxWithdrawAmnt === null ||
        this.tokens.availableAmount === null ||
        this.tokens.coinPricePrecision === null
      ) {
        this.paceFeeRate = 0;
        this.account = 0;
        return false;
      }
      if (val) {
        let mun = Number(this.tokens.coinPricePrecision),
          str = "";
        if (mun > 0) {
          str = eval("/^\\d+\\.?\\d{0," + mun + "}$/");
        } else {
          str = /^[\d]+$/;
        }
        let btcNum = str.test(val) ? val : oldVal;
        if (this.tokens.maxWithdrawAmnt < this.tokens.availableAmount) {
          this.btcNum =
            btcNum > this.tokens.maxWithdrawAmnt
              ? this.tokens.maxWithdrawAmnt.toFixed(mun)
              : btcNum;
        } else {
          this.btcNum =
            btcNum > this.tokens.availableAmount
              ? this.tokens.availableAmount.toFixed(mun)
              : btcNum;
        }
        this.paceFeeRate = this.tokens.withdrawFee;
        this.account = (this.btcNum - this.paceFeeRate < 0
          ? 0
          : this.btcNum - this.paceFeeRate
        ).toFixed(this.tokens.coinPricePrecision);
      } else {
        this.paceFeeRate = "";
        this.account = "";
      }
    },
    isInit() {
      this.initSelect();
    }
  },

  created() {
    this.initSelect();
  },
  mounted() {},
  beforeDestroy() {
    document.body.removeEventListener("click", this.bodyListener);
  },
  methods: {
    noAddress() {
      this.isNoAddress = !this.isNoAddress;
    },
    changeIndex(index) {
      this.focusIndex = index;
    },
    addAddress() {
      this.btcKeyBol = 0;
      this.addressTipBol = 0;
      this.btcNumBol = 0;
      this.focusIndex = 0;
      this.$emit("addAddress");
    },
    chose(item, index) {
      this.btcKey = item.publicKey;

      this.addressTip = item.memo;
      this.btcKeyBol = 0;
      this.selectIndex = index;
      this.openBol = false;
    },
    open() {
      this.openBol = !this.openBol;
    },
    cancel() {
      this.$emit("tokensHide", 0);
    },
    initSelect() {
      this.api
        .getWalletList({
          coin_code: this.tokens.coinCode,
          page: 0,
          size: 100
        })
        .then(
          res => {
            this.list = res.content;
            this.$emit("initChange", res.content);
          },
          res => {}
        );
    },
    validation(type) {
      this.focusIndex = 2.5;
      this.btcNumBol = Verification.code(this.btcNum);
    },
    validation3() {
      this.focusIndex = 3.5;
      if (!this.isNoAddress) {
        if (this.addressTip == "") {
          this.addressTipBol = 1;
        }
      } else {
        this.addressTipBol = 0;
      }
    },
    valiAddress() {
      this.focusIndex = 1.5;
      if (this.btcKey == "") {
        this.btcKeyBol = 1;
      } else {
        this.btcKeyBol = 0;
      }
    },
    confirm() {
      if (this.account <= 0) {
        this.$toast("err", this.$t("asset.accountErr"), 2);
        return false;
      }
      if (this.btcKey == "") {
        this.btcKeyBol = 1;
      }
      if (this.tokens.coinCode == "EOS" || this.tokens.coinCode == "ETN") {
        if (this.isNoAddress) {
          this.addressTipBol = this.addressTip == "" ? 1 : 0;
          if (this.addressTipBol > 0) {
            return false;
          }
        }
      }
      this.btcNumBol = Verification.code(this.btcNum);
      if (this.btcNumBol != 0 || this.btcKey == "") {
        return false;
      }
      this.$emit("tokensHide", {
        coin_code: this.tokens.coinCode,
        amount: this.btcNum,
        publickey: this.btcKey,
        memo: this.addressTip
      });
    }
  }
};
</script>

<style lang="less" scoped>
.tokens {
  background-color: @color-8;
  border-left: 1px solid @color-41;
  border-right: 1px solid @color-41;
}
.tokens .box .from {
  padding: 22px 40px;
}
.tokens .box .from li {
  padding-bottom: 25px;
  position: relative;
}
.tokens .box .from .bottomLi {
  .free {
    label {
      display: block;
    }
  }
  input {
    width: 540px !important;
    background-color: @color-1;
    border: none;
  }
}
.tokens .box .from li label {
  font-size: 14px;
  width: 50%;
  text-align: left;
  padding-bottom: 10px;
  display: inline-block;
  color: @color-5;
}

.tokens .from li .available,
.tokens .from li label {
  font-size: 12px;
  color: @color-27;
  line-height: 1;
  padding-bottom: 10px;
  text-align: center;
}
.tokens .from li .available {
  .item {
    font-size: 12px;
    color: @color-5;
  }
}

.eosLi .item .checkbox {
  -webkit-appearance: none;
  width: 14px;
  height: 14px;
  display: inline-block;
  border: 1px solid @color-5;
  border-radius: 2px;
  background-size: 100% 100%;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 10px;
}

.eosLi .item .iconfont {
  width: 14px;
  font-size: 14px;
  height: 14px;
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  margin-right: 10px;
  color: @color-19;
}

.tokens .from .sweetTip {
  color: @color-27;
  line-height: 2;
  font-size: 16px;
}
.tokens .from .sweetTip .head {
  font-size: 12px;

  margin: 0;
}
.tokens .from .bnt {
  text-align: center;
  padding-top: 30px;
}
.tokens .from .bnt button {
  width: 170px;
  height: 40px;
  font-size: 16px;
  color: @color-29;
  background-color: @color-59;
}
.tokens .from .bnt .cancel {
  background: @color-29;
  color: @color-59 !important;
  margin-left: 20px;
}
.tokens input {
  width: 100%;
  height: 44px;
  border: 1px solid @color-14;
  background-color: @color-8;
  border-radius: 4px;
  color: @color-2;
}
.tokens input.formErr {
  border: 1px solid @color-10;
}
.tokens input.formFocus {
  border: 1px solid @color-3;
}
input.aaaInput::-webkit-input-placeholder {
  font-size: 14px;
}
.tokens .select input::-webkit-input-placeholder {
  font-size: 14px;
}
.tokens .select {
  display: inline-block;
  width: 100%;
  position: relative;
  .btn {
    position: absolute;
    cursor: pointer;
    width: 130px;
    height: 44px;
    right: 0;
    text-align: center;
    top: 0;
    color: @color-3;
    span {
      display: block;
      width: 100%;
      border-left: 1px solid @color-14;
      font-size: 14px;
      line-height: 14px;
      position: absolute;
      top: 14px;
    }
  }
}
.tokens .select i {
  position: absolute;
  top: 50%;
  right: 15px;
  margin-top: -7px;
  cursor: pointer;
}
.tokens .select .box {
  position: absolute;
  top: 42px;
  left: 0;
  width: 100%;
  background: @color-1;
  -webkit-box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  margin: 5px 0;
  padding: 5px 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;

  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  cursor: pointer;
  max-height: 200px;
  overflow: auto;
  z-index: 10000;
}
.tokens .select .box p {
  height: 34px;
  line-height: 34px;
  padding: 0 16px;
  font-size: 12px;
  color: @color-5;
  background: @color-1;
  text-align: left;
}

.tokens .select .box p:hover,
.tokens .select .box p.active {
  background: @color-3;
}
.tokens .address {
  position: absolute;
  top: 0;
  right: 0;
  font-size: 12px;
}
.tokens .address a {
  color: @color-59;
}
.tokens .free {
  display: inline-block;
}
.tokens .publicPropmt {
  background-color: @color-1;
  text-align: center;
  width: 180px;
  height: 48px;
  border-radius: 5px;
  left: 50%;
  margin-left: -90px;
  margin-top: -30px !important;
  top: 0 !important;
  z-index: 9999;
  span {
    display: block;
    padding: 0;
    width: 100%;
    line-height: 48px;
    color: @color-5;
  }
  .iconfont {
    color: @color-1;
    position: absolute;
    bottom: 0;
    margin-bottom: -14px;
    left: 50%;
    margin-left: -6px;
  }
}

.bottomB .text {
  font-size: 12px;
  width: 544px;
  line-height: 1.8;
}

.bottomB .btn button {
  width: 160px;
  height: 44px;
  line-height: 44px;
  background-color: @color-50;
  border: none;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
