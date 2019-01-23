<template>
  <ul :class="simpleWrapClasses" :style="styles" v-if="simple">
    <li :class="prevClasses" @click="prev">
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-left"></i>
      </a>
    </li>
    <div :class="simplePagerClasses" :title="currentPage + '/' + allPages">
      <input type="text" :value="currentPage" autocomplete="off" spellcheck="false" @keydown="keyDown" @keyup="keyUp" @change="keyUp">
      <span>/</span>
      {{ allPages }}
    </div>
    <li :class="nextClasses" @click="next">
      <a>
        <i class="ivu-icon ivu-icon-ios-arrow-right"></i>
      </a>
    </li>
  </ul>
  <div v-else>
    <ul :class="wrapClasses" :style="styles">
      <span :class="[prefixCls + '-total']" v-if="showTotal">
        <slot>共 {{ total }}
          <template v-if="total <= 1">条</template>
          <template v-else>条</template>
        </slot>
      </span>
      <li :class="prevClasses" @click="prev">
        <a>
          <i class=" iconfont icon-left-copy"></i>
        </a>
      </li>
      <li title="1" :class="firstPageClasses" @click="changePage(1)">
        <a>1</a>
      </li>
      <li title="向前 5 页" v-if="currentPage - 3 > 1" :class="[prefixCls + '-item-jump-prev']" @click="fastPrev">
        <a>
          <i class="ivu-icon ivu-icon-ios-arrow-left"></i>
        </a>
      </li>
      <li :title="currentPage - 2" v-if="currentPage - 2 > 1" :class="[prefixCls + '-item']" @click="changePage(currentPage - 2)">
        <a>{{ currentPage - 2 }}</a>
      </li>
      <li :title="currentPage - 1" v-if="currentPage - 1 > 1" :class="[prefixCls + '-item']" @click="changePage(currentPage - 1)">
        <a>{{ currentPage - 1 }}</a>
      </li>
      <li :title="currentPage" v-if="currentPage != 1 && currentPage != allPages" :class="[prefixCls + '-item',prefixCls + '-item-active']">
        <a>{{ currentPage }}</a>
      </li>
      <li :title="currentPage + 1" v-if="currentPage + 1 < allPages" :class="[prefixCls + '-item']" @click="changePage(currentPage + 1)">
        <a>{{ currentPage + 1 }}</a>
      </li>
      <li :title="currentPage + 2" v-if="currentPage + 2 < allPages" :class="[prefixCls + '-item']" @click="changePage(currentPage + 2)">
        <a>{{ currentPage + 2 }}</a>
      </li>
      <li title="向后 5 页" v-if="currentPage + 3 < allPages" :class="[prefixCls + '-item-jump-next']" @click="fastNext">
        <a>
          <i class="ivu-icon ivu-icon-ios-arrow-right"></i>
        </a>
      </li>
      <li :title="allPages" v-if="allPages > 1" :class="lastPageClasses" @click="changePage(allPages)">
        <a>{{ allPages }}</a>
      </li>
      <li :class="nextClasses" @click="next">
        <a>
          <i class="iconfont icon-hb_icon_badgex"></i>
        </a>
      </li>
    </ul>
    <div class="showSizer" v-if="showSizer">
      <div class="txt" @click.stop="openClick">
        <input type="text" readonly v-model="currentPageTotal" />
        <span></span>
        <i class="iconfont iconPagedowm" :class="{'icon-page-dowm':bol == false ,'icon-page-up':bol==true}"></i>
      </div>
      <div class="select" v-show="bol">
        <ul>
          <li v-for="(item, index) in pageSizeOpts" :key="index" @click="onSize(item)">{{item}}/{{$t('bnt.page')}}</li>
        </ul>
      </div>
    </div>
    <div class="goTo" :class="wrapClasses">
      <span>{{$t('bnt.goto')}}</span>
      <input type="text" v-model="pageIndex" autocomplete="off" spellcheck="false">
      <div class="bnt" @click="goTo(pageIndex)">{{$t('bnt.pageBnt')}}</div>
    </div>
  </div>
</template>
<script>
const prefixCls = "ivu-page";

