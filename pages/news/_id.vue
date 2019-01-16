<template>
  <div>
    <h2>News-Content [{{$route.params.id}}]</h2>
    <ul>
      <li><a href="/">Home</a></li>
    </ul>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        name: 'hello World',
      }
    },
    fetch({store}) {
      console.log(store)
    },
    mounted() {
      console.log(4) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
    },
    async asyncData({ app }) {
      let { data } = await app.$axios.get(app.$api.baseUrl)
      return { info: data }
      // return { title: params.app.$api.baseUrl }
    }
    // 这样调出的结果确实是一样的。到此全局变量完毕

  }
</script>