<template>
  <div class="assets">
    <div class="main">
      <div class="items topItems">
        <p>
          <span @click="hide">{{ $t("asset.blockchainProperty") }}</span>
          <span class="total">
            <span>{{ $t('asset.txt') }}：</span>
            <span> {{ assets.appraisementBTC|toPrecise2 }} BTC ≈</span>
            <i
              v-if="$store.state.locale=='zh'"
            >{{ assets.appraisementCNY|toPrecise }} CNY</i>
            <i v-else>{{ assets.appraisementUSD|toPrecise }}USD</i>
          </span>
          
          <span class="searchInput">
            <i class="iconfont icon-sousuo left"/>
            <input
              v-model="searchInput"
              :placeholder="$t('asset.placeholder')"
              type="text"
              @keyup.13="getAccount"
              @blur="getAccount"
            >
            <i
              v-if="searchInput !=''"
              class="iconfont icon-hb_icon_hint right"
              @click="searchInput=''"
            />
          </span>
          <!-- 跳转钱包链接 -->
          <router-link 
            to="/asset/wallet" 
            class="activeColor">
            <i class="iconfont icon-tuiguangmingxi"/>
            {{ $t('asset.myWallet') }}
          </router-link>
          <!-- 跳转资产记录链接 -->
          <router-link 
            to="/asset/record" 
            class="activeColor">
            <i class="iconfont icon-tuiguangmingxi"/>
            {{ $t('asset.withdrawal') }}
          </router-link>
          <a class="radio">
            <span 
              v-show="!filterZero" 
              class="checkbox" 
              @click="hide"/>
            <i 
              v-show="filterZero" 
              class="iconfont icon-gouxuan1" 
              @click="hide"/>
            {{ $t('assets.center.hide') }}
          </a>
        </p>
        <div class="table">
          <table>
            <thead>
              <tr>
                <th style="width:140px;">
                  <div class="mr">{{ $t("asset.coinType") }}</div>
                </th>
                <th style="width:240px;">
                  <div class="ml">{{ $t("asset.unFreeze") }}</div>
                </th>
                <th style="width:260px;">
                  <div class="ml">{{ $t("asset.freeze") }}</div>
                </th>
                <th style="width:340px;">
                  <div class="mr">{{ $t("asset.total") }}</div>
                </th>
                <th style="width:240px">
                  <div class="ml">{{ $t("asset.operation") }}</div>
                </th>
              </tr>
            </thead>
            <tbody 
              v-for="(item,index) in assetsList" 
              :key="index">
              <tr>
                <td>
                  <div class="mr">{{ item.coinCode }}</div>
                </td>
                <td>
                  <div class="ml">{{ item.availableAmount | toPrecise2 }}</div>
                </td>
                <td>
                  <div class="ml">{{ item.frozenAmount | toPrecise2 }}</div>
                </td>
                <td>
                  <div class="mr">
                    <span class="totalTd">{{ item.totalAmount| toPrecise2 }}</span> ≈
                    <span
                      v-if="$store.state.locale=='zh'"
                      class="totalTd1"
                    >{{ item.appraisementCNY|toPrecise }} CNY</span>
                    <span 
                      v-else 
                      class="totalTd1">{{ item.appraisementUSD|toPrecise }}USD</span>
                  </div>
                </td>
                <td class="lastTd">
                  <div class="ml">
                    <span
                      :class="{'notAllowed':item.canReceive==false}"
                      @click="openTopup(index,item)"
                    >
                      {{ $t("asset.charged") }}
                      <i 
                        v-show="item.isTopup" 
                        class="triangle">
                        <img 
                          src="~/assets/images/index/triangle.png" 
                          alt>
                      </i>
                    </span>
                    <span
                      :class="{'notAllowed':item.canWithdrawal==false}"
                      @click="tokensOpen(index,item)"
                    >
                      {{ $t("asset.mention") }}
                      <i 
                        v-if="item.isTokens" 
                        class="triangle">
                        <img 
                          src="~/assets/images/index/triangle.png" 
                          alt>
                      </i>
                    </span>
                    <span class="choseOpen">
                      {{ $t("asset.transaction") }}
                      <chose
                        v-if="item.list.length > 0"
                        :list="item.list[0].coinPairs"
                        class="choseList"
                      />
                    </span>
                  </div>
                </td>
              </tr>
              <tr v-if="item.isTopup||item.isTokens">
                <td 
                  colspan="5" 
                  style="padding:0;text-align:left">
                  <topup
                    v-if="item.isTopup"
                    :user-info="item"
                    :topup="topup"
                    :qrcode="'qrcode'+index"
                    @topupHide="topupHide"
                    @getAccountId="pushAccountId"
                  />

                  <tokens
                    v-if="item.isTokens"
                    :is-init="isInit"
                    :tokens="tokensData"
                    @addAddress="isAddAddress=true"
                    @tokensHide="tokensHide"
                    @initChange="initChange"
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <no-data 
            v-show="assetsList.length == 0" 
            :state="state" 
            :txt="$t('order.noData')"/>
        </div>
        <bind-wallet
          v-show="isAddAddress"
          ref="bind"
          :list="list"
          :type="1"
          @close="closeAddAddress"
        />
      </div>
      <div 
        v-if=" assetsList.length>0" 
        class="page">
        <Page
          :total="page.total"
          show-elevator
          show-sizer
          @on-change="pageChange"
          @on-page-size-change="changePase"
        />
      </div>
    </div>
    <validation
      v-if="openValidation"
      :customer="customer"
      :strategy="strategy"
      :data="data"
      @close="openValidation=false"
      @VClose="vclose"
    />
  </div>
