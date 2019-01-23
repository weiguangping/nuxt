<template>
  <div class="container">
    <div class="table">
      <table>
        <thead>
          <tr>
            <th style="width: 210px">{{ $t("assets.center.time") }}</th>
            <th
              class="publicSelect"
              style="margin-top: -5px;width: 200px"
              @click.stop="openType"
            >{{ $t("assets.center.coinType") }}</th>
            <th
              style="width: 230px"
              class="publicSelect"
              @click.stop="openTrade"
            >{{ $t("assets.center.type") }}</th>
            <th style="width: 230px">{{ $t("assets.center.number") }}</th>
            <th style="width: 230px">{{ $t("assets.center.statu") }}</th>
            <th style="width: 100px">{{ $t("assets.center.operation") }}</th>
          </tr>
        </thead>
        <div v-if="data.length>0">
          <tbody 
            v-for="(item,index) in data" 
            :key="index">
            <tr>
              <td>{{ item.createdTime }}</td>
              <td class="actives">{{ item.coinCode }}</td>
              <td>
                <span>{{ showType(item.transactionType) }}</span>
              </td>
              <td>{{ item.transacitonAmount }}</td>
              <td>
                <span>
                  {{ showStatus(item,index) }}
                  <span
                    v-if="item.confirm && item.confirm.isConfirm"
                  >{{ item.confirm.confirmations }}/{{ item.confirm.standard }}</span>
                </span>
              </td>
              <td class="lastTd">
                <a
                  v-show="item.isOutAddress"
                  @click="open(item.isOutAddress,index)"
                >{{ $t('assets.center.pack') }}</a>
                <a
                  v-show="!item.isOutAddress"
                  @click="open(item.isOutAddress,index)"
                >{{ $t('assets.center.view') }}</a>
              </td>
            </tr>

            <tr v-show="item.isOutAddress">
              <td 
                colspan="6" 
                class="deals">
                <div 
                  v-if="item.transactionType != 'GIVE'" 
                  class="fl item">
                  <div>{{ $t('assets.wallet.handling') }}：{{ item.createdTime }}</div>
                  <div
                    v-if="item.transactionType == 'WITHDRAW'"
                  >{{ $t('assets.tokens.fee') }}：{{ item.fee }}</div>
                  <div
                    v-if="item.transactionType == 'WITHDRAW' && item.status == 'REJECTED'"
                  >{{ $t('asset.faildReason') }}：{{ item.rejectReason }}</div>
                </div>

                <div 
                  v-if="item.transactionType != 'GIVE'" 
                  class="fl item">
                  <div
                    v-if="item.transactionType == 'WITHDRAW'"
                  >{{ $t('assets.wallet.walletUrl') }}： {{ item.outAddress }}</div>
                  <div style="padding-bottom: 10px">{{ $t('assets.wallet.businessID') }} : {{ item.txId }}</div>
                </div>

                <div 
                  v-if="item.transactionType == 'GIVE'" 
                  class="fl item">
                  <div>{{ $t('assets.center.time') }}：{{ item.createdTime }}</div>
                </div>
                <div 
                  v-if="item.transactionType == 'GIVE'" 
                  class="fl item">
                  <div>{{ $t('assets.center.remark') }}：{{ item.remark }}</div>
                </div>
              </td>
            </tr>
          </tbody>
      </div></table>
    </div>
    <no-data 
      v-if="data.length==0" 
      :txt="$t('order.noData')" 
      :state="state"/>
  </div>
 
</template>

<script>
import noData from "~/template/1/components/public/noData/noData.vue";

export default {
  name: "CoinList",
  components: {
    noData
  },
  props: {
    data: {
      type: Array,
      required: true
    },
    state: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      // state: 0
    };
  },
  watch: {
    data(val, oldVal) {
      if (oldVal.length == 0) {
        this.$emit("change", 1);
      }
    }
  },
  mounted() {},

  methods: {
    showType(val) {
      switch (val) {
        case "RECHARGE":
          return this.$t("asset.awardCharged");
          break;
        case "WITHDRAW":
          return this.$t("asset.awardDraw");
          break;
        case "GIVE":
          return this.$t("asset.awards");
          break;
        case "OTC_IN":
          return this.$t("asset.OTC_IN");
        case "OTC_OUT":
          return this.$t("asset.OTC_OUT");
      }
    },
    showStatus(val, i) {
      if (val.await) {
        return this.$t("asset.await");
      } else {
        if (val.transactionType == "RECHARGE" && val.status == "WAIT_AUDIT") {
          return this.$t("asset.confirm");
        }
        if (val.confirm && val.confirm.isConfirm) {
          val.status = "CONFIRM";
        }
        switch (val.status) {
          case "COMPLETED":
            return this.$t("asset.statusSucess");
            break;
          case "REJECTED":
            return this.$t("asset.statusFail");
            break;
          case "WAIT_AUDIT":
            return this.$t("asset.statusAwait");
            break;
          case "PROCESS":
            return this.$t("asset.completed");
          case "CONFIRM":
            return this.$t("asset.confirm");
            break;
        }
      }
    },
    open(item, index) {
      this.data[index].isOutAddress = item == null ? true : !item;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  min-height: 620px;
}
.record .table {
  margin: auto;
  // background: @color-29;
}
.record .deals {
  background: @color-8;
  padding: 20px 40px;
  .item {
    width: 50%;
  }
}
.record .deals div div {
  text-align: left;
  font-size: 12px;
  color: @color-2;
  padding: 5px 0;
  height: 30px;
  line-height: 20px;
}
// .record .deals > div:first-child {
//   width: 300px;
// }
.record .active {
  background: @color-59;
}
.record .table td a {
  color: @color-59;
  -webkit-user-select: none;
}
.record .table {
  min-height: 473px;
  margin-bottom: 30px;
}
.record .panel {
  top: 42px;
  max-height: 150px !important;
  height: auto !important;
}

.lastTd {
  a {
    color: @color-3!important;
    font-size: 12px;
  }
}
.actives {
  color: @color-3!important;
}
</style>
