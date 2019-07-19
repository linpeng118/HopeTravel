<template>
  <section>
    <van-nav-bar class="login-header tours-no-bb"
      ref="loginHeader"
      :title="$t('orderDetailPage.title')"
      :z-index="999"
      @click-left="onClickLeft">
      <van-icon class="left-wrap"
        name="arrow-left"
        slot="left" />
    </van-nav-bar>
    <div class="details-head">
      <div class="head-left">
        <p>{{orderInfo.status.name}}</p>
        <p>{{$t('orderDetailPage.orderId')}}：{{orderInfo.order_id}}</p>
        <p>{{$t('orderDetailPage.orderTime')}}：{{orderInfo.created.substr(0,10)}}</p>
      </div>
      <div class="head-right">
        <p>{{orderInfo.price}}</p>
      </div>
    </div>
    <section class="section0">
      <section>
        <div class="confirm-item">
          <p class="item-con">
            <span style="width: 80%"
              v-html="orderInfo.product_name.length>45?orderInfo.product_name.substr(0,40)+'...':orderInfo.product_name"></span>
            <span style="width: 10%"></span>
            <van-icon color="#404040"
              name="arrow"
              size="1.2em" />
          </p>
          <p class="item-conx">
            <span>
              <i>{{orderInfo.product_departure_date}}</i>
              <i>{{orderInfo.product_departure_city}}</i>
            </span>
            <span>
              <i>{{orderInfo.ault_count}}{{$t('adult')}}</i>
              <i class="hr"></i>
              <i>{{orderInfo.created.substr(0,10)}}{{$t('reserve')}}</i>
            </span>
            <span>
              <i>{{orderInfo.product_end_date}}</i>
              <i>{{orderInfo.product_departure_end_city}}</i>
            </span>
          </p>
        </div>
      </section>
      <section>
        <div class="confirm-item"
          v-if="orderInfo.attribute">
          <p class="item-title">{{$t('orderDetailPage.tripInfo')}}</p>
          <template v-for="(item,index) in orderInfo.attribute">
            <div :key="index">
              <p class="item-tip">{{item.product_option}}</p>
              <p class="item-con">
                <span>{{item.product_option_value}}</span>
              </p>
            </div>
          </template>
        </div>
      </section>
      <section>
        <div class="confirm-item"
          v-if="orderInfo.guest_name">
          <p class="item-title">{{$t('orderDetailPage.travlerInfo')}}</p>
          <template v-for="(item,index) in orderInfo.guest_name">
            <div :key="index"
              class="item-contanct">
              <div>{{index+1}}.{{item.name}}</div>
              <div>
                <p>{{$t('notHave')}}</p>
                <p>{{item.email|| $t('notHave')}}</p>
                <p>{{item.phone|| $t('notHave')}}</p>
              </div>
            </div>
          </template>
        </div>
      </section>
      <section>
        <div class="confirm-item">
          <p class="item-title">{{$t('contactInfo')}}</p>
          <div class="item-contanct2">
            <div>{{$t('orderDetailPage.contact')}}</div>
            <div>
              <p>{{orderInfo.contact_name}}</p>
              <p>{{orderInfo.contact_phone}}</p>
              <p>{{orderInfo.contact_email}}</p>
            </div>
          </div>
        </div>
      </section>
      <section v-show="orderInfo.status&&orderInfo.status.code==0"
        style="text-align: center;width: 100%">
        <button class="pay-btn"
          @click="btnPay">{{$t('orderDetailPage.goPay')}}</button>
      </section>
      <!-- 表单提交 -->
      <form style="display: none"
        :action="`${apiPath.payment}/payment/mobile/checkout`"
        method="post">
        <input type="text"
          name="order_id"
          value=""
          ref="orderId">
        <input type="text"
          name="order_title"
          value=""
          ref="orderTitle">
        <input type="text"
          name="total_fee[CNY]"
          value=""
          ref="totalFeeCNY">
        <input type="text"
          name="total_fee[USD]"
          value=""
          ref="totalFeeUSD">
        <input type="text"
          name="client_type"
          value="tourscool">
        <input type="text"
          name="jwt"
          value=""
          ref="jwt"
          readonly="">
        <input type="text"
          name="success_url"
          ref="successUrl">
        <input type="text"
          name="failure_url"
          ref="failureUrl">
        <input type="submit"
          ref="submitform">
      </form>
    </section>
  </section>

</template>

