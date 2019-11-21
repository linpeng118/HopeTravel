<template>
  <van-popup v-model="isShow"
    class="login-dialog-comp"
    :overlay="true"
    :style="{width: '86%'}">
    <div class="btn-close"
      @click="closeDlg">
      <van-icon name="cross" />
    </div>
    <div class="dialog-content">
      <login-page-comp isDialog
        showRegistTip
        showLoginTip />
    </div>
  </van-popup>
</template>

<script>
  import {mapMutations} from 'vuex'
  import LoginPageComp from '@/components/partcail/login'
  import {getLocalStore, setLocalStore} from '@/assets/js/utils'

  export default {
    components: {
      LoginPageComp,
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
        }
      },
    },
    methods: {
      ...mapMutations({
        vxToggleLoginDlg: 'login/toggleDialog'
      }),
      // 关闭弹窗
      closeDlg() {
        this.vxToggleLoginDlg(false)
      },
    },
  }
</script>
<style>
  .login-dialog-comp+.van-overlay{
    z-index: 1999!important;
  }
</style>
<style lang="scss" scoped>
  .login-dialog-comp {
    z-index: 2000!important;
    border-radius: 12px;
    .btn-close {
      position: absolute;
      top: 0;
      right: 10px;
      padding: 8px;
      color: #d8d8d8;
      .van-icon {
        font-size: 36px;
      }
    }
    .dialog-content {
      padding: 110px 60px;
      text-align: center;
    }
  }
</style>
