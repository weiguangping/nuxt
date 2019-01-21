<template>
  <div>
    <h2>News Index page</h2>
    <p>NewsID:{{$route.params.newsId}}</p>
    <ul>
      <li>
        <nuxt-link :to="{name:'index'}">HOME</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name:'about'}">ABOUT</nuxt-link>
      </li>
      <li>
        <nuxt-link :to="{name:'news-detail',query:{id:3306}}">NEWS</nuxt-link>
      </li>
    </ul>
    {{ $t('links.english') }}
    <div @click="aa">aaaaaaaaa</div>
  </div>
</template>
<script>
  export default {
    methods: {
      aa() {
        this.$i18n.locale = 'en'
        this.$store.commit('SET_LANG', 'en')
      }
    },
  }
</script>