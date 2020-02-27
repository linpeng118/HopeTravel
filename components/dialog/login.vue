<template>
  <van-popup v-model="isShow"
             class="login-dialog-comp"
             position="bottom"
             :overlay="true">
    <div class="btn-close"
         @click="closeDlg">
      <van-icon name="cross" />
    </div>
    <div class="dialog-content">
      <login-comp :loginTitle="$t('partcailComp.subscribeLogin')"
                  :regTitle="$t('partcailComp.subscribeLogin')"
                  isDialog
                  @loginCallBack="loginCallBack()" />
    </div>
  </van-popup>
</template>

<script>
import {mapMutations} from 'vuex'
import LoginComp from '@/components/partcail/login/login'
import {getLocalStore, setLocalStore} from '@/assets/js/utils'
import {getProfile} from '@/api/profile'

export default {
  components: {
    LoginComp,
  },
  props: {
    // 是否显示弹窗
    proIsShow: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {}
  },
  computed: {
    isShow: {
      get() {
        return this.proIsShow
      },
      set(val) {
        this.$emit('callToggleShow', val)
      },
    },
  },
  methods: {
    ...mapMutations({
      vxChangePage: 'login/changePage',
      vxToggleLoginDlg: 'login/toggleDialog',
      vxSetProfile: 'profile/setProfile',
    }),
    // 关闭弹窗
    closeDlg() {
      this.vxToggleLoginDlg(false)
    },
    // 登陆回调
    async loginCallBack() {
      console.log('loginCallBack')
      try {
        fbq('track', 'Lead')
      } catch (error) {
        console.log(error)
      }
      // 弹窗登录/页面登录
      await this.getUserInfo()
      this.vxToggleLoginDlg(false)
      location.reload()
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
  },
}
</script>
<style>
</style>
<style lang="scss" scoped>
.login-dialog-comp {
  width: auto;
  left: 48px;
  right: 48px;
  bottom: 0;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  //z-index: 5000 !important;
  .btn-close {
    position: absolute;
    top: 28px;
    right: 38px;
    color: rgb(71, 30, 30);
    .van-icon {
      font-size: 36px;
    }
  }
  .dialog-content {
    padding: 54px 46px 300px;
    text-align: center;
  }
}
</style>