export default {
  name: "Page",
  /*    mixins: [ Locale ],*/
  components: {
    /* Options */
  },
  props: {
    current: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizeOpts: {
      type: Array,
      default() {
        return [10, 20, 30, 40];
      }
    },
    placement: {
      type: null,
      default: "bottom"
    },
    transfer: {
      type: Boolean,
      default: false
    },
    size: {
      /* validator(value) {
        return oneOf(value, ["small"]);
      }, */
      type: String,
      default: 'small'
    },
    simple: {
      type: Boolean,
      default: false
    },
    showTotal: {
      type: Boolean,
      default: false
    },
    showElevator: {
      type: Boolean,
      default: false
    },
    showSizer: {
      type: Boolean,
      default: false
    },
    className: {
      type: String,
      default: ''
    },
    styles: {
      type: Object,
      default() {
        return {}
      }
    },
    classType: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefixCls: prefixCls,
      currentPage: this.current,
      currentPageSize: this.pageSize,
      currentPageTotal: this.pageSize + "/" + this.$t("bnt.page"),
      bol: false,
      pageIndex: this.current
    };
  },
  watch: {
    total(val) {
      let maxPage = Math.ceil(val / this.currentPageSize);
      if (maxPage < this.currentPage && maxPage > 0) {
        this.currentPage = maxPage;
      }
    },
    current(val) {
      this.currentPage = val;
    },
    pageSize(val) {
      this.currentPageSize = val;
    }
  },
  computed: {
    isSmall() {
      return !!this.size;
    },
    allPages() {
      const allPage = Math.ceil(this.total / this.currentPageSize);
      return allPage === 0 ? 1 : allPage;
    },
    simpleWrapClasses() {
      return [
        `${prefixCls}`,
        `${prefixCls}-simple`,
        {
          [`${this.className}`]: !!this.className
        }
      ];
    },
    simplePagerClasses() {
      return `${prefixCls}-simple-pager`;
    },
    wrapClasses() {
      return [
        `${prefixCls}`,
        {
          [`${this.className}`]: !!this.className,
          mini: !!this.size
        }
      ];
    },
    prevClasses() {
      return [
        `${prefixCls}-prev`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === 1
        }
      ];
    },
    nextClasses() {
      return [
        `${prefixCls}-next`,
        {
          [`${prefixCls}-disabled`]: this.currentPage === this.allPages
        }
      ];
    },
    firstPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === 1
        }
      ];
    },
    lastPageClasses() {
      return [
        `${prefixCls}-item`,
        {
          [`${prefixCls}-item-active`]: this.currentPage === this.allPages
        }
      ];
    }
  },
  mounted() {
    this.bodyListener = e => {
      this.bol = false;
    };
    document.addEventListener("click", this.bodyListener, false);
  },
  methods: {
    changePage(page) {
      if (this.currentPage != page) {
        this.currentPage = page;
        this.$emit("update:current", page);
        this.$emit("on-change", page);
      }
    },
    prev() {
      const current = this.currentPage;
      if (current <= 1) {
        return false;
      }
      this.changePage(current - 1);
    },
    next() {
      const current = this.currentPage;
      if (current >= this.allPages) {
        return false;
      }
      this.changePage(current + 1);
    },
    fastPrev() {
      const page = this.currentPage - 5;
      if (page > 0) {
        this.changePage(page);
      } else {
        this.changePage(1);
      }
    },
    fastNext() {
      const page = this.currentPage + 5;
      if (page > this.allPages) {
        this.changePage(this.allPages);
      } else {
        this.changePage(page);
      }
    },
    onSize(pageSize) {
      this.currentPageSize = pageSize;
      this.currentPageTotal = pageSize + "/" + this.$t("bnt.page");
      this.$emit("on-page-size-change", pageSize);
      this.changePage(1);
      this.bol = false;
    },
    openClick() {
      this.bol = !this.bol;
    },
    goTo(val) {
      let page = 0;

      if (this.isValueNumber(val)) {
        val = Number(val);
        if (val != this.currentPage) {
          const allPages = this.allPages;
          if (val > allPages) {
            page = allPages;
          } else {
            page = val;
          }
        }
      } else {
        page = 1;
      }
      if (page) {
        this.changePage(page);
        event.target.value = page;
      }
    },
    onPage(page) {
      this.changePage(page);
    },
    keyDown(e) {
      const key = e.keyCode;
      const condition =
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105) ||
        key === 8 ||
        key === 37 ||
        key === 39;
      if (!condition) {
        e.preventDefault();
      }
    },
    keyUp(e) {
      const key = e.keyCode;
      const val = parseInt(e.target.value);

      if (key === 38) {
        this.prev();
      } else if (key === 40) {
        this.next();
      } else if (key === 13) {
        let page = 1;

        if (val > this.allPages) {
          page = this.allPages;
        } else if (val <= 0 || !val) {
          page = 1;
        } else {
          page = val;
        }

        e.target.value = page;
        this.changePage(page);
      }
    },
    isValueNumber(value) {
      return /^[1-9][0-9]*$/.test(value + "");
    }
  },
  beforeDestroy() {
    document.removeEventListener("click", this.bodyListener);
  }
};
</script>
<style>
@import "./font/iconfont.css";
</style>

