<template>
  <div class="regist-page">
    <login-header rightText="登录"
      @callOnRigth="toLogin" />
    <!-- 注册框 -->
    <regist-comp class="regist-comp-wrap"
      showRegistTip
      @loginCallBack="toHomepage" />
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
    .regist-comp-wrap {
      padding: 136px 76px 0;
    }
  }
</style>