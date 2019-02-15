<template>
  <div class="login-page-comp">
    <!-- 登录 -->
    <template v-if="vxPage===PAGE_TYPE.LOGIN">
      <login-comp class="login-comp-wrap"
        :showRegistTip="showRegistTip"
        @loginCallBack="loginCallBack"
        @toRegist="vxChangePage(PAGE_TYPE.REGIST)"
        @onAgreement="doOnAgreement"
        @forgetPswCallBack="forgetPswCallBack" />
    </template>
    <!-- 注册 -->
    <template v-if="vxPage===PAGE_TYPE.REGIST">
      <regist-comp class="regist-comp-wrap"
        :showLoginTip="showLoginTip"
        @toLogin="vxChangePage(PAGE_TYPE.LOGIN)"
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
    props: {
      isDialog: {
        type: Boolean,
        default: false
      },
      showRegistTip: {
        type: Boolean,
        default: false
      },
      showLoginTip: {
        type: Boolean,
        default: false
      }
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
      // // 是否显示注册提示
      // isShowRegistTip() {
      //   return this.showRegistTip
      // },
      // // 是否显示登录提示
      // isShowLoginTip() {
      //   return this.showLoginTip
      // },
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
        vxChangePage: 'login/changePage',
        vxToggleLoginDlg: 'login/toggleDialog'
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
        if (this.isDialog) {
          this.vxToggleLoginDlg(false)
        } else {
          if (this.redirect) {
            this.$router.replace({
              path: this.redirect
            })
          } else {
            this.$router.go(-1)
          }
        }
      },
      // 查看用户协议
      doOnAgreement() {
        this.vxToggleLoginDlg(false)
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
  .login-page-comp {
    text-align: center;
  }
</style>
