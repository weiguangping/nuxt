<template>
  <component 
    v-show="queue.bol" 
    id="toast" 
    :is="currentView" 
    :data="queue"/>
</template>
<script>
import { firstPluginsToast } from '~/templates/url/plugins/toast.js'
export default {
  name: 'Toast',
  components: {
    firstPluginsToast
  },
  data() {
    return {
      queue: {
        bol: false,
        type: ''
      },
      templateList: {
        first: 'firstPluginsToast'
      }
    }
  },
  computed: {
    currentView() {
      return this.templateList[
        document.getElementById('templateId').getAttribute('template-id')
      ]
    }
  },
  watch: {
    queue: {
      handler(val, oldVal) {
        console.log(val) //但是这两个值打印出来却都是一样的
      },
      deep: true
    }
  }
}
</script>
<style>
</style>
