<template>
  <component :is="currentView"/>
</template>

<script>
import { mapGetters } from 'vuex'
import { firstLogin } from '~/templates/url/login/index.js'
export default {
  name: 'Login',
  head() {
    return {
      title: 'login'
    }
  },
  components: {
    firstLogin
  },
  data() {
    return {
      templateList: {
        first: 'firstLogin'
      }
    }
  },
  computed: {
    currentView() {
      return this.templateList[this.getBaseKey('templateId')]
    },
    ...mapGetters(['getBaseKey'])
  },
  mounted() {
    console.log(this)
  },
  methods: {}
}
</script>

<style lang="less" scoped>
</style>
