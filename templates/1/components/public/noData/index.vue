<template>
  <div 
    :class="genre==1?'small':'pad'" 
    class="first_publicNoData">
    <loading v-if="state==0"/>
    <div v-if="state==1">
      <img src="../../../assets/images/noData.png" >
      <p>{{ txt }}</p>
    </div>
  </div>
</template>
<script>
import loading from '../loading/'
export default {
  name: 'NoData',
  components: {
    loading
  },
  props: {
    txt: {
      type: String,
      required: true
    },
    state: {
      type: Number,
      required: true
    },
    genre: {
      type: Number,
      required: true,
      default: 0
    }
  },
  data() {
    return {}
  },
  created() {},
  mounted: function() {},
  methods: {}
}
</script>

<style lang="less" scoped>
.first_publicNoData {
  .pad {
    padding: 150px 0;
  }
  .small {
    img {
      width: 100px !important;
    }
    p {
      text-align: center;
      font-size: 12px;
      line-height: 1;
      padding-top: 15px;
    }
  }
}
</style>
