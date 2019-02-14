<template>
  <div class="login-page">
    <!-- 头部 -->
    <login-header :rightText="rightText"
      @callOnLeft="btnLeft"
      @callOnRight="btnRight" />
    <!-- 登录 -->
    <template v-if="vxPage===PAGE_TYPE.LOGIN">
      <login-comp class="login-comp-wrap"
        @loginCallBack="loginCallBack"
        @forgetPswCallBack="forgetPswCallBack" />
    </template>
    <!-- 注册 -->
    <template v-if="vxPage===PAGE_TYPE.REGIST">
      <regist-comp class="regist-comp-wrap"
        @registCallBack="registCallBack" />
    </template>
    <!-- 忘记密码 -->
    <template v-if="vxPage===PAGE_TYPE.FORGET">
      <forget-comp class="forget-comp-wrap"
        @nextCallBack="nextCallBack" />
    </template>
    <!-- 修改密码 -->
    <template v-if="vxPage===PAGE_TYPE.CHANGE">
      <change-comp class="change-comp-wrap"
        @noFormDataCallBack="noFormDataCallBack"
        @changeCallBack="changeCallBack" />
    </template>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {PAGE_TYPE} from '@/assets/js/consts/login'
  import loginHeader from '@/components/header/loginHeader'
  import LoginComp from '@/components/partcail/login/login'
  import RegistComp from '@/components/partcail/login/regist'
  import ForgetComp from '@/components/partcail/login/forget'
  import ChangeComp from '@/components/partcail/login/change'

  export default {
    components: {
      loginHeader,
      LoginComp,
      RegistComp,
      ForgetComp,
      ChangeComp
    },
    data() {
      return {
        PAGE_TYPE, // 显示的页面类型
        redirect: this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '',
      }
    },
    computed: {
      ...mapState({
        vxPage: state => state.login.page
      }),
      // 头部右侧文字
      rightText() {
        if (this.vxPage === PAGE_TYPE.LOGIN) {
          return '注册'
        }
        return '登录'
      }
    },
    methods: {
      ...mapMutations({
        vxChangePage: 'login/changePage'
      }),
      // 头部按钮（左）【返回】
      btnLeft() {
        switch (this.vxPage) {
          case PAGE_TYPE.CHANGE:
            this.vxChangePage(PAGE_TYPE.FORGET)
            break;
          default:
            // 如果游重定向地址
            if (this.redirect) {
              this.$router.replace({
                path: this.redirect
              })
            } else {
              this.$router.go(-1)
            }
            break;
        }
      },
      // 头部按钮（右）
      btnRight() {
        if (this.vxPage === PAGE_TYPE.LOGIN) {
          this.vxChangePage(PAGE_TYPE.REGIST)
        } else {
          this.vxChangePage(PAGE_TYPE.LOGIN)
        }
      },
      // 登陆回调
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
        this.vxChangePage(PAGE_TYPE.FORGET)
      },
      // 注册回调
      registCallBack() {
        this.vxChangePage(PAGE_TYPE.LOGIN)
      },
      // 找回密码回调
      nextCallBack() {
        this.vxChangePage(PAGE_TYPE.CHANGE)
      },
      // 修改密码中没有数据
      noFormDataCallBack() {
        this.vxChangePage(PAGE_TYPE.FORGET)
      },
      // 修改密码回调
      changeCallBack() {
        this.vxChangePage(PAGE_TYPE.LOGIN)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .login-page {
    text-align: center;
    .login-comp-wrap,
    .regist-comp-wrap,
    .forget-comp-wrap,
    .change-comp-wrap {
      padding: 136px 76px 0;
    }
  }
</style>
