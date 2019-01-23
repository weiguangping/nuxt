<template>
  <button 
    :class="{noDrop:state==3||state==1}"
    :disabled="state==1" 
    class="fisrt_countdown obainCode" 
    type="button" 
    style="outline:none!important;outline:none!important" 
  >
    <span 
      v-show="state!=3" 
      style="font-size:12px;display:inline-block;line-height:1;"> {{ $t(stateTxt[state]) }}</span>
    <span 
      v-show="state==3" 
      style="font-size:12px;display:inline-block;line-height:1;">{{ countdown }}S</span>
  </button>
</template>
<script>
import { countdown } from '~/assets/js/json/json.js'
export default {
  name: '',
  components: {},
  props: {
    state: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      countdown: 60,
      stateTxt: ['personal.obainCode', 'personal.sendIn', 'personal.endCode']
    }
  },

  mounted: function() {},
  methods: {
    obtainCode() {
      let that = this
      let timer = setInterval(function() {
        that.countdown--
        if (that.countdown == 0) {
          that.countdown = 60
          that.$emit('end')
          clearInterval(timer)
        }
      }, 1000)
    }
  }
}
</script>

<style lang="less" >
.fisrt_countdown {
  font-size: 12px;
  padding: 10px 0 !important;
  width: 100px;
  border: 0;
  cursor: pointer;
  span {
    display: inline-block;
    width: 100%;
  }
  cursor: pointer;
  span {
    display: inline-block;
    width: 100%;
    color: #474f5f !important;
    border-left: 1px solid #474f5f;
  }
}
.fisrt_countdown.noDrop {
  cursor: no-drop !important;
}
</style>