</template>
<script>
import { Tokens, Topup, chose } from "~/template/1/components/assets/index.js";
import validation from "~/template/1/components/assets/validation.vue";
import noData from "~/template/1/components/public/noData/noData.vue";
import Page from "~/template/1/components/public/page/index.js";
import filter from "~/assets/js/filter.js";
import bindWallet from "~/template/1/components/assets/bindWallet.vue";
export default {
  name: "AssetCenter",
  metaInfo() {
    return {
      title: this.$t("seo.assets.title") + this.$store.state.seoTitle
    };
  },
  components: {
    Tokens,
    Topup,
    validation,
    chose,
    noData,
    bindWallet,
    Page
  },
  filters: {
    toPrecise(val) {
      if (!val) {
        return "0.00";
      }
      return filter.toPrecise(val, 2);
    },
    toPrecise2(val) {
      if (!val) {
        return "0.00000000";
      }
      return filter.toPrecise(val, 8);
    }
  },
  data() {
    return {
      isAddAddress: false,
      openValidation: false,
      customer: "",
      strategy: {},
      list: [],
      choseList: [],
      assets: {},
      isInit: 0,
      page: {
        page: 0,
        size: 10,
        total: 0
      },
      state: 0,
      assetsList: [],
      topup: {
        id: "",
        coinCode: "",
        index: ""
      },
      filterZero: false,
      tokensData: {
        paceFeeRate: 0,
        leastPaceNum: 0,
        hotMoney: 0,
        oneDayPaceNum: 0,
        keepDecimalForCoin: 0,
        coinCode: ""
      },
      data: {
        type: "withdrawal",
        tokens: ""
      },
      searchInput: ""
    };
  },

  async mounted() {
    await this.getCoinPairs();
    this.getAccount();
    this.init();
    this.getPolicy();
  },

  methods: {
    initChange(data) {
      this.list = data;
      this.isInit = 0;
    },
    init() {
      return this.api
        .getTotal({
          coin_code: "BTC",
          filter_zero: this.filterZero,
          user_type: "NORMAL_USER",
          asset_type: "ASSET"
        })
        .then(
          res => {
            this.assets = res;
          },
          res => {}
        );
    },
    getCoinPairs() {
      return this.api
        .getCoinPairs()
        .then(res => {
          this.choseList = res;
        })
        .catch(res => {});
    },
    getCustomer() {
      return this.api
        .getUserMsg()
        .then(res => {
          this.customer = res.customer;
        })
        .catch(res => {});
    },
    getPolicy() {
      this.api
        .policy()
        .then(res => {
          this.strategy = res;
        })
        .catch(res => {});
    },
    getAccount() {
      this.api
        .getAccountList({
          page: this.page.page,
          size: this.page.size,
          filter_zero: this.filterZero,
          coin_code: this.searchInput,
          user_type: "NORMAL_USER",
          asset_type: "ASSET"
        })
        .then(res => {
          if (res.content.length == 0) {
            this.state = 1;
          }
          for (let i in res.content) {
            let item = res.content[i];
            item.list = this.choseList.filter(x => {
              return x.coinCode == item.coinCode;
            });
            item.isTopup = false;
            item.isTokens = false;
            item.totalAmount =
              Number(item.availableAmount) + Number(item.frozenAmount);
          }
          this.assetsList = res.content;
          // console.log(this.assetsList);
          this.page.total = res.totalElements;
        })
        .catch(res => {});
    },
    // 点击充币
    openTopup(index, data) {
      if (!data.canReceive) {
        return false;
      }
      if (this.assetsList[index].isTopup == false) {
        for (let i in this.assetsList) {
          this.assetsList[i].isTopup = false;
        }
        this.assetsList[index].isTopup = true;
      } else {
        this.assetsList[index].isTopup = false;
      }
      this.assetsList[index].isTokens = false;
      this.topup.id = data.id;
      this.topup.coinCode = data.coinCode;
      this.topup.index = index;
      this.topupBol = true;
    },
    // 点击提币
    async tokensOpen(index, item) {
      if (!item.canWithdrawal) {
        return false;
      }
      if (this.customer == "") {
        await this.getCustomer();
      }
      //console.log(this.customer);
      if (this.customer.verify != "REAL") {
        this.$toast(
          "err",
          this.customer.verify == "AUDIT"
            ? this.$t("assets.noAuth")
            : this.$t("assets.unAuth"),
          2
        );
        return false;
      }

      this.coinCode = item.coinCode;
      this.$refs.bind.init(item.coinCode);
      this.tokensData = item;
      if (this.assetsList[index].isTokens == false) {
        for (let i = 0; i < this.assetsList.length; i++) {
          this.assetsList[i].isTokens = false;
        }
        this.assetsList[index].isTokens = true;
      } else {
        this.assetsList[index].isTokens = false;
      }
      this.assetsList[index].isTopup = false;
    },

    hide() {
      console.log(123);
      this.filterZero = !this.filterZero;
      this.state = 0;
      this.page.page = 0;
      this.assetsList = [];
      this.getAccount();
      this.init();
    },
    pageChange(val) {
      this.page.page = val - 1;
      this.getAccount();
    },
    changePase(val) {
      this.page.page = 0;
      this.page.size = val;
      this.getAccount();
    },
    // 充币塞入account_id
    pushAccountId(val) {
      this.assetsList[val.index].id = val.account_id;
      // this.$set(this.assetsList[val.index], account_id, val.account_id);
    },
    // 上面为非逻辑方法

    closeAddAddress() {
      this.isAddAddress = false;
      this.isInit = 1;
    },
    tokensHide(data) {
      this.data = data;
      this.openValidation = true;
    },
    topupHide() {
      this.topupBol = false;
    },

    vclose(data) {
      if (data) {
        if (data.code == 200) {
          this.$toast("success", this.$t("prompt.popup.withdrawal"), 2);
          this.getAccount();
        } else {
          this.$toast("err", this.$t(`err.${[data.msg]}`), 2);
        }
      }
      this.openValidation = false;
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/assets.less";

.assets {
  .title {
    .fr {
      p {
        a {
          color: @color-59;
        }
      }
    }
  }
}
.table {
  min-height: 561px;
}
.items {
  background: #27292e;
  margin-bottom: 30px;
}
.items > p span {
  display: inline-block;
  font-size: 20px;
  font-weight: 900;
}
.items > p {
  height: 84px;
  line-height: 84px; // background: #27292e;
  // padding:0 30px 0 35px;
  position: relative;
  font-size: 16px;
  color: @color-28;
}
.items > p a {
  float: right;
  color: @color-5;
  margin-left: 30px;
  p {
    a {
      float: right;
      font-size: 14px;
      color: @color-28!important;
    }
  }
}
.items > p a i {
  p {
    a {
      i {
        padding: 0 10px 0 40px;
      }
    }
  }
}
.items > p a.activeColor {
  p {
    a.activeColor {
      color: @color-5;
    }
  }
}
.assets {
  .deal {
    padding: 0;
    line-height: 40px;
    height: 40px;
    background: #212326;
  }
}
.assets .deal li {
  .deal {
    li {
      border-top: 1px solid @color-60;
      text-align: left;
    }
  }
}
.assets .deal li:first-child {
  .deal {
    li {
      &:first-child {
        border-top: 0;
      }
    }
  }
}
.assets .deal li p {
  .deal {
    li {
      p {
        display: inline-block;
        width: 175px;
      }
    }
  }
}
.assets li p.time:first-child {
  .deal {
    li {
      p.time {
        &:first-child {
          width: 260px;
        }
      }
    }
  }
}
.assets .deal li p.time {
  .deal {
    li {
      p.time {
        width: 220px;
        text-align: right;
        padding: 0 50px 0 0;
      }
    }
  }
}
.choseList {
  display: none;
}
.choseList:before {
  content: "";
  background: url("../../assets/images/dropup.png") center center no-repeat;
  background-size: 12px 7px;
  width: 12px;
  height: 7px;
  display: block;
  position: absolute;
  top: 3px;
  right: 10px;
}
.choseOpen:hover .choseList {
  display: block;
}
.assets {
  .radio {
    float: right;
    position: relative;
    padding-left: 24px;
    font-size: 14px;
    color: @color-5;
  }
}
.assets {
  .radio {
    .checkbox {
      -webkit-appearance: none;
      width: 14px;
      height: 14px;
      display: inline-block;
      border: 1px solid @color-5;
      border-radius: 2px;
      background-size: 100% 100%;
      position: absolute;
      top: 50%;
      left: 0;
      margin-top: -7px;
      cursor: pointer;
    }
  }
}
.assets {
  .radio {
    .iconfont {
      left: 0;
      position: absolute;
      color: @color-3;
      left: 0;
      font-size: 14px;
      width: 14px;
      height: 14px;
      padding: 0;
    }
  }
}
.assets .notAllowed {
  cursor: not-allowed !important;
  color: #8e7e29 !important;
}
.assets .deal li:first-child {
  border-top: 0;
}
.assets .deal li {
  border-top: 1px solid @color-60;
  text-align: left;
  height: 35px;
  line-height: 35px;
  font-size: 12px;
}
.assets .deal ul {
  margin: -14px 0;
}
.assets .mlSmall a {
  color: @color-27;
}
.searchInput {
  position: relative;
  width: 230px;
  height: 100%;
  float: right;
  margin-left: 30px;
  // margin-left: 40px;
}
// .searchInput input {
//   width: 100%;
//   background-color: @color-1;
//   position: absolute;
//   padding: 0 30px;
//   left: 0;
//   top: 24px;
// }
.searchInput i {
  position: absolute;
  top: 0px;
  z-index: 99;
  color: @color-5;
}
.searchInput i.left {
  left: 9px;
}
.searchInput i.right {
  right: 6px;
  cursor: pointer;
}
.triangle {
  position: absolute;
  bottom: 0;
  margin-bottom: -32px;
  left: 4px;
}
.page {
  padding: 30px 0;
  margin-top: -30px;
}
.total {
  color: #687284 !important;
  font-size: 12px;
  margin-left: 12px;
  font-weight: 100;
  span {
    color: #474e5e !important;
    font-weight: 600;
    font-size: 12px;
  }
  i {
    color: #687284;
    font-style: normal;
    font-size: 12px;
  }
}

.totalTd {
  color: @color-2!important;
}

.totalTd1 {
  color: @color-5!important;
}

.topItems {
  p {
    a {
      &:hover {
        color: @color-3;
      }
    }
  }
}
.assets {
  table {
    tr {
      td {
        &:first-child {
          .mr {
            color: @color-3;
          }
        }
      }
    }
  }
}
</style>
