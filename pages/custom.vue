<template>
  <nuxt-child />
</template>

<script>
  export default {
    components: {},
    head() {
      return {
        script: [
          {
            src: 'https://hm.baidu.com/hm.js?03f91ebf7f5ac08015d9f98fa0dc22fc'
          }
        ]
      }
    },
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
</style>