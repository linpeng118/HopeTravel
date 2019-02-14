<template>
  <div class="regist-page">
    <login-header rightText="登录"
      @callOnLeft="btnLeft"
      @callOnRight="btnRight"/>
    <!-- 注册框 -->
    <regist-comp class="regist-comp-wrap"
      @registCallBack="toLogin" />
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
    head: {
      title: '注册'
    },
    data() {
      return {
        redirect: this.$route.query.redirect,
      }
    },
    methods: {
      btnLeft() {
        this.$router.go(-1)
      },
      btnRight() {
        this.toLogin()
      },
      // 跳转至登录页
      toLogin() {
        let path = this.redirect ? `/login?redirect=${this.redirect}` : '/login'
        this.$router.push({
          path
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