<template>
  <div class="chosePanel">
    <ul>
      <li 
        v-for="(item, index) in list" 
        :key="index">
        <router-link :to="{name:'exchange',params:{cions:(item).toLowerCase()}}">
          {{ item | coins }}</router-link>
      </li>
    </ul>
  </div>
</template>
<script>
import filter from "~/assets/js/filter.js";
export default {
  name: "",
  components: {},
  filters: {
    coins(val) {
      return filters.coins(val);
    }
  },
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {};
  }
};
</script>

<style lang="less">
.assets .items table span .chosePanel {
  position: absolute;
  top: 13px;
  left: -61px;
  width: 100px;
  z-index: 2;
  padding-top: 10px;
}
.assets .items table span .chosePanel ul {
  background: @color-28;
  padding: 6px 0;
}
.assets .items table span .chosePanel ul li {
  line-height: 22px;
  height: 22px;
  font-size: 12px;
  padding-left: 10px;
  text-align: left;
  a {
    color: @color-29;
  }
}
.assets .items table span .chosePanel ul li:hover {
  background: @color-19;
}
</style>
