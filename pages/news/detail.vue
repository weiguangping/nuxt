<template>
  <div>
    <h2>News-Content [{{$route.query.id}}]</h2>
    <ul>
      <li><a href="/">{{ $t('links.english') }}</a></li>
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
    fetch({ store }) {
      // console.log(store)
    },
    mounted() {
      console.log(111) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
      // console.log(this) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
    },
    async asyncData({ app }) {
      console.log(222) // Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}

      console.log(app.$api)
      return;
      app.$api.GET(app.$url.baseUrl).then((res) => {
        console.log(11)
        console.log(res)
      })
      // let { data } = await app.$axios.get(app.$api.baseUrl)
      // return { info: data }
      // return { title: params.app.$api.baseUrl }
    }
    // 这样调出的结果确实是一样的。到此全局变量完毕

  }
</script>