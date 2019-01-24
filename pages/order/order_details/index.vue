<template>
  <section>
    <van-nav-bar class="login-header tours-no-bb" ref="loginHeader" title="订单详情" :z-index="999" @click-left="onClickLeft">
        <van-icon class="left-wrap" name="arrow-left" slot="left" />
    </van-nav-bar>
<<<<<<< HEAD
    <details-head></details-head>
    <section class="section0">

      <section>
        <div class="confirm-item">
          <p class="item-con" >
            <span style="width: 80%" v-html="details.product_name.length>45?details.product_name.substr(0,40)+'...':details.product_name"></span>
            <span style="width: 10%"></span>
            <van-icon color="#404040" name="arrow" size="1.2em"/>
          </p>
          <p class="item-conx" >
            <span>
              <i>{{details.product_departure_date}}</i>
              <i>{{details.product_departure_city}}</i>
            </span>
            <span>
              <i>{{details.ault_count}}成人</i>
              <i class="hr"></i>
              <i>{{details.created.substr(0,10)}}预定</i>
            </span>
            <span>
              <i>{{details.product_end_date}}</i>
              <i>{{details.product_departure_end_city}}</i>
            </span>
          </p>
        </div>
      </section>
      <section>
        <div class="confirm-item" v-if="details.attribute">
          <p class="item-title">行程选项信息</p>
          <template v-for="(item,index) in details.attribute">
            <div :key="index">
              <p class="item-tip">{{item.product_option}}</p>
              <p class="item-con" >
                <span>{{item.product_option_value}}</span>
              </p>
            </div>
          </template>


        </div>
      </section>
      <section>
        <div class="confirm-item" v-if="details.guest_name">
          <p class="item-title">出行人信息</p>
          <template v-for="(item,index) in details.guest_name">
            <div :key="index" class="item-contanct">
              <div>{{index+1}}.{{item.name}}</div>
              <div>
                <p>{{'暂无'}}</p>
                <p>{{item.email||'暂无'}}</p>
                <p>{{item.phone||'暂无'}}</p>
              </div>
            </div>
          </template>


        </div>
      </section>
      <section>
        <div class="confirm-item" >
          <p class="item-title">联系人信息</p>
            <div class="item-contanct2">
              <div>联系人</div>
              <div>
                <p>{{details.contact_name}}</p>
                <p>{{details.contact_phone}}</p>
                <p>{{details.contact_email}}</p>
              </div>
            </div>
        </div>
      </section>
      <section style="text-align: center;width: 100%">
        <button class="pay-btn">去支付</button>
      </section>
=======
    <details-head>
    </details-head>
    <section class="section0">

>>>>>>> develop
    </section>
  </section>


</template>

<script>


  import detailsHead from './detailsHead.vue'
  export default {
    components: {
      detailsHead
    },
    data() {
      return {
<<<<<<< HEAD
        details:{
          "order_id":1111,
          "created":"2018-07-13 01:18:33",
          "status":{
            "code":0,
            "name":"待支付"
          },
          "price":"$547.00",
          "ault_count":1,
          "child_count":0,
          "product_name":"(6天) 美东经济6日游：世界的中心纽约，美国首都华盛顿，更有雄伟壮观的尼亚加拉大瀑布！【纽约、费城、华盛顿特区、康宁、尼亚加拉大瀑布、波士顿、漩涡公园】",
          "product_id":63,
          "product_departure_city":"波士顿",
          "product_departure_end_city":"波士顿",
          "product_departure_date":"2018-07-17",
          "product_end_date":"2018-07-23",
          "attribute":[
            {
              "product_option":"[西峡谷/南峡谷/羚羊彩穴]",
              "product_option_value":"南峡谷(团上必付$50/人)"
            },
            {
              "product_option":"南加主题项目任选一",
              "product_option_value":"好莱坞环球影城((团上必付门票$80/人, 含环球影城门票)"
            }
          ],
          "contact_email":"1075173644@qq.com",
          "contact_country":"中国",
          "contact_phone":"86-18224351926",
          "contact_name":"li zeng",
          "guest_name":[
            {
              "name":"li zeng",
              "email":"1075173644@qq.com",
              "phone":"104"
            },
          ],
          "detailed":[
            {
              "title":"Sub-Total:",
              "value":"880.97"
            },
            {
              "title":"积分:",
              "value":"-1.20"
            },
            {
              "title":"优惠券编号 HTS84:",
              "value":"-143.36"
            },
            {
              "title":"Total:",
              "value":"736.41"
            }
          ]
        }
=======

>>>>>>> develop
      }
    },
    computed: {

    },
    watch:{

    },
    created(){

    },
    mounted() {
    },
    methods: {

      onClickLeft(){
        this.$router.go(-1)
      },

    }
  }

