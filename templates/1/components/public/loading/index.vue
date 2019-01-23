<template>
  <div class="first_loading">
    <img 
      src="../../../assets/images/loading.svg" 
      class="rotate">
  </div>
</template>

<script>
export default {
  name: 'Loading'
}
</script>

<style lang="less" scoped>
.first_loading {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  img {
    width: 42px;
    height: 42px;
    display: block;
    margin: auto;
  }
  .rotate {
    transition: 0.5s;
    transform-origin: center center;
    animation: rotate 1.2s linear infinite; /*开始动画后无限循环，用来控制rotate*/
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
