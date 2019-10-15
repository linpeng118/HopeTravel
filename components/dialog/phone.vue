<template>
  <div class="phone-dialog-comp">
    <h2 class="name">客服电话</h2>
    <div class="close" @click="closeTel">
      <img src="../../assets/imgs/home/icon_close.png" alt="">
    </div>
    <div class="phonebox">
      <div class="phone-item"
           v-for="item in phoneList"
           :key="item.phone"
           @click="onPhone(item)">
        <div class="left" @click="closeTel">
          <img :src="item.image_url" alt="">
        </div>
        <div class="right">
          <p class="title">{{item.title}}</p>
          <p class="time">{{item.remark}}</p>
          <p class="number" v-if="item.phone">{{item.tel_code?item.tel_code+'-':''}}{{item.phone}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getPhone} from '@/api/index'
  import {mapMutations} from 'vuex';
  import {DLG_TYPE} from '@/assets/js/consts/dialog'
  export default {
    name: 'normal',
    props: {
      proIsShow: {
        type: Boolean,
        default: false,
      }
    },
    data() {
      return {
        show: this.proIsShow,
        phoneList: [
        ]
      }
    },
    computed: {
    },
    mounted() {
      this.getphonelist()
    },
    methods: {
      ...mapMutations({
        vxToggleDialog: 'toggleDialog', // 是否显示弹窗
        vxSetDlgType: 'setDlgType', // 设置弹窗类型
      }),
      onPhone(item) {
        window.location.href = `tel:${item.tel_code}${item.phone} `
      },
      async getphonelist() {
        let {data,code} = await getPhone()
        if (code === 0) {
          this.phoneList = data.items||[];
        } else {
          this.$toast(data.msg)
        }
      },
      closeTel(){
        this.vxToggleDialog(false)
        this.vxSetDlgType(DLG_TYPE.NORMAL)
      }
    },
  }
</script>

<style lang="scss" scoped>
  .elseitem{
    font-size: 24px;
    padding: 30px 0;
  }
  .phonebox{
    width: 100%;
    margin-top: 64px;
  }
  .phone-dialog-comp {
    margin: 0 auto;
    width: 646px;
    background: transparent;
    text-align: left;
    padding:34px;
    position: relative;
    .close{
      position: absolute;
      width: 60px;
      height: 60px;
      right: 20px;
      top: 20px;
      img{
        width: 100%;
        height: 100%;
      }
    }
    h2.name{
      color: #2D2D2D;
      font-size:32px;
    }
    .phone-item {
      display: flex;
      display: -webkit-flex;
      margin-bottom: 40px;
      .left {
        flex: 0 0 60px;
        img{
          width: 36px;
          height: 36px;
          vertical-align: top;
        }
      }
      .right {
        flex: 0 0 1;
        margin-left: 15px;
        text-align: left;
        .title {
          font-size: 28px;
          color: #2D2D2D;
          height: 40px;
          line-height: 28px;
        }
        .time {
          font-size: 24px;
          color: #707070;
          line-height: 24px;
          margin-bottom: 16px;
        }
        .number {
          font-size: 32px;
          font-weight: bold;
          color: #00ABF9;
          margin-top: 8px;
        }
      }
    }
  }
</style>
