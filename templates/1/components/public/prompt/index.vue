<template>
  <div 
    :style="{top:top+'px'}" 
    class="first_propmt">
    <div class="position">
      <span><slot/></span>
      <i class="iconfont icon-page-dowm"/>
    </div>
  </div>
</template>

<script>
export default {
  name: "Prompt",
  props: {
    top: {
      type: Number,
      required: true
    }
  }
};
</script>

<style lang="less">
.first_propmt {
  position: relative;
  padding: 15px 10px;
  position: absolute;
  border-radius: 3px;
  right: 0;
  top: 0;
  text-align: center;
  .position {
    position: relative;
    line-height: 1;
    i {
      position: absolute;
      width: 12px;
      right: 10px;
      bottom: -24px;
      font-size: 12px;
    }
  }
}
</style>
