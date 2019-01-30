<template>
  <van-popup v-model="isShow"
    :position="proPos"
    :overlay="true"
    :style="{'width': dlgWidth}"
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
        if(index > -1) {
          return '60%'
        }
        return '86%'
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
      showLogin(){
        this.$emit('callSetDlgType', DLG_TYPE.LOGIN)
      },
      loginSuc() {
        this.$toast('登录成功')
        this.closeDlg()
      },
      // 关闭弹窗
      closeDlg() {
        this.vxToggleDialog(false)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .normal-dialog-comp {
    border-radius: 12px;
    .btn-close {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #d8d8d8;
    }
    .dialog-content {
      text-align: center;
      padding: 50px 30px;
    }
  }
</style>