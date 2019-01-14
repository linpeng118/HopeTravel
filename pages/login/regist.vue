<template>
  <div class="regist-page">
    <login-header rightText="登陆"
      @callOnRigth="toLogin" />
  </div>
</template>

<script>
  import loginHeader from '@/components/header/loginHeader'

  export default {
    components: {
      loginHeader
    },
    data() {
      return {
      }
    },
    computed: {},
    mounted() {},
    methods: {
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
</style>