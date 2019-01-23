<template>
  <div class="record">
    <div class="title clearfix">
      <div class="fl">
        {{ $t("record.withdrawal") }}
      </div>
      <div class="fr">
        <p>
          <router-link to="/asset">
            {{ $t("record.retrueAssets") }}</router-link>
        </p>
      </div>
    </div>

    <div class="newest-list">
      <coin-list
        :data="newestItems"
        :state="state1"
      />
    </div>

    <div class="record-switch">
      <div
        class="record-type"
        style="margin-bottom:10px;"
      >
        <ul class="type-box">
          <li
            :class="{ 'checked-li': recordType == 'RECHARGE' }"
            @click="switchRecord(typeList[0],0)"
          >
            <span>{{ $t('record.buyHistory') }}</span>
          </li>
          <li
            :class="{ 'checked-li': recordType == 'WITHDRAW' }"
            @click="switchRecord(typeList[1],1)"
          >
            <span>{{ $t('record.mentionRecord') }}</span>
          </li>
          <li
            :class="{ 'checked-li': recordType == 'GIVE' }"
            @click="switchRecord(typeList[2],2)"
          >
            <span>{{ $t('record.otherRecord') }}</span>
          </li>
        </ul>
        <span class="searchInput">
          <i class="iconfont icon-sousuo left"/>
          <input
            v-model="searchInput"
            :placeholder="$t('record.placeholder')"
            type="text"
            @keyup.enter="searchData"
          >
          <i
            v-if="searchInput !=''"
            class="iconfont icon-hb_icon_hint right"
            @click="searchInput=''"
          />
        </span>
      </div>

      <coin-list
        :data="typeItems"
        :state="state2"
        @change="changeList"
      />

      <div
        v-if="page.totail > 0"
        class="page"
      >
        <Page
          :total="page.totail"
          show-elevator
          show-sizer
          @on-change="pageChange"
          @on-page-size-change="changePase"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import InputClick from "@/components/public/InputClick";
import { CoinList } from "~/template/1/components/assets/index.js";

import Page from "~/template/1/components/public/page/index.js";

export default {
  name: "",
  components: {
    CoinList,
    Page
    // InputClick
  },
  data() {
    return {
      page: {
        page: 0,
        size: 10,
        totail: 0
      },
      newestItems: [],
      typeItems: [],
      typeItemTotal: 0,
      recordType: "RECHARGE",
      typeList: [
        {
          name: this.$t("assets.center.chargedRecord"),
          value: "RECHARGE"
        },
        {
          name: this.$t("assets.center.mentionRecord"),
          value: "WITHDRAW"
        },
        {
          name: this.$t("assets.center.otherRecord"),
          value: "GIVE"
        }
      ],
      searchInput: "",
      state1: 0,
      state2: 0,
      index: 0
    };
  },

  created() {
    this.newestRequest();
    this.typeRequest();
  },
  methods: {
    confirmCount(arr, result) {
      this.api
        .confirmCount(arr)
        .then(res => {
          res = [];
          if (res.length == 0) {
            for (let j in result) {
              result[j].await = false;
            }
            return false;
          }
          for (let i in res) {
            for (let j in result) {
              result[j].await = false;
              if (
                res[i].txId &&
                result[j].txId &&
                res[i].txId == result[j].txId
              ) {
                result[j].confirm = res[i];
              }
            }
          }
          this.$set(result, result);
        })
        .catch(res => {});
    },
    newestRequest() {
      let _this = this;
      this.api
        .getAccountRecord({
          page: 0,
          size: 10
        })
        .then(res => {
          let arr = [];
          for (let i in res.content) {
            let item = res.content[i];
            let obj = {};
            item.isOutAddress = false;
            item.await = true;
            obj.txId = item.txId;
            obj.coinCode = item.coinCode;
            obj.transactionType = item.transactionType;
            arr.push(obj);
          }
          this.newestItems = res.content;
          this.confirmCount(arr, this.newestItems);
        });
    },
    typeRequest() {
      this.api
        .getAccountRecord({
          page: this.page.page,
          size: this.page.size,
          transaction_type: this.recordType,
          coin_code: this.searchInput,
          else_type: this.index == 2 ? true : false
        })
        .then(res => {
          let arr = [];
          if (res.content.length == 0) {
            this.state2 = 1;
          }
          for (let i in res.content) {
            let item = res.content[i];
            item.isOutAddress = false;
            item.await = true;
            let obj = {};
            obj.txId = item.txId;
            obj.coinCode = item.coinCode;
            obj.transactionType = item.transactionType;
            arr.push(obj);
          }
          this.page.totail = res.totalElements;
          this.typeItems = res.content;
          this.confirmCount(arr, this.typeItems);
        })
        .catch(res => {});
    },
    switchRecord(item, index) {
      this.index = index;
      this.state2 = 0;
      this.recordType = item.value;
      this.typeRequest();
    },
    searchData() {
      this.page.page = 0;
      this.typeRequest();
    },

    pageChange(index) {
      this.page.page = index - 1;
      this.typeRequest();
    },
    changePase(i) {
      this.page.size = i;
      this.typeRequest();
    },
    changeList(val) {
      this.state2 = val;
    }
  }
};
</script>

<style lang="less" scoped>
.record .title {
  width: 1200px;
  margin: 0 30px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: @color-28;
  margin: 32px auto;
}
.record .title .fr p {
  display: inline-block;
  font-size: 14px;
  padding-left: 38px;
}
.record .title .fr p a {
  color: @color-5;
  line-height: 20px;
}
.record .title .fr p a:hover {
  color: #ffc12a;
}
.record .title .fr p a i {
  margin-right: 10px;
}
.record .title .fl {
  line-height: 1em;
  font-size: 20px;
}
.record .newest-list {
  width: 1200px;
  margin: auto;
}
.record .head {
  margin: auto;
  height: 64px;
  line-height: 64px;
  background: @color-29;
  padding-left: 35px;
  position: relative;
  font-size: 20px;
  color: @color-28;
}
.record .head span {
  width: 5px;
  height: 20px;
  display: inline-block;
  background: @color-59;
  position: absolute;
  top: 50%;
  left: 18px;
  margin-top: -10px;
}

.record-switch {
  // background-color: @color-29;
  width: 1200px;
  margin: auto;

  .record-type,
  ul.type-box,
  .type-box li {
    // height: 64px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    li {
      cursor: pointer;
      // margin-left: 30px;
      color: @color-27;
      span {
        padding: 9px 24px;
      }
      &:hover {
        color: #161c2c !important;
        background-color: #ffc12a;
      }
    }

    .type-input,
    .type-input input {
      background-color: @color-17;
      border-radius: 3px;
    }
    .type-input {
      width: 305px;
      margin-right: 20px;
      display: flex;
      align-items: center;
      color: @color-27;
    }
    .type-input input {
      width: 250px;
      height: 36px;
      color: @color-27;
      font-size: 16px;
    }
    .type-input .sousuo-icon {
      font-size: 20px;
      margin: 0 12px;
    }
  }

  .page {
    padding: 30px 0;
    // background: @color-29;
    margin-bottom: 30px;
  }
}

.checked-li span {
  color: @color-1 !important;
  background-color: @color-3;
  // border-bottom: 2px solid @color-59;
}
.searchInput {
  position: relative;
}
.searchInput input {
  background-color: @color-1;
  padding: 0 30px;
}
.searchInput i.left {
  position: absolute;
  left: 6px;
  top: 6px;
}
.searchInput i.right {
  position: absolute;
  right: 6px;
  top: 10px;
  cursor: pointer;
}
</style>
