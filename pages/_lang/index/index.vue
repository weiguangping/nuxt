<template>
  <div>
    <component :is="currentView"/>
   
    <div>{{ getBaseKey('domain') }}</div>
    <div>{{ $store.state.isLogin }}</div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { firstHome } from '~/templates/url/home/index.js'
export default {
  components: {
    firstHome
  },
  data() {
    return {
      templateList: {
        first: 'firstHome'
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
