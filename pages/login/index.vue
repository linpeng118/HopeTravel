<template>
  <div class="login-page">
    <!-- 头部 -->
    <login-header :rightText="rightText"
      @callOnLeft="btnLeft"
      @callOnRight="btnRight" />
    <!-- 登录组件全套 -->
    <div class="login-all-comp">
      <login-page-comp />
    </div>
  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import {PAGE_TYPE} from '@/assets/js/consts/login'
  import loginHeader from '@/components/header/loginHeader'
  import LoginPageComp from '@/components/partcail/login'

  export default {
    components: {
      loginHeader,
      LoginPageComp,
    },
    data() {
      return {
        // 显示的页面类型
        PAGE_TYPE,
        // 重定向地址
        redirect: this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '',
      }
    },
    computed: {
      ...mapState({
        vxPage: state => state.login.page // 登录展示哪个页面
      }),
      // 头部右侧文字
      rightText() {
        if (this.vxPage === PAGE_TYPE.LOGIN) {
          return '注册'
        }
        return '登录'
      }
    },
    destroyed() {
      this.vxChangePage(PAGE_TYPE.LOGIN);
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
    },
  }
</script>

<style lang="scss" scoped>
  .login-page {
    height: 100%;
    min-height: 100vh;
    text-align: center;
    .login-all-comp {
      padding: 136px 76px 0;
    }
  }
</style>
