<template>
  <nuxt-child 
    class="container"/>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  head() {
    return {
      title: this.getBaseKey('logo'),
      link: [
        {
          rel: 'icon',
          type: 'image/x-icon',
          href: '/api/resource/' + this.getBaseKey('logo')
        }
        // {
        //   rel: 'stylesheet',
        //   href: '/style/' + this.getBaseKey('templateId') + '/color_1.css'
        // }
      ]
    }
  },
  fetch({ store }) {
    // console.log(store);
  },
  async asyncData({ app, router, store }) {
    //await store.dispatch("getBaseInfor");
  },
  components: {},
  data() {
    return {}
  },
  computed: {
    ...mapGetters(['getBaseKey'])
  },
  created() {},
  mounted() {},
  methods: {}
}
</script>

<style>
.container {
  height: 100%;
  width: 100%;
}
</style>
