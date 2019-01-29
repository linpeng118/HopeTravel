<template>
  <!---->
  <section>
    <van-nav-bar class="login-header tours-no-bb"
                 ref="loginHeader"
                 title="我的订单"
                 :z-index="999"
                 @click-left="onClickLeft">
      <van-icon class="left-wrap" name="arrow-left" slot="left"/>
    </van-nav-bar>
    <section>
      <ul class="nav-item-box">
        <li class="nav-item" :class="status==''?'active-item':''" @click="status=''">全部订单</li>
        <li class="nav-item" :class="status=='unpaid'?'active-item':''" @click="status='unpaid'">待付款</li>
        <li class="nav-item" :class="status=='wait'?'active-item':''" @click="status='wait'">待出行</li>
        <li class="nav-item" :class="status=='finish'?'active-item':''" @click="status='finish'">已出行</li>
      </ul>
    </section>
   

  </section>
</template>

<script>
  import orderList from './orderList';
  import {getorderlist} from '@/api/order'

  export default {
    components: {
      orderList
    },
    data() {
      return {
        status: '',//unpaid 待付款 wait未出行 finish已出行
        listx:[],
      }
    },
    computed: {},
    watch: {},
    created() {
    },
    mounted() {
    },
    methods: {
      async getorderlist(){
        let {data, code} = await getorderlist(this.status)
        if(code === 0) {
          this.listx = data;
        }
      }
      ,
      onClickLeft() {
        this.$router.go(-1)
      },


    }
  }

</script>

<style lang="scss" scoped>
  .login-header {
    height: 88px;
    font-size: 32px;
    color: #191919;
    background-color: #fff;
    border-bottom: 1px solid rgb(238, 238, 238);
    transition: all 0.5s;

    .left-wrap {
      color: #404040;
      font-size: 32px;
    }

    .right-wrap {
      .search {
        width: 92px;
        height: 36px;
        background: rgba(57, 158, 246, 1);
        opacity: 1;
        color: #fff;
        border-radius: 18px;
      }
    }
  }

  .nav-item {
    font-size: 26px;
    color: #191919;
    text-align: center;
    height: 88px;
    width: 25%;
    float: left;
    line-height: 88px;
    box-sizing: border-box;
  }

  .nav-item-box {
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.15);
    width: 100%;
    height: 88px;
  }

  .setbg {
    background-color: #f1f1f1;
  }

  .active-item {
    color: #399EF6 !important;
  }
</style>
