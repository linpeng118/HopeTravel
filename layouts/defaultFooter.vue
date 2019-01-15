<template>
  <div class="default-header">
    <nuxt />
    <lay-footer />
  </div>
</template>

<script>
  import LayFooter from '@/components/footer/index.vue'

  export default {
    components: {
      LayFooter
    }
  }
</script>

<style>
  .default-header {
    height: 100vh;
  }
</style>
