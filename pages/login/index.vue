<template>
  <div class="login-page">

    <!-- 页面关闭按钮 -->
    <van-icon @click="btnLeft()"
              name="cross"
              class="close-btn" />

    <div class="form">
      <!-- 登录 -->
      <login-comp v-if="formStyle==1"
                  class="login-comp-wrap"
                  ref="loginComp"
                  :loginTitle="$t('partcailComp.loginTips')"
                  :loginSubTitle="$t('partcailComp.loginSubTips')"
                  :regTitle="$t('partcailComp.toursLogin')"
                  :isAgree="isAgree"
                  @toRegist="formStyle=2"
                  @loginCallBack="loginCallBack()" />

      <!-- 注册 -->
      <regist-comp v-if="formStyle==2"
                   class="regist-comp-wrap"
                   ref="regComp"
                   :regTitle="$t('partcailComp.emailReg')"
                   @toLogin="formStyle=1"
                   @registCallBack="registCallBack()"
                   @hideAgreement="agreementShow=false" />
    </div>

    <!-- 协议 -->
    <div v-if="agreementShow"
         class="agreement-warpper"
         @click="toggleAgreeProp()">
      <img src="../../assets/imgs/login/checked.png"
           alt=""
           v-if="isAgree">
      <img src="../../assets/imgs/login/check.png"
           alt=""
           v-else>
      同意
      <span @click.stop="$router.push({
        path: '/protocol/user',
      })">{{$t('partcailComp.AgreementName')}}</span>
      和
      <span @click.stop="$router.push({
        path: '/protocol/xifan',
      })">{{$t('partcailComp.privacy')}}</span>
    </div>

  </div>
</template>

<script>
import {mapState, mapMutations} from 'vuex'
import LoginComp from '@/components/partcail/login/login'
import RegistComp from '@/components/partcail/login/regist'
import {getProfile} from '@/api/profile'

export default {
  components: {
    LoginComp,
    RegistComp,
  },
  data() {
    return {
      redirect: this.$route.query.redirect ? decodeURIComponent(this.$route.query.redirect) : '', // 重定向地址

      formStyle: 1, //1.登录 2.注册
      isAgree: true, //是否同意协议
      agreementShow: true,

      screenHeight: 0,
      originHeight: 0,
    }
  },
  watch: {
    screenHeight(val) {
      if (this.originHeight != val) {
        this.agreementShow = false
      } else {
        this.agreementShow = true
      }
    },
  },
  mounted() {
    const that = this
    if (process.client) {
      that.screenHeight = document.body.clientHeight
      that.originHeight = document.body.clientHeight
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight
          that.screenHeight = window.screenHeight
        })()
      }
    }
  },
  methods: {
    ...mapMutations({
      vxChangePage: 'login/changePage',
      vxToggleLoginDlg: 'login/toggleDialog',
      vxSetProfile: 'profile/setProfile',
    }),
    // 头部按钮（左）【返回】
    btnLeft() {
      // 如果游重定向地址
      if (this.redirect) {
        this.$router.replace({
          path: this.redirect,
          query: {
            isLogin: false,
          },
        })
      } else {
        let href = window.location.href.slice(-1)
        if (href == '#') {
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
      }
    },

    //协议同意切换
    toggleAgreeProp() {
      this.isAgree = !this.isAgree
      switch (this.formStyle) {
        case 1:
          this.$refs.loginComp.switchAgree(this.isAgree)
          break
        case 2:
          this.$refs.regComp.switchAgree(this.isAgree)
          break
      }
    },
    // 登陆回调
    async loginCallBack() {
      try {
        fbq('track', 'Lead')
      } catch (error) {
        console.log(error)
      }
      // 弹窗登录/页面登录
      await this.getUserInfo()
      if (this.redirect) {
        this.$router.replace({
          path: this.redirect,
          query: {
            isLogin: true,
          },
        })
      } else {
        this.$router.replace({path: '/personal'})
      }
    },
    // 获取到用户信息
    async getUserInfo() {
      let {data, code} = await getProfile()
      if (code === 0) {
        this.vxSetProfile(data)
      } else {
        this.vxSetProfile({})
      }
    },
    //注册
    registHandle() {},
    // 注册回调
    registCallBack() {
      try {
        fbq('track', 'Lead')
      } catch (error) {
        console.log(error)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.login-page {
  height: 100%;
  height: 100vh;
  padding: 174px 72px 136px;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .close-btn {
    position: absolute;
    left: 62px;
    top: 36px;
    color: #000;
    font-size: 36px;
  }

  // 协议
  .agreement-warpper {
    width: 100%;
    font-size: 24px;
    color: #888;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 44px;
      height: 44px;
    }
    span {
      color: rgba(57, 158, 246, 1);
    }
  }
}
</style>
