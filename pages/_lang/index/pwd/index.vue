<template>
  <component :is="currentView"/>
   
</template>
<script>
import { mapGetters } from 'vuex'
import { firstForgotPwd } from '~/templates/url/forgotPwd/index.js'
export default {
  components: {
    firstForgotPwd
  },
  data() {
    return {
      templateList: {
        first: 'firstForgotPwd'
      }
    }
  },

  computed: {
    currentView() {
      return this.templateList[this.getBaseKey('templateId')]
    },
    ...mapGetters(['getBaseKey', 'getLoginStatus'])
  }
}
</script>
