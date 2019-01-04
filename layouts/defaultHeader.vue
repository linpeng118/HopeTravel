<template>
  <div class="default-header">
    <lay-header />
    <nuxt />
  </div>
</template>

<script>
  import LayHeader from '@/components/header/index.vue'
  export default {
    components: {
      LayHeader
    }
  }
</script>

<style>
.default-header{
  height: 100vh;
}
</style>
