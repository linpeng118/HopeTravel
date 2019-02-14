<template>
  <div class="login-page">
    <login-header rightText="注册"
      @callOnRight="onRight"
      @callOnLeft="onLeft" />
    <!-- 登录框 -->
    <login-comp class="login-comp-wrap"
      @loginCallBack="loginCallBack"
      @forgetPswCallBack="forgetPswCallBack" />
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
    methods: {
      // 点击返回
      onLeft() {
        // 如果游重定向地址
        if (this.redirect) {
          this.$router.replace({
            path: this.redirect
          })
        } else {
          this.$router.go(-1)
        }
      },
      // 点击注册
      onRight() {
        // 跳转至注册页
        this.$router.push({
          path: '/login/regist'
        })
      },
      // 登陆成功回调
      loginCallBack() {
        if (this.redirect) {
          this.$router.replace({
            path: this.redirect
          })
        } else {
          this.$router.go(-1)
        }
      },
      // 忘记密码回调
      forgetPswCallBack() {
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
