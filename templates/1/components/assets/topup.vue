<template>
  <div class="topup">
    <div class="assetsPopup">
      <div class="content clearfix">
        <div 
          v-if="(userInfo.coinCode != 'EOS') || (userInfo.coinCode != 'ETN')" 
          :id="qrcode" 
          class="fr erweiCode"/>
        <div class="topUpTitle">{{ $t("asset.buyCoinUrl") }}</div>
        <div class="code">
          {{ code }}
          <span @click="copy(code)">{{ $t("assets.topup.copy") }}</span>
        </div>
        <div 
          v-if="userInfo.coinCode == 'EOS'" 
          class="addressTip">
          <div class="text">
            <span>{{ $t("asset.adressTip") }}</span>
            <span class="red">{{ $t("asset.adressTipText") }}</span>
          </div>
          <div class="code">
            {{ addRessCode }}
            <span @click="copy(addRessCode)">{{ $t("asset.copy") }}</span>
          </div>
        </div>
        <div 
          v-else-if="userInfo.coinCode == 'ETN'" 
          class="addressTip">
          <div class="text">
            <span>{{ $t("asset.paymentID") }}</span>
            <span class="red">{{ $t("asset.PaymentIDTip") }}</span>
          </div>
          <div class="code">
            {{ addRessCode }}
            <span @click="copy(addRessCode)">{{ $t("asset.copy") }}</span>
          </div>
        </div>
        <div class="copy">
          {{ $t("asset.cheak") }}
          <router-link to="/asset/record">{{ $t("asset.buyHistory") }}</router-link>
          {{ $t("asset.traceStates") }}
        </div>

        <div 
          v-if="userInfo.coinCode != 'ETN'" 
          class="font">
          {{ $t("asset.warmPrompt") }}：
          <br>
          {{ $t("asset.text1") }}{{ topup.coinCode }}{{ $t("asset.text2") }}
          <br>
          {{ $t("asset.text3") }}{{ topup.coinCode }}{{ $t("asset.text4") }}{{ topup.coinCode }}{{ $t("asset.text5") }}
          <br>
          {{ $t("asset.text6") }}{{ topup.coinCode }}{{ $t("asset.text7") }}
          <br>
          {{ $t("asset.text8") }}
        </div>
        <div 
          v-else 
          class="font">
          {{ $t("asset.warmPrompt") }}：
          <br>
          {{ $t("asset.text1ETN") }}
          <br>
          {{ $t("asset.text2ETN") }}
          <br>
          {{ $t("asset.text3ETN") }}
          <br>
          {{ $t("asset.text4ETN") }}
          <br>
          {{ $t("asset.text5ETN") }}
        </div>

      </div>
    </div>
  </div>
</template>
<script>
if (process.client) {
  require("~/assets/js/qrcode.js");
}
import XECommand from "xe-command";
export default {
  name: "Topup",
  components: {},
  props: {
    topup: {
      type: Object,
      default: null
    },
    userInfo: {
      type: Object,
      default: null
    },
    qrcode: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      code: "",
      addRessCode: "",
      i: false
    };
  },
  created() {
    this.getPublicKey();
  },
  mounted: function() {},
  methods: {
    confirm() {
      this.$emit("topupHide");
    },
    copy(val) {
      XECommand.copy(val);
      this.$toast("success", this.$t("personal.copySuccess"), 3);
    },
    getQart: function(code) {
      if (this.i == false) {
        var qrcode = new QRCode(document.getElementById(this.qrcode), {
          width: 140, //设置宽高
          height: 140
        });
        qrcode.makeCode(code);
      }
      this.i = true;
    },
    getPublicKey() {
      this.api
        .getPublicKey({
          account_id: this.topup.id,
          coin_code: this.topup.coinCode
        })
        .then(res => {
          this.code = res.address;
          this.addRessCode = res.memo;
          this.getQart(res.address);
          if (res.account_id) {
            this.$emit("getAccountId", {
              index: this.topup.index,
              account_id: res.account_id
            });
          } else {
            return false;
          }
        });
    }
  }
};
</script>

<style lang="less" scoped>
.topup {
  height: 100%;
  border-left: 1px solid @color-41;
  border-right: 1px solid @color-41;
}
.topUpTitle {
  font-size: 14px;
  color: @color-5;
  margin-bottom: 20px;
}
.topup .content #qrcode {
  // display: block;
  // background-color: #2b344a;
  // width: 150px;
  // height: 150px;
  margin-top: 26px;
  border: 10px solid #fff;
  border-radius: 3px;
  // border: 5px solid @color-28;
}
.assetsPopup {
  width: 100% !important;
  height: 100%;
  background: @color-8;
}
.topup .content {
  padding: 22px 40px;
}
.topup .content .code {
  font-size: 16px;
  color: @color-2;
  letter-spacing: 1px;
  word-wrap: break-word;
  word-break: break-all;
  margin-bottom: 30px;
  span {
    font-size: 14px;
    color: @color-3;
    margin-left: 24px;
    cursor: pointer;
  }
}
.addressTip {
  .text {
    font-size: 14px;
    color: @color-5;
    margin-bottom: 20px;
    .red {
      color: @color-10;
    }
  }
}
.topup .content .copy {
  // text-align: center;
  font-size: 14px;
  color: @color-5;
  padding: 0 0 25px 0;
}
.topup .content .copy span {
  cursor: pointer;
}
.topup .content .copy span:first-child {
  padding-right: 25px;
}
.topup .content .copy a {
  color: @color-3;
}
.topup .content .font {
  font-size: 12px;
  color: @color-9;
  line-height: 1.8;
}
.topup .confirm {
  width: 170px;
  height: 40px;
  font-size: 16px;
  color: @color-9;
  margin: 35px auto 30px auto;
  display: block;
}
.erweiCode {
  border: 10px solid #fff;
}
</style>
