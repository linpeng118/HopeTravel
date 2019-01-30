<template>
  <div class="phone-dialog-comp">
    <div class="phone-item"
      v-for="item in phoneList"
      :key="item.phone"
      @click="onPhone(item)">
      <div class="left">
        <img :src="item.icon"
          alt="phone">
      </div>
      <div class="right">
        <p class="title">{{item.title}}</p>
        <p class="number">{{item.number}}</p>
      </div>
    </div>
  </div>
</template>

<script>
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
          {icon: require('~/assets/imgs/product/phone@2x.png'), title: '中国客服电话', number: '（0086）400-118-1388', phone: '0086-400-118-1388'},
          {icon: require('~/assets/imgs/product/phone@2x.png'), title: '美国客服电话', number: '（001）888-933-0336', phone: '001-888-933-0336'},
          {icon: require('~/assets/imgs/product/phone@2x.png'), title: '日本客服电话', number: '（0081）3-5545-5311', phone: '0081-3-5545-5311'},
        ]
      }
    },
    computed: {
    },
    mounted() {
      console.log(111, this.show)
    },
    methods: {
      onPhone(item) {
        window.location.href = `tel:${item.phone}`
      }
    },
  }
</script>

<style lang="scss" scoped>
  .phone-dialog-comp {
    margin: 0 auto;
    background: transparent;
    .phone-item {
      display: flex;
      align-items: center;
      justify-content: center;
      height: 140px;
      &:not(:last-child) {
        border-bottom: 2px solid #b1b1b1;
      }
      .left {
        flex: 0 0 80px;
        img {
          width: 60px;
          height: 60px;
        }
      }
      .right {
        flex: 0 0 1;
        text-align: left;
        .title {
          padding: 0 20px;
          font-size: 28px;
          font-weight: 300;
          line-height: 34px;
          color: #5e5e5e;
        }
        .number {
          margin-top: 20px;
          font-size: 26px;
          font-weight: 300;
          line-height: 34px;
          color: #191919;
        }
      }
    }
  }
</style>