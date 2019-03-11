<template>
  <div>
    <nuxt/>
    <!-- 登录弹窗 -->
    <login-dialog :proIsShow="vxShowLoginDlg"
      @callToggleShow="toggleLoginDlg"/>
    <!-- 通用弹窗 -->
    <global-dialog :proIsShow="vxShowDlg"
      :proDlgType="vxDlgType"
      @callToggleShow="toggleDialog"
      @callSetDlgType="setDlgType" />


  </div>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import GlobalDialog from '@/components/dialog'
  import LoginDialog from '@/components/dialog/login'

  export default {
    components: {
      GlobalDialog,
      LoginDialog
    },
    data() {
      return {}
    },
    computed: {
      ...mapState({
        // 登录弹窗
        vxShowLoginDlg: state => state.login.isShowDlg,
        // 通用弹窗
        vxShowDlg: state => state.isShowDlg,
        vxDlgType: state => state.dlgType
      })
    },
    methods: {
      ...mapMutations({
        // 是否显示登录弹窗
        vxToggleLoginDlg: 'login/toggleDialog', 
        // 是否显示通用弹窗
        vxToggleDialog: 'toggleDialog',
        vxSetDlgType: 'setDlgType',
      }),
      // 显示/隐藏登录弹窗
      toggleLoginDlg(val) {
        this.vxToggleLoginDlg(val)
      },
      // 显示/隐藏通用弹窗
      toggleDialog(val) {
        this.vxToggleDialog(val)
      },
      setDlgType(val) {
        this.vxSetDlgType(val)
      }
    }
  }
</script>


<style>
</style>
