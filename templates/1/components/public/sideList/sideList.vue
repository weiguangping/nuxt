<template>
  <div class="article">
    <div class="head">
      <p>{{title}}</p>
    </div>
    <ul>
      <li v-for="(item,index) in list" :key="index">
        <div>
          <router-link :to="{name:url,params:{id:item.id}}">
            <p class="li-title">
              {{item.title|omitTitle}}
            </p>
          </router-link>
        </div>
      </li>

    </ul>
  </div>
</template>
<script>
import filter from "~/assets/js/filter";
export default {
  name: "",
  components: {},
  data() {
    return {};
  },
  props: {
    list: {
      type: null,
      default() {
        return []
      }
    },
    title: {
      type: String,
      default: ''
    },
    url: {
      type: String,
      default: ''
    }
  },
  filters: {
    omitTitle(val) {
      if (val) {
        return filter.omit(val, 30);
      }
    }
  },
  created() {},
  mounted: function() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.li-title:hover{
  color: #EFAE0F;
}
.article {
  width: 346px;
  // background:@primary-content-background;
  margin-bottom: 40px;
}
.article .head {
  padding: 12px 18px;
}
.article .head p {
  font-size: 16px;
  color: #161C2C;
  font-weight: 600;
  height: 16px;
  padding-bottom: 10px;
}
.article .head .fr {
  font-size: 12px;
  color: #F6F7FC;
  line-height: 16px;
}
.article ul {
  padding: 0 20px 20px 20px;
}
.article ul li a {
  display: block;
  font-size: 14px;
  color: #161C2C;
  position: relative;
  margin-top: 20px;
  line-height: 1.4;
}
.article ul li a p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
// .article ul li a:hover {
//   color: @font-button-level;
// }
.article ul li span {
  width: 16px;
  height: 16px;
  display: inline-block;
  background: #F5D325;
  line-height: 16px;
  text-align: center;
  color: #27292E;
  position: absolute;
  left: 0;
  top: 2px;
}
</style>
