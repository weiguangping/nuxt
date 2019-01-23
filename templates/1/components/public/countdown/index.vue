<template>
  <button  
    :class="{'first_noDrop':state==3||state==1}" 
    :disabled="state==1" 
    type="button" 
    style="outline:none!important;outline:none!important" 
    class="first_obainCode">
    <span 
      v-show="state!=3" 
      style="font-size:12px;display:inline-block;line-height:1;"> {{ $t(stateTxt[state]) }}</span>
    <span 
      v-show="state==3" 
      style="font-size:12px;display:inline-block;line-height:1;">{{ countdown }}S</span>
  </button>
</template>
<script>
export default {
  name: '',
  components: {},
  props: {
    state: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      countdown: 60,
      stateTxt: ['bnt.sendCode', 'bnt.sendIn', 'bnt.endCode']
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

<style lang="less">
.first_obainCode {
  font-size: 12px;
  padding: 11px 0 !important;
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
  }
}
.first_noDrop {
  cursor: no-drop !important;
}
</style>
