<template>
  <van-popup v-model="isShow"
    :position="proPos"
    :overlay="true"
    :style="{'width': dlgWidth, 'padding': dlgPadding}"
    class="normal-dialog-comp">
    <div class="btn-close"
      @click="closeDlg"
      v-show="isShowClose">
      <van-icon name="cross" />
    </div>
    <div class="dialog-content">
      <component :is="currComp"
        showRegistTip
        showLoginTip
        @forgetPswCallBack="forgetPswCallBack"
        @showLoginDlg="setDlgType"
        @registCallBack="showLogin"
        @loginCallBack="loginSuc"
        @showRegistDlg="setDlgType">
      </component>
    </div>
  </van-popup>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import NormalComp from './normal'
  import PhoneComp from './phone'
  import LoginComp from '@/components/partcail/login/login'
  import RegistComp from '@/components/partcail/login/regist'
  import {DLG_TYPE} from '@/assets/js/consts/dialog'
  import {getLocalStore, setLocalStore} from '@/assets/js/utils'

  export default {
    components: {
      NormalComp,
      PhoneComp,
      LoginComp,
      RegistComp
    },
    props: {
      // 是否显示弹窗
      proIsShow: {
        type: Boolean,
        default: true,
      },
      // 弹窗类型
      proDlgType: {
        type: String,
        default: DLG_TYPE.NORMAL,
      },
      proPos: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        DLG_TYPE,
      }
    },
    computed: {
      ...mapState({
        // vxShowDlg: state => state.isShowDlg
      }),
      isShow: {
        get() {
          return this.proIsShow
        },
        set(val) {
          this.$emit('callToggleShow', val)
        }
      },
      currComp: {
        get() {
          return this.proDlgType
        },
        set(val) {
          this.$emit('callSetDlgType', val)
        }
      },
      // 是否显示关闭按钮
      isShowClose() {
        const noCloseArr = [
          DLG_TYPE.PHONE
        ]
        const index = noCloseArr.findIndex(item => item === this.currComp)
        return index > -1 ? false : true
      },
      // 显示弹窗的宽度
      dlgWidth() {
        const arrW60 = [
          DLG_TYPE.PHONE
        ]
        const index = arrW60.findIndex(item => item === this.currComp)
        if (index > -1) {
          return '60%'
        }
        return '86%'
      },
      // 显示弹窗的宽度
      dlgPadding() {
        // 不需要padding的
        const arrNoPadding = [
          DLG_TYPE.PHONE
        ]
        const index = arrNoPadding.findIndex(item => item === this.currComp)
        if (index > -1) {
          return '0'
        }
        return '30px'
      },
    },
    methods: {
      ...mapMutations({
        vxToggleDialog: 'toggleDialog'
      }),
      setDlgType(val) {
        console.log('val', val)
        this.$emit('callSetDlgType', val)
      },
      // 显示登录弹窗
      showLogin() {
        this.$emit('callSetDlgType', DLG_TYPE.LOGIN)
      },
      loginSuc() {
        this.$toast('登录成功')
        this.closeDlg()
      },
      // 关闭弹窗
      closeDlg() {
        this.vxToggleDialog(false)
      },
      // 忘记密码回调
      forgetPswCallBack() {
        this.closeDlg()
        this.$router.push({
          path: `/login/forget?redirect=${encodeURIComponent(this.$route.fullPath)}`,
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .normal-dialog-comp {
    border-radius: 12px;
    .btn-close {
      position: absolute;
      right: 16px;
      top: 10px;
      color: #d8d8d8;
      .van-icon {
        font-size: 36px;
      }
    }
    .dialog-content {
      text-align: center;
    }
  }
</style>