<template>
  <div>
    <nuxt-child keep-alive :keep-alive-props="{ exclude: ['modal'] }" />
  </div>
</template>

<script>
export default {
  layout: 'productList'
}
</script>

<style type="text/scss" lang="scss" scoped>
</style>
