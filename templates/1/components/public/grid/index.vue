<template>
  <div class="first_gridBox">
    <p 
      v-for="(item,index) in 6" 
      :class="{borderRed:bol>0&&valLength<=index&&!focus,borderActive:focus&&valLength<=index}" 
      :key="index">
      <span v-if="type==1">
        {{ val[index] }}
      </span>
      <em 
        v-else 
        v-show="valLength>index"/>
    </p>
    <a 
      v-show="focus" 
      :style="{left:leftPad+'px'}"/>
  </div>
</template>

<script>
export default {
  name: 'Grid',
  props: {
    bol: {
      type: Number,
      required: true
    },
    val: {
      type: String,
      required: true
    },
    focus: {
      type: Boolean,
      required: true
    },
    type: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      cursor: false,
      leftPad: 18,
      valLength: 0
    }
  },
  watch: {
    val(val) {
      this.leftPad =
        val.length == 6 ? val.length * 52 - 27 : val.length * 52 + 18
      this.valLength = val.length
    }
  }
}
</script>

<style lang="less"  >
@import url('../../../assets/less/login.less');
.first_gridBox {
  margin-right: -12px;
  height: 42px;
  position: relative;
  p {
    float: left;
    height: 42px;
    width: 42px;
    border-radius: 4px;
    text-align: center;
    line-height: 38px;
    margin-right: 10px;
    em {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      display: inline-block;
    }
    span {
      font-size: 24px;
    }
  }
  a {
    height: 20px;
    width: 2px;

    display: inline-block;
    position: absolute;
    top: 10px;
  }
  @-webkit-keyframes fade {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
  a {
    animation: fade 3000ms infinite;
    -webkit-animation: fade 1000ms infinite;
  }
}
</style>
