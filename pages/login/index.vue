<template>
  <div class="login-page">
    <login-header rightText="注册"
      @callOnRigth="toRegist" />
    <h1 class="title">稀饭旅行账号登录</h1>
    <!-- 登录框 -->
    <login-comp @loginCallBack="toHomepage" />
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
    .title {
      padding-top: 136px;
      font-size: 40px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 56px;
      color: rgba(85, 85, 85, 1);
      opacity: 1;
    }
  }
</style>
