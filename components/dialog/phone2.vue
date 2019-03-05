<template>
  <div class="phone-dialog-comp">
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
        <p class="title fs-12">{{item.desc}}</p>
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
          {title: '中国客服电话', number: '400-118-1388', desc: '(8:00am - 11:00pm) EN\\CN', phone: '400-118-1388'},
          {title: '美国客服电话', number: '(001)888-933-0336', desc: '(9:00am - 6:00pm) EN\\CN', phone: '001-888-933-0336'},
        ]
      }
    },
    computed: {
    },
    mounted() {
      // console.log(111, this.show)
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
        flex: 0 0 80px;
        .phone-icon {
          font-size: 70px;
          color: #707070;
        }
      }
      .right {
        flex: 0 0 1;
        margin-left: 15px;
        text-align: left;
        .title {
          font-size: 28px;
          color: #5a5a5a;
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
