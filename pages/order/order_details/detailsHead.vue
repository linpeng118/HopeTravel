<template>
  <section>
    <div class="details-head">
      <div class="head-left">
        <p>{{details.status.name}}</p>
        <p>订单号：{{details.order_id}}</p>
        <p>下单时间：{{details.created.substr(0,10)}}</p>
      </div>
      <div class="head-right">
        <p>{{details.price}}</p>
      </div>
    </div>
  </section>
</template>

<script>
  export default {
    components: {},
    props: {},
    data() {
      return {
        details: {
          "order_id": 1111,
          "created": "2018-07-13 01:18:33",
          "status": {
            "code": 0,
            "name": "待支付"
          },
          "price": "$547.00",
          "ault_count": 1,
          "child_count": 0,
          "product_name": "(6天) 美东经济6日游：世界的中心纽约，美国首都华盛顿，更有雄伟壮观的尼亚加拉大瀑布！【纽约、费城、华盛顿特区、康宁、尼亚加拉大瀑布、波士顿、漩涡公园】",
          "product_id": 63,
          "product_departure_city": "波士顿",
          "product_departure_end_city": "波士顿",
          "product_departure_date": "2018-07-17",
          "product_end_date": "2018-07-23",
          "attribute": [
            {
              "product_option": "[西峡谷/南峡谷/羚羊彩穴]",
              "product_option_value": "南峡谷(团上必付$50/人)"
            },
            {
              "product_option": "南加主题项目任选一",
              "product_option_value": "好莱坞环球影城((团上必付门票$80/人, 含环球影城门票)"
            }
          ],
          "contact_email": "1075173644@qq.com",
          "contact_country": "中国",
          "contact_phone": "86-18224351926",
          "contact_name": "li zeng",
          "guest_name": [
            {
              "name": "li zeng",
              "email": "1075173644@qq.com",
              "phone": "104"
            }
          ],
          "detailed": [
            {
              "title": "Sub-Total:",
              "value": "880.97"
            },
            {
              "title": "积分:",
              "value": "-1.20"
            },
            {
              "title": "优惠券编号 HTS84:",
              "value": "-143.36"
            },
            {
              "title": "Total:",
              "value": "736.41"
            }
          ]
        }
      }
    },
    computed: {},
    methods: {},
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
    color: #FF5454;
    font-weight: bold;
    line-height: 60px;
    font-size: 32px;
  }

  .head-left p:nth-child(1) {
    color: #3E3E3E;
    line-height: 60px;
    font-size: 32px;
    font-weight: bold;
  }

  .head-left p:nth-child(2) {
    color: #399EF6;
    line-height: 50px;
    font-size: 22px;
  }

  .head-left p:nth-child(3) {
    color: #989898;
    line-height: 50px;
    font-size: 22px;
  }


</style>
