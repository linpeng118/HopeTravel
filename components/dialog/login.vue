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
      <LoginComp :loginTitle="$t('partcailComp.subscribeLogin')"
                 :regTitle="$t('partcailComp.subscribeLogin')"
                 isDialog
                 showRegistTip
                 showLoginTip />
    </div>
  </van-popup>
</template>

<script>
import {mapMutations} from 'vuex'
import LoginComp from '@/components/partcail/login/login'
import {getLocalStore, setLocalStore} from '@/assets/js/utils'

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
      vxToggleLoginDlg: 'login/toggleDialog',
    }),
    // 关闭弹窗
    closeDlg() {
      this.vxToggleLoginDlg(false)
    },
  },
}
</script>
<style>
.van-overlay {
  /* z-index: 4000 !important; */
}
</style>
<style lang="scss" scoped>
.login-dialog-comp {
  width: auto;
  // z-index: 4000 !important;
  left: 48px;
  right: 48px;
  bottom: 0;
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
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