<script>
  import {
    getTouristsOrderDetail,
    getTokenByOrderId
  } from '@/api/order'
  import {getSessionStore} from '@/assets/js/utils'

  export default {
    data() {
      return {
        orderId: this.$route.query.order_id,
        apiPath: require('@/apiConf.env'),
        authCode: '',
        orderInfo: {
          "order_id": 0,
          "created": "",
          "status": {},
          "price": "",
          "ault_count": 0,
          "child_count": 0,
          "product_name": "",
          "product_id": 0,
          "product_departure_city": "",
          "product_departure_end_city": "",
          "product_departure_date": "",
          "product_end_date": "",
          "attribute": [],
          "contact_email": "",
          "contact_country": "",
          "contact_phone": "",
          "contact_name": "",
          "guest_name": [],
          "detailed": []
        },
      }
    },
    mounted() {
      this.authCode = JSON.parse(getSessionStore('searchOrderInfo')).auth_code
      this.getOrderData()
    },
    methods: {
      async getOrderData() {
        let {code, data, msg} = await getTouristsOrderDetail({
          order_id: this.orderId,
          auth_code: this.authCode,
        })
        if (code === 0) {
          this.orderInfo = data
        }
      },
      onClickLeft() {
        this.$router.go(-1)
      },
      // 去支付（先兑换token）
      async btnPay() {
        const {code, msg, data} = await getTokenByOrderId({
          auth_code: this.authCode,
          order_id: this.orderId,
        })
        if (code === 0) {
          // 构造数据
          let subData = {
            token: data.token,
            ...this.orderInfo
          }
          this.subData(subData)
        } else {
          console.Error(msg)
        }
      },
      // 支付跳转
      subData(val) {
        console.log(val);
        // 跳转链接
        let successUrl = `//${window.location.host}/order/search/detail?order_id=${val.order_id}`;
        let failureUrl = `//${window.location.host}/order/search/detail?order_id=${val.order_id}`;
        // token处理
        // token = token.replace('Bearer ', '');
        // 表单
        this.$refs.orderId.value = val.order_id;
        this.$refs.orderTitle.value = val.product_name;
        this.$refs.totalFeeCNY.value = Number(val.cny_price) * 100 || 0;
        this.$refs.totalFeeUSD.value = Number(val.usd_price) * 100 || 0;
        this.$refs.jwt.value = val.token;
        this.$refs.successUrl.value = successUrl
        this.$refs.failureUrl.value = failureUrl
        this.$refs.submitform.click();
      },
    }
  }

</script>

