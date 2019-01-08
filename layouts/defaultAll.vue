<template>
  <div class="default-header">
    <lay-header />
    <nuxt />
    <lay-footer />
  </div>
</template>

<script>
  import LayHeader from '@/components/header/index.vue'
  import LayFooter from '@/components/footer/index.vue'

  export default {
    components: {
      LayHeader,
      LayFooter
    }
  }
</script>

<style>
  .default-header {
    height: 100vh;
  }
</style>
