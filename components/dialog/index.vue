<template>
  <van-popup v-model="isShow"
    :position="proPos"
    :overlay="true"
    class="normal-dialog-comp">
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
  import {mapState} from 'vuex'
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
      setDlgType(val) {
        console.log('val', val)
        this.$emit('callSetDlgType', val)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .normal-dialog-comp {
    width: 90%;
    border-radius: 12px;
    .dialog-content {
      text-align: center;
      padding: 50px 30px;
    }
  }
</style>