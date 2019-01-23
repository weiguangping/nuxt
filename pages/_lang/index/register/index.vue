<template>
  <component :is="currentView"/>
</template>
<script>
import { mapGetters } from 'vuex'
import { firstRegister } from '~/templates/url/register/index.js'
export default {
  name: 'Register',
  components: {
    firstRegister
  },
  data() {
    return {
      templateList: {
        first: 'firstRegister'
      }
    }
  },
  computed: {
    currentView() {
      return this.templateList[this.getBaseKey('templateId')]
    },
    ...mapGetters(['getBaseKey'])
  }
}
</script>
<style lang="less">
</style>
