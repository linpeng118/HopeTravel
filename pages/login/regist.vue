<template>
  <div class="regist-page">
    <login-header rightText="登录"
      @callOnRigth="toLogin" />
    <h1 class="title">稀饭旅行账号注册</h1>
    <regist-comp />
  </div>
</template>

<script>
  import loginHeader from '@/components/header/loginHeader'
  import RegistComp from '@/components/partcail/login/regist'

  export default {
    components: {
      loginHeader,
      RegistComp
    },
    data() {
      return {}
    },
    computed: {},
    mounted() {},
    methods: {
      // 跳转至登录页
      toLogin() {
        this.$router.push({
          path: '/login'
        })
      },
    },
  }
</script>

<style lang="scss" scoped>
  .regist-page {
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