<style lang="scss" scoped>
  .details-head {
    width: 100%;
    height: 160px;
    background: rgba(255, 255, 255, 1);
  }

  .head-left {
    width: 60%;
    height: 160px;
    float: left;
    padding-left: 32px;
  }

  .head-right {
    width: 40%;
    height: 160px;
    float: right;
    text-align: right;
    padding-right: 32px;
  }

  .head-right p {
    color: #ff5454;
    font-weight: bold;
    line-height: 60px;
    font-size: 32px;
  }

  .head-left p:nth-child(1) {
    color: #3e3e3e;
    line-height: 60px;
    font-size: 32px;
    font-weight: bold;
  }

  .head-left p:nth-child(2) {
    color: #399ef6;
    line-height: 50px;
    font-size: 22px;
  }

  .head-left p:nth-child(3) {
    color: #989898;
    line-height: 50px;
    font-size: 22px;
  }

  .section0 {
    background-color: #f3f3f3;
    width: 750px;
    box-sizing: border-box;
    padding: 20px 32px 200px 32px;
  }

  .confirm-title p:nth-child(1) {
    padding-top: 10px;
    width: 100%;
    font-size: 24px;
    font-weight: 700;
    line-height: 32px;
    color: rgba(19, 19, 19, 1);
    opacity: 1;
  }

  .confirm-title p:nth-child(2) {
    width: 100%;
    font-size: 22px;
    line-height: 60px;
    color: rgba(168, 168, 168, 1);
    opacity: 1;
  }

  .confirm-item {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 8px;
    margin-bottom: 28px;
  }

  .item-title {
    width: 100%;
    padding: 0 24px;
    line-height: 70px;
    box-sizing: border-box;
    color: rgba(19, 19, 19, 1);
    font-weight: bold;
    font-size: 24px;
    border-bottom: 2px solid #dedede;
  }

  .item-con {
    width: 100%;
    box-sizing: border-box;
    padding: 20px 24px;
    font-size: 24px;
  }

  .item-con span:nth-child(1) {
    display: inline-block;
    width: 430px;
    font-size: 24px;
    color: rgba(19, 19, 19, 1);
  }

  .item-con span:nth-child(2) {
    width: 150px;
    font-size: 24px;
    display: inline-block;
    color: #ff9100;
    text-align: right;
  }

  .item-con i {
    top: 6px;
  }

  .item-tip {
    box-sizing: border-box;
    margin: 20px 24px 0 24px;
    padding-left: 20px;
    background: rgba(241, 241, 241, 1);
    opacity: 1;
    line-height: 48px;
    font-size: 22px;
    color: rgba(142, 142, 142, 1);
  }

  .user-item {
    border-bottom: 1px solid #dedede;
    margin: 0 24px;
  }

  .user-item span:nth-child(1) {
    width: 500px;
    height: 80px;
    line-height: 80px;
    font-size: 24px;
    color: #191919;
  }

  .user-item span:nth-child(1) i {
    color: #9f9f9f;
    font-size: 24px;
    font-style: normal;
    padding-left: 20px;
  }

  .user-item span:nth-child(2) {
    width: 80px;
    height: 80px;
    line-height: 80px;
    float: right;
    color: #399ef6;
  }

  .user-item > span:nth-child(2) {
    font-size: 48px;
    line-height: 250%;
  }

  .item-title > span {
    color: #989898;
    font-size: 20px;
    padding-left: 20px;
  }

  .changeuser-btn {
    width: 464px;
    height: 72px;
    background: rgba(57, 158, 246, 1);
    opacity: 1;
    line-height: 72px;
    font-size: 24px;
    color: #fff;
    margin: 28px 100px;
    border-radius: 8px;
  }

  .btnbox {
    text-align: center;
  }

  .radioitem {
    font-size: 24px;
    width: 500px;
    padding: 20px 24px;
  }

  .setvan {
    width: 120px;
    display: inline-block;
    border-right: 1px solid #dedede;
    text-align: center;
    margin-right: 12px;
  }

  .setvan i {
    top: 6px;
  }

  .seti {
    font-style: normal;
    display: inline-block;
    width: 100%;
  }

  .radiobox {
    max-height: 800px;
    overflow-y: scroll;
  }

  .login-header {
    height: 88px;
    font-size: 32px;
    color: #191919;
    background-color: #fff;
    border-bottom: 1px solid rgb(238, 238, 238);
    transition: all 0.5s;

    .left-wrap {
      /*color: #404040;*/
      /*font-size: 32px;*/
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

  .item-conx {
    width: 100%;
    padding: 0 20px;
    height: 140px;
    display: inline-block;
  }

  .item-conx span {
    width: 33%;
    float: left;
    height: 140px;
    font-size: 22px;
    color: #989898;
    padding-top: 20px;
  }

  .item-conx span > i {
    display: inline-block;
    font-style: normal;
    text-align: center;
    width: 100%;
  }

  .item-conx > span:nth-child(1) {
    margin-top: 30px;
    padding-right: 50px;
  }

  .item-conx > span:nth-child(3) {
    padding-left: 50px;
    margin-top: 30px;
  }

  .item-conx > span:nth-child(1) > i:nth-child(1),
  .item-conx > span:nth-child(3) > i:nth-child(1) {
    color: #191919;
    font-size: 24px;
    font-weight: bold;
  }

  .hr {
    width: 100%;
    border-bottom: 1px solid #707070;
  }

  .item-contanct {
    width: 100%;
    height: 150px;
    background-color: #fff;
    border-bottom: 1px solid #dedede;
    padding: 24px;
  }

  .item-contanct div {
    float: left;
    height: 150px;
  }

  .item-contanct div:nth-child(1) {
    width: 20%;
    font-size: 24px;
    color: #191919;
  }

  .item-contanct div:nth-child(2) {
    width: 60%;
    font-size: 24px;
    line-height: 40px;
    color: #989898;
  }

  .item-contanct2 {
    width: 100%;
    height: 150px;
    background-color: #fff;
    border-bottom: 1px solid #dedede;
    padding: 24px;
  }

  .item-contanct2 div {
    float: left;
    height: 150px;
  }

  .item-contanct2 div:nth-child(1) {
    width: 20%;
    font-size: 24px;
    color: #989898;
  }

  .item-contanct2 div:nth-child(2) {
    width: 60%;
    font-size: 24px;
    line-height: 40px;
    color: #191919;
  }

  .pay-btn {
    width: 464px;
    height: 80px;
    background: rgba(57, 158, 246, 1);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 8px;
    color: #fff;
    line-height: 80px;
    font-size: 32px;
  }
</style>