</script>

<style lang="scss" scoped>

  .section0 {
    background-color: #f3f3f3;
    width: 750px;
    box-sizing: border-box;
<<<<<<< HEAD
    padding: 20px 32px 50px 32px;
=======
    padding: 20px 32px 200px 32px;
>>>>>>> develop
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
<<<<<<< HEAD
    font-weight: bold;
    box-sizing: border-box;
    color: rgba(19, 19, 19, 1);
=======
    box-sizing: border-box;
    color: rgba(19, 19, 19, 1);
    font-weight: bold;
>>>>>>> develop
    font-size: 24px;
    border-bottom: 2px solid #DEDEDE;
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
<<<<<<< HEAD
    padding-top: 10px;
=======
>>>>>>> develop
    color: rgba(19, 19, 19, 1);
  }

  .item-con span:nth-child(2) {
    width: 150px;
    font-size: 24px;
    display: inline-block;
    color: #FF9100;
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
    border-bottom: 1px solid #DEDEDE;
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
    color: #9F9F9F;
    font-size: 24px;
    font-style: normal;
    padding-left: 20px;
  }

  .user-item span:nth-child(2) {
    width: 80px;
    height: 80px;
    line-height: 80px;
    float: right;
    color: #399EF6;
  }
  .user-item>span:nth-child(2)  {
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
    margin: 28px 0;
    border-radius: 8px;

  }

  .btnbox {
    text-align: center;
  }
<<<<<<< HEAD

=======
>>>>>>> develop
  .radioitem{
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
<<<<<<< HEAD

=======
>>>>>>> develop
  .radiobox{
    max-height: 800px;
    overflow-y: scroll;

  }
<<<<<<< HEAD

=======
>>>>>>> develop
  .login-header {
    height: 88px;
    font-size: 32px;
    color: #191919;
    background-color: #fff;
    border-bottom:1px solid rgb(238, 238, 238);
    transition: all 0.5s;
    .left-wrap {
      color: #404040;
      font-size: 32px;
    }
    .right-wrap {
      .search {
        width:92px;
        height:36px;
        background:rgba(57,158,246,1);
        opacity:1;
        color: #fff;
        border-radius:18px;
      }
    }
  }

<<<<<<< HEAD
  .item-conx  {
    width: 100%;
    padding: 0 20px;
    height: 140px;
    display: inline-block;
  }

  .item-conx span{
    width: 33%;
    float: left;
    height: 140px;
    font-size: 22px;
    color: #989898;
    padding-top: 20px;
  }
  .item-conx span>i{
    display: inline-block;
    font-style: normal;
    text-align: center;
    width: 100%;
  }
  .item-conx>span:nth-child(1){
    margin-top: 30px;
    padding-right: 50px;
  }
  .item-conx>span:nth-child(3){
    padding-left: 50px;
    margin-top: 30px;
  }
  .item-conx>span:nth-child(1)>i:nth-child(1),.item-conx>span:nth-child(3)>i:nth-child(1){
    color: #191919;
    font-size: 24px;
    font-weight: bold;
  }
  .hr{
    width: 100%;
    border-bottom:1px solid #707070;
  }
  .item-contanct{
    width: 100%;
    height: 150px;
    background-color: #fff;
    border-bottom:1px solid #DEDEDE ;
    padding: 24px;
  }
  .item-contanct div{
    float: left;
    height: 150px;
  }
  .item-contanct div:nth-child(1){
    width: 20%;
    font-size: 24px;
    color: #191919;
  }
  .item-contanct div:nth-child(2){
    width: 60%;
    font-size: 24px;
    line-height: 40px;
    color: #989898;
  }
  .item-contanct2{
    width: 100%;
    height: 150px;
    background-color: #fff;
    border-bottom:1px solid #DEDEDE ;
    padding: 24px;
  }
  .item-contanct2 div{
    float: left;
    height: 150px;
  }
  .item-contanct2 div:nth-child(1){
    width: 20%;
    font-size: 24px;
    color: #989898;
  }
  .item-contanct2 div:nth-child(2){
    width: 60%;
    font-size: 24px;
    line-height: 40px;
    color: #191919;

  }
  .pay-btn{
    width:464px;
    height:80px;
    background:rgba(57,158,246,1);
    box-shadow:0px 0px 12px rgba(0,0,0,0.1);
    opacity:1;
    border-radius:8px;
    color: #fff;
    line-height: 80px;
    font-size: 32px;
  }

=======
>>>>>>> develop
</style>
