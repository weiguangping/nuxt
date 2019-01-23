<template>

  <div class="trade">
    <div class="title">
      <div class="fl">
        {{ $t("assets.center.personalRecordOfTransaction") }}
      </div>
      <div class="fr">
        <p>
          <router-link to="/asset">{{ $t("assets.retrueAssets") }}</router-link>
        </p>
      </div>
    </div>
    <div class="items">
      <p>
        {{ $t("assets.center.personalRecordOfTransaction") }}
      </p>
      <div class="table">
        <table>
          <thead>
            <tr>
              <th style="width:200px;">
                <div class="mrSmall">{{ $t("assets.center.orderNumber") }}</div>
              </th>
              <th style="width:142px;">
                <div class="mrSmall">{{ $t("assets.center.tradePair") }}</div>
              </th>
              <th style="width:192px;">
                <div class="mrSmall">{{ $t("assets.center.dealTime") }}</div>
              </th>
              <th style="width:92px;">
                <div class="mrSmall">{{ $t("assets.center.buyAndSell") }}</div>
              </th>
              <th style="width:132px;">
                <div class="mlSmall">{{ $t("assets.center.dealPrice") }}</div>
              </th>
              <th style="width:132px;">
                <div class="mlSmall">{{ $t("assets.center.tradingVolume") }}</div>
              </th>
              <th style="width:142px;">
                <div class="mlSmall">{{ $t("assets.center.tradingPrice") }}</div>
              </th>
              <th style="width:162px;">
                <div class="mlSmall">{{ $t("assets.center.serviceCharge") }}</div>
              </th>
            </tr>
          </thead>
          <tbody v-if="listTrade.length>0">
            <tr 
              v-for="(item,i) in listTrade" 
              :key="i">
              <td>
                <div class="mrSmall">{{ item.orderNum }}</div>
              </td>
              <td>
                <div class="mrSmall">{{ item.coinCode|coinCode }}</div>
              </td>
              <td>
                <div class="mrSmall">{{ item.transactionTime }}</div>
              </td>
              <td>
                <div class="mrSmall">
                  <span v-if="item.type==1">{{ $t('assets.center.buy') }}</span>
                  <span v-if="item.type==2">{{ $t('assets.center.sell') }}</span>
                </div>
              </td>
              <td>
                <div class="mlSmall">
                  {{ item.transactionPrice }}
                </div>
              </td>
              <td>
                <div class="mlSmall">
                  {{ item.transactionCount }}
                </div>
              </td>
              <td>
                <div class="mlSmall">
                  {{ (item.transactionPrice*item.transactionCount).toFixed(6) }}
                </div>
              </td>
              <td>
                <div class="mlSmall">
                  {{ item.transactionFee }}  <a v-if="item.type==1">{{ item.coinCode|coinCodeBuy }}</a><a v-else>{{ item.coinCode|coinCodeSell }}</a>
                </div>
              </td>
            </tr>

          </tbody>
        </table>
        <no-data 
          v-if="listTrade.length==0" 
          :txt="$t('order.noData')"/>
      </div>
      <div 
        v-if="TradeTotal>10" 
        class="page">
        <Page 
          :total="TradeTotal" 
          show-elevator 
          show-sizer 
          @on-change="pageChange" 
          @on-page-size-change="changePase"/>
      </div>
    </div>

  </div>

</template>
<script>
import noData from "~/template/1/components/public/noData/noData.vue";
import Page from "~/template/1/components/public/page/index.js";
import filter from "~/assets/js/filter.js";

export default {
  name: "",
  components: {
    noData,
    Page
  },
  filters: {
    coinCode(val) {
      return filter.tradingFilter(val, "-");
    },
    coinCodeBuy(val) {
      let arr = val.split("-");
      return arr[0];
    },
    coinCodeSell(val) {
      let arr = val.split("-");
      return arr[1];
    }
  },
  data() {
    return {
      listTrade: "",
      TradeTotal: 0,
      pageSize: 10,
      offset: 0
    };
  },
  created() {
    // this.tradesLits();
  },
  mounted: function() {},
  methods: {
    tradesLits() {
      this.api
        .tradesLits({
          limit: this.pageSize,
          offset: this.offset
        })
        .then(res => {
          this.listTrade = res.obj.rows;
          this.TradeTotal = res.obj.total;
        });
    },
    pageChange(i) {
      this.offset = (i - 1) * this.pageSize;
      this.tradesLits();
    },
    changePase(i) {
      this.offset = 0;
      this.pageSize = i;
      this.tradesLits();
    }
  }
};
</script>

<style lang="less"  scoped>
@import "../../assets/less/assets.less";

.assets .title .fr p a {
  color: @color-59;
}
.assets .active {
  background: @color-59;
}
.items > p {
  padding-right: 40px;
}
.items > p a {
  float: right;
  font-size: 16px;
  color: @color-28;
}
.items > p a i {
  padding: 0 10px 0 20px;
}
.items > p a.activeColor {
  color: @color-59;
}
.trade {
  width: 1200px;
  margin: 0 auto;
  min-height: 500px;
}
.trade .title {
  height: 64px;
  line-height: 64px;
  background: @color-29;
  width: 100%;
  padding: 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: @color-28;
  margin: 20px auto;
  width: 1200px;
}
.trade .title .fl {
  font-size: 20px;
}
.trade .title .fr p {
  display: inline-block;
  font-size: 14px;
  padding-left: 38px;
}
.trade .title .fr p a {
  color: @color-59;
}
.trade .mlSmall a {
  color: @color-27;
}
.trade .page {
  padding: 30px 0;
}
.trade .table {
  min-height: 473px;
}
</style>
