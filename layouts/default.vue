<template>
  
  <nuxt 
    id="templateId" 
    :template-id="getBaseKey('templateId')"/>

</template>
<script>
import { mapGetters } from 'vuex'
export default {
  computed: {
    ...mapGetters(['getBaseKey'])
  }
}
</script>

<style>
#__layout {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  overflow-y: auto;
}
#templateId {
  position: relative;
}
</style>
