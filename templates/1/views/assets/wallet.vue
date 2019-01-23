<template>
  <div class="assets wallet">
    <div class="main">
      <div class="title">
        <div class="fl">
          {{ $t("asset.myWallet") }}
        </div>
        <div class="fr">
          <p>
            <router-link to="/asset">
            <span class="back">{{ $t("wallet.retrueAssets") }}</span> </router-link>
          </p>
        </div>
        <div class="fr">
          <button 
            class="btn" 
            @click="isAddAddress=true">
          <i class="iconfont icon-jia"/>{{ $t("wallet.addAddress") }}</button>
        </div>
      </div>
      <!-- <transition name="component-fade" mode="out-in"> -->
      <bind-wallet 
        v-if="isAddAddress" 
        :list="list" 
        @close="closeAddAddress"/>
      <!-- </transition> -->
      <div class="items">
        <div class="table">
          <table>
            <thead>
              <tr>
                <th style="width:110px;">
                  <div class="mr">{{ $t("wallet.coinType") }}</div>
                </th>
                <th style="width:400px;">
                  <div class="mr">{{ $t("wallet.walletUrl") }}</div>
                </th>
                <th style="width:200px;">
                  <div class="mr">{{ $t("wallet.time") }}</div>
                </th>

                <th style="width:340px;">
                  <div class="mr">{{ $t("wallet.remark") }}</div>
                </th>
                <th style="width:150px;">
                  <div class="">{{ $t("wallet.operation") }}</div>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(item,index) in listAddress" 
                :key="index">
                <td>
                  <div class="mr actives">{{ item.coinCode }}</div>
                </td>
                <td>
                  <div class="mr">{{ item.publicKey }}</div>
                  <div 
                    v-show="item.coinCode == 'EOS'" 
                    class="mr">{{ $t("wallet.memo")+item.memo }}</div>
                </td>
                <td>
                  <div class="mr">{{ item.createdTime }}</div>
                </td>
                <td style="line-height:18px;">
                  <div class="mr">{{ item.remark }}</div>
                </td>
                <td>
                  <div class="flexBox">
                    <span 
                      class="red" 
                      @click="del(item,index)">{{ $t('wallet.del') }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div 
          v-if="page.totail > 10" 
          class="page">
          <Page 
            :total="page.totail" 
            show-elevator 
            show-sizer 
            @on-change="pageChange" 
            @on-page-size-change="changePase"/>
        </div>
        <no-data 
          v-show="page.totail == 0" 
          :state="state" 
          :txt="$t('order.noData')"/>
      </div>

    </div>
  </div>
</template>
<script>
import noData from "~/template/1/components/public/noData/noData.vue";
import Page from "~/template/1/components/public/page/index.js";
import bindWallet from "~/template/1/components/assets/bindWallet.vue";
export default {
  name: "",
  metaInfo() {
    return {
      title: this.$t("seo.assetWallet.title") + this.$store.state.seoTitle
    };
  },
  components: {
    noData,
    Page,
    bindWallet
  },
  data() {
    return {
      openBol: false,
      page: {
        page: 0,
        size: 10,
        totail: 0
      },
      state: 0,
      selectVal: "",
      list: "",
      currencyType: "",
      listAddress: "",
      isAddAddress: false
    };
  },
  created() {
    this.coinList();
    this.init();
  },
  mounted: function() {
    this.bodyListener = e => {
      this.openBol = false;
    };
    document.body.addEventListener("click", this.bodyListener, false);
  },
  beforeDestroy() {
    document.body.removeEventListener("click", this.bodyListener);
  },
  methods: {
    closeAddAddress() {
      this.init();
      this.isAddAddress = false;
    },
    obtainCode(bool) {
      this.api.sendBindCoinEmail(this.$store.state.authtoken).then(
        res => {
          this.$refs.code.obtainCode();
          this.$toast("success", this.$t("wallet.sendSuccess"), 2);
        },
        res => {
          this.prom(1, res.msg, 2);
        }
      );
    },
    init() {
      this.api
        .getWalletList({
          coin_code: "",
          page: this.page.page,
          size: this.page.size
        })
        .then(
          res => {
            if (res.totalElements == 0) {
              this.state = 1;
              return false;
            }
            this.listAddress = res.content;
            this.page.totail = res.totalElements;
            //console.log(res);
          },
          res => {}
        );
    },
    pageChange(index) {
      this.page.page = index - 1;
      this.init();
    },
    changePase(i) {
      this.page.size = i;
      this.init();
    },
    coinList() {
      this.api.getCoinList().then(res => {
        this.list = res;
      });
    },
    del(item, index) {
      this.$toast(
        "loading",
        this.$t("wallet.committing"),
        undefined,
        undefined,
        { bol: true }
      );
      this.api
        .operateWalletItem({
          id: item.id,
          coin_code: item.coinCode,
          operate: "DELETE"
        })
        .then(
          res => {
            this.$toast("success", this.$t("wallet.txt2"), 2);
            this.listAddress.splice(index, 1);
          },
          res => {}
        );
    }
  }
};
</script>

<style lang="less" scoped>
@import "../../assets/less/assets.less";

.wallet {
  .title {
    padding: 0;
  }
  .actives {
    color: @color-3;
  }
  .red {
    color: @color-3 !important;
  }
}
.page {
  padding: 30px 0;
  // background: @color-29;
  margin-bottom: 30px;
}
.back {
  &:hover {
    color: #ffc12a;
  }
}
</style>
