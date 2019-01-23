<template>
  <div class="first__toast">
    <div class="toast__Main"><i 
      :class="iconType" 
      class="iconfont"/><span>{{ data.content }}</span></div>
  </div>
</template>
<script>
export default {
  name: 'Toast',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  computed: {
    iconType() {
      switch (this.data.type) {
        case 'success':
          return 'icon-zhengquetishi green'
        case 'err':
          return 'icon-guanbi1 red'
      }
    }
  }
}
</script>
<style lang="less">
.first__toast {
  position: fixed;
  left: 0;
  right: 0;
  top: 20%;
  z-index: 999;
  text-align: center;
  .toast__Main {
    display: inline-block;
    height: 53px;
    min-width: 158px;
    background: #474f5f;
    border-radius: 2px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 14px;
    font-family: Microsoft YaHei;
    font-weight: 400;
    line-height: 53px;
    .iconfont {
      font-size: 24px;
      padding-right: 10px;
    }
    span {
      line-height: 53px;
      display: inline-block;
      vertical-align: top;
    }
    .red {
      color: #e94b37;
    }
    .green {
      color: #54bf13;
    }
  }
}
</style>
