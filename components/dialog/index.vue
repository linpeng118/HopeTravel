<template>
  <van-popup v-model="isShow"
    :position="proPos"
    :overlay="true"
    class="normal-dialog-comp">
    <!-- <div class="btn-close"
      @click="closeDlg"
      v-show="isShowClose">
      <van-icon name="cross" />
    </div> -->
    <div class="dialog-content">
      <component :is="currComp" />
    </div>
  </van-popup>
</template>

<script>
  import {mapState, mapMutations} from 'vuex'
  import NormalComp from './normal'
  import PhoneComp from './phone'
  import PhoneCustom from './phone2'
  import LoginComp from '@/components/partcail/login/login'
  import RegistComp from '@/components/partcail/login/regist'
  import {DLG_TYPE} from '@/assets/js/consts/dialog'
  import {getLocalStore, setLocalStore} from '@/assets/js/utils'

  export default {
    components: {
      NormalComp,
      PhoneComp,
      LoginComp,
      RegistComp,
      PhoneCustom
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
    },
    methods: {
      ...mapMutations({
        vxToggleDialog: 'toggleDialog'
      }),
      setDlgType(val) {
        // console.log('val', val)
        this.$emit('callSetDlgType', val)
      },
      // 关闭弹窗
      // 此方法已被遗弃 20191114
      closeDlg() {
        this.vxToggleDialog(false)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .normal-dialog-comp {
    border-radius: 12px;
    width: 646px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
