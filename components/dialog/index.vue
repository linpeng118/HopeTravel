<template>
  <van-popup v-model="isShow"
    :position="proPos"
    :overlay="true"
    class="normal-dialog-comp">
    <div class="btn-close" @click="close">
      <van-icon name="cross" />
    </div>
    <div class="dialog-content">
      <component :is="currComp"
        showRegistTip
        showLoginTip
        @showLoginDlg="setDlgType"
        @showRegistDlg="setDlgType"></component>
    </div>
  </van-popup>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import NormalComp from './normal'
  import LoginComp from '@/components/partcail/login/login'
  import RegistComp from '@/components/partcail/login/regist'
  import {DLG_TYPE} from '@/assets/js/consts/dialog'

  export default {
    components: {
      NormalComp,
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
      }
    },
    mounted() {},
    methods: {
      ...mapMutations({
        vxToggleDialog: 'toggleDialog'
      }),
      setDlgType(val) {
        console.log('val', val)
        this.$emit('callSetDlgType', val)
      },
      // 关闭弹窗
      close(){
        this.vxToggleDialog(false)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .normal-dialog-comp {
    width: 90%;
    border-radius: 12px;
    .btn-close {
      position: absolute;
      right: 10px;
      top: 10px;
      color: #D8D8D8;
    }
    .dialog-content {
      text-align: center;
      padding: 50px 30px;
    }
  }
</style>