<template>
  <div>
    <nuxt />
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

  export default {
    components: {
      GlobalDialog
    },
    data() {
      return {}
    },
    computed: {
      ...mapState({
        vxShowDlg: state => state.isShowDlg,
        vxDlgType: state => state.dlgType
      })
    },
    methods: {
      ...mapMutations({
        vxToggleDialog: 'toggleDialog',
        vxSetDlgType: 'setDlgType',
      }),
      toggleDialog(val) {
        this.vxToggleDialog(val)
      },
      setDlgType(val) {
        console.log(111, val)
        this.vxSetDlgType(val)
      }
    }
  }
</script>


<style>
</style>