<style lang="less" scoped>
.page ul li.ivu-page-item-active {
    background: #FFC12A  !important;
    color: #27292e !important;
}
li.ivu-page-item:hover{
  background-color: #FFC12A !important;
  border: transparent;
}
.ivu-page {
  display: inline-block;
}
.ivu-page-item-jump-next,
.ivu-page-item-jump-prev,
.ivu-page-next,
.ivu-page-prev {
  display: inline-block;
  vertical-align: middle;
  width: 30px;
  height: 30px;
  line-height: 28px;
  list-style: none;
  text-align: center;
  cursor: pointer;
  // color: #666;
  font-family: Arial;
  border: 1px solid #161C2C;
  border-radius: 4px;
  transition: all 0.2s ease-in-out;
  box-sizing: border-box;
  font-size: 10px;
  background: #161C2C;
  i {
    color: #687284;
  }
}
.ivu-page-prev {
  margin-right: 8px;
}

.ivu-page-item-jump-next i,
.ivu-page-item-jump-prev i {
  display: none;
}
.iconfont {
  display: inline-block;
  font-family: Ionicons;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  text-rendering: auto;
  line-height: 30px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 12px;
  color: #F6F7FC;
}
.ivu-page-item-jump-next:after,
.ivu-page-item-jump-prev:after {
  content: "\2022\2022\2022";
  display: block;
  letter-spacing: 1px;
  color: #ccc;
  text-align: center;
}
.ivu-page-item {
  display: inline-block;
  vertical-align: middle;
  min-width: 30px;
  height: 30px;
  line-height: 28px;
  margin-right: 4px;
  text-align: center;
  list-style: none;
  background-color: #161C2C;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  cursor: pointer;
  font-family: Arial;
  border: 1px solid #161C2C;
  border-radius: 4px;

  -webkit-user-select: none;
  box-sizing: border-box;
  font-size: 12px;
}
.ivu-page-item a {
  color: #687284;
}
.ivu-page-disabled {
  cursor: not-allowed;
}
.ivu-page-item-active {
  border-color: #F5D325 !important;
  background-color: #F5D325!important;
}
.ivu-page-item-active a {
  color: #27292E!important;
}
.ivu-icon-ios-arrow-left:before {
  content: "\F3D2";
}
.ivu-icon-ios-arrow-right:before {
  content: "\F3D3";
}
.ivu-page-disabled {
  cursor: not-allowed;
}
.showSizer {
  width: 98px;
  height: 30px;
  display: inline-block;
  vertical-align: top;
  position: relative;
  cursor: pointer;
  margin-left: 5px;
}
.showSizer .txt {
  width: 100%;
  height: 100%;
  position: relative;
}
.showSizer .txt i {
  position: absolute;
  top: 2px;
  right: 10px;
  font-size: 10px;
  color: #687284;
  transition: all 0.2s ease-in-out;
  cursor: pointer;
}
.showSizer input {
  width: 100%;
  height: 100%;
  background: #161C2C;
  border-radius: 4px;
  font-size: 12px;
  padding-right: 20px;
  box-sizing: border-box;
  text-align: center;
  color: #687284;
  cursor: pointer;
  -webkit-user-select: none;
  border: 0;
  i {
    color: #687284!important;
  }
}
.showSizer .select {
  position: absolute;
  top: 30px;
  left: 0;

  width: 100%;
  box-sizing: border-box;
}
.showSizer .select ul {
  max-height: 200px;
  overflow: auto;
  margin: 5px 0;
  padding: 5px 0;
  background-color: #F6F7FC;
  box-sizing: border-box;
  border-radius: 4px;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.2);
  position: absolute;
  z-index: 900;
  width: 100%;
  font-size: 14px;
}
.showSizer .select ul li {
  margin: 0;
  line-height: normal;
  padding: 7px 16px;
  clear: both;
  color: #495060;
  font-size: 12px !important;
  white-space: nowrap;
  list-style: none;
  cursor: pointer;
  transition: background 0.2s ease-in-out;
  -webkit-user-select: none;
}
.showSizer .select ul li:hover {
  background: #F5D325;
}
.goTo {
  display: inline-block;
  vertical-align: top;
}
.goTo span {
  line-height: 30px;
  color: #687284;
  font-size: 12px;
  margin: 0 10px 0 20px;
}
.goTo input {
  width: 48px;
  text-align: center;
  height: 30px;
  line-height: 30px;
  border-radius: 4px;
  background: #161C2C;
  color: #687284;
  font-size: 12px;
  outline: none;
  border: 0;
}
.goTo .bnt {
  padding: 0 10px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 12px;
  color: #27292E;
  cursor: pointer;
  -webkit-user-select: none;
  vertical-align: top;
  display: inline-block;
  border-radius: 4px;
  background: #FFC12A;
  letter-spacing: 1px;
  margin-left: 5px;
}

.white li {
  background-color: #fff !important;
  border: 1px solid #D5DAE2;
  a {
    color: #474F5F!important;
  }
}
.white {
  span {
    color: #474F5F!important;
  }
  .iconfont {
    color: #474F5F!important;
  }
  input {
    background-color: #fff;
    border: 1px solid #D5DAE2;
    color: #474F5F!important;
  }
}
</style>
