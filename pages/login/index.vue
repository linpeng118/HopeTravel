<template>
  <div class="login-page">
    <login-header rightText="注册"
      @callOnRight="toRegist" :redirect="!!redirect"/>
    <!-- 登录框 -->
    <login-comp class="login-comp-wrap"
      @loginCallBack="loginCB" 
      @forgetPswCallBack="forgetPswCallBack"/>
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
    head: {
      title: '登录'
    },
    data() {
      return {
        redirect: this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '',
      }
    },
    mounted() {},
    methods: {
      // 跳转至注册页
      toRegist() {
        this.$router.push({
          path: '/login/regist'
        })
      },
      // 跳转至首页
      loginCB() {
        if (this.redirect) {
          this.$router.push({
            path: this.redirect
          })
        } else {
          this.$router.push({
            path: '/'
          })
        }
      },
      onClickLeft(){
        if (this.redirect) {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      },
      forgetPswCallBack() {
        console.log('login/forgetPswCallBack')
        this.$router.push({
          path: `/login/forget`,
        })
      }
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
