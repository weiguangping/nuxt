<template>
    <div class="loading">
      <img :src="loading" class="rotate"/>
    </div>
</template>

<script>
import loading from '~/template/1/assets/images/loading.svg';
export default {
  name: "loading",
  data() {
    return {
      loading
    }
  }
}
</script>

<style lang="less" scoped>
    .loading{
      img{
        width: 42px;
        height: 42px;
        display: block;
        margin: auto;
      }
      .rotate{
        transition: 0.5s;
        transform-origin: center center;
        animation: rotate 1.2s linear infinite;  /*开始动画后无限循环，用来控制rotate*/
      }
        @keyframes rotate {
          0% {
            transform: rotate(0);
          }
          50% {
            transform: rotate(180deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      }
</style>
