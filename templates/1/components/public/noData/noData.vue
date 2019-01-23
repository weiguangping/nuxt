<template>
  <div 
    :class="type==1?'small':'pad'" 
    class="first_noData">
    <loading v-if="state==0"/>
    <div v-if="state==1">
      <img src="../../../assets/images/noData.png" >
      <p>{{ txt }}</p>
    </div>
  </div>
</template>
<script>
import loading from "../loading/loading";
export default {
  name: "",
  components: {
    loading
  },
  props: {
    widthImg: {
      type: null,
      default: ""
    },
    txt: {
      type: null,
      default: ""
    },
    state: {
      type: null,
      default: ""
    },
    type: {
      type: null,
      default: ""
    }
  },
  data() {
    return {};
  },
  created() {},
  mounted: function() {},
  methods: {}
};
</script>

<style lang="less" scoped>
.first_noData {
  .pad {
    padding: 150px 0;
  }

  img {
    width: 80px !important;
    margin: auto;
    display: block;
  }
  p {
    text-align: center;
    font-size: 12px;
    line-height: 1;
    padding-top: 15px;
  }
}
</style>
