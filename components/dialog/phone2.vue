<template>
  <div class="phone-dialog-comp">
    <div class="phonebox">
      <div class="phone-item"
           v-for="item in phoneList"
           :key="item.phone"
           @click="onPhone(item)">
        <div class="left">
          <van-icon name="phone-circle-o"
                    class="phone-icon" />
        </div>
        <div class="right">
          <p class="title">{{item.title}}</p>
          <p class="title fs-12">{{item.remark}}</p>
          <p class="number" v-if="item.phone">{{item.tel_code?item.tel_code+'-':''}}{{item.phone}}</p>
        </div>
      </div>
    </div>

    <div class="elseitem">说明：拨打您所在区域无需拨添加区号</div>
  </div>
</template>

<script>
  import {getPhone} from '@/api/index'
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
          {title: this.$t('customerPhoneZH'), number: '400-118-1388', desc: '(8:00am - 11:00pm) EN\\CN', phone: '400-118-1388'},
          {title: this.$t('customerPhoneEN'), number: '(001)832-886-1525', desc: '(7 * 24 Hours) EN\\CN   ', phone: '001-832-886-1525  '},
        ]
      }
    },
    computed: {
    },
    mounted() {
      this.getphonelist()
      // console.log(111, this.show)
    },
    methods: {
      onPhone(item) {
        window.location.href = `tel:${item.tel_code} ${item.phone}`
      },
      async getphonelist() {
    let {data,code} = await getPhone()
    if (code === 0) {
      this.phoneList=data.items||[];
    } else {
      this.$toast(data.msg)
    }
  },
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
    max-height: 860px;
    overflow-y: scroll;
  }
  .phone-dialog-comp {
    margin: 0 auto;
    width: 500px;
    background: transparent;
    .phone-item {
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      justify-content: center;
      -webkit-justify-content: center;
      height: 170px;
      &:not(:last-child) {
        border-bottom: 1px solid #9a9a9a;
      }
      .left {
        width: 150px;
        flex: 0 0 60px;
        .phone-icon {
          font-size: 70px;
          color: #707070;
        }
      }
      .right {
        width: 340px;
        flex: 0 0 1;
        margin-left: 15px;
        text-align: left;
        .title {
          font-size: 28px;
          color: #5a5a5a;
          width: 360px;
        }
        .fs-12{
          font-size: 20px!important;
        }
        .number {
          font-size: 28px;
          font-weight: bold;
          color: #000;
        }
      }
    }
  }
</style>
