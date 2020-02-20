<template>
  <div class="login-page">

    <!-- 页面关闭按钮 -->
    <van-icon @click="btnLeft()"
              name="cross"
              class="close-btn" />

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
                 @registCallBack="registCallBack()" />

    <!-- 协议 -->
    <div class="agreement-warpper"
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

    <!-- <div class="login-all-comp">
      <login-page-comp />
    </div> -->
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
    }
  },
  methods: {
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
      console.log('loginCallBack')
      try {
        fbq('track', 'Lead')
      } catch (error) {
        console.log(error)
      }
      return
      // 弹窗登录/页面登录
      await this.getUserInfo()
      console.log(this.isDialog, this.redirect)

      if (this.isDialog) {
        this.vxToggleLoginDlg(false)
        // this.$router.go(0) 手机端有些浏览器不能刷新
        location.reload()
      } else {
        if (this.redirect) {
          this.$router.replace({
            path: this.redirect,
            query: {
              isLogin: true,
            },
          })
        } else {
          console.log('进来咯')

          this.$router.push({path: '/personal'})
        }
      }
    },
    // 获取到用户信息
    async getUserInfo() {
      let {data, code} = await getProfile()
      console.log(data, code)

      if (code === 0) {
        console.log(1111)

        this.vxSetProfile(data)
      } else {
        this.vxSetProfile({})
      }
      console.log(this.$store.state.profile.profile)
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
  min-height: 100vh;
  padding: 174px 72px 0;
  position: relative;
  .close-btn {
    position: absolute;
    left: 62px;
    top: 36px;
    color: #000;
    font-size: 36px;
  }
  // 登录
  .login-all-comp {
    padding: 212px 72px 0;
  }

  // 协议
  .agreement-warpper {
    width: 100%;
    position: fixed;
    left: 0;
    bottom: 136px;
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
