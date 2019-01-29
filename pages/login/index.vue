<template>
  <div class="login-page">
    <login-header rightText="注册"
      @callOnRight="toRegist" />
    <!-- 登录框 -->
    <login-comp class="login-comp-wrap"
      @loginCallBack="toHomepage" />
  </div>
</template>

<script>
  import loginHeader from '@/components/header/loginHeader'
  import LoginComp from '@/components/partcail/login/login'

  export default {
    components: {
      loginHeader,
      LoginComp
    },
    data() {
      return {}
    },
    methods: {
      // 跳转至注册页
      toRegist() {
        this.$router.push({
          path: '/login/regist'
        })
      },
      // 跳转至首页
      toHomepage() {
        this.$router.push({
          path: '/'
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .login-page {
    text-align: center;
    .login-comp-wrap {
      padding: 136px 76px 0;
    }
  }
</style>
