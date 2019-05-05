<template>
  <nuxt-child />
</template>

<script>
  export default {
    head() {
      let srcCustomerService
      if (process.env.customerService === "53kf") {
        srcCustomerService = 'https://tb.53kf.com/code/code/10181581/3'
      }
      if (process.env.customerService === "baidu") {
        srcCustomerService = 'https://hm.baidu.com/hm.js?03f91ebf7f5ac08015d9f98fa0dc22fc'
      }
      return {
        script: [
          {
            src: srcCustomerService
          },
        ]
      }
    },
  }
</script>

<style lang="scss" scoped>
</style>