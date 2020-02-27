<!--订单和行程的页脚组件-->
<template>
  <section>
    <div class="paylist">
      <p class="paytitle">
        {{$t('costDetail')}}
        <van-icon @click="closepops()"
          name="cross" />
      </p>
      <ul>
        <!-- 基础团费 -->
        <!-- 按房间计算 -->
        <li class="paysection"
          v-if="payData.rooms.length !== 0">
          <p class="payitem"
            v-if="payData.base_price">
            <span>{{$t('confirmFootComp.basicTourFee')}}:</span>
            <span>{{payData.base_price}}</span>
          </p>
          <template v-for="(item,index) in payData.rooms">
            <div class="payitem3"
              :key="index">
              <div class="yellow-color mt-10">房间{{index+1}}</div>
              <p class="small-bold mt-10">{{item.adult}}成人x{{item.adult_price}}</p>
              <p class="small-bold mt-10"
                v-if="item.kids">{{item.kids}}儿童x{{item.kids_price}}</p>
            </div>
          </template>

        </li>
        <!-- 按人数计算 -->
        <li class="paysection"
          v-else>
          <p class="payitem"
            v-if="payData.base_price">
            <span>{{$t('confirmFootComp.basicTourFee')}}:</span>
            <span>{{payData.base_price}}</span>
          </p>
          <p class="payitem2">
            <span>{{payData.adult}}{{$t('adult')}}x{{payData.adult_price}}</span>

          </p>
          <p class="payitem2"
            v-if="payData.child!=0">
            <span>{{payData.child}}{{$t('child')}}x{{payData.kids_price}}</span>

          </p>
        </li>
        <li class="paysection"
          v-if="payData.dfc.price">
          <p class="payitem">
            <span>{{payData.dfc.name}}</span>
            <span>
              {{payData.dfc.price}}</span>
          </p>
        </li>
        <!-- 行程费用 -->

        <li class="paysection"
          v-if="payData.attributes_selected">
          <p class="payitem">
            <span>{{$t('confirmFootComp.travelCost')}}:</span>
            <span>{{payData.attributes_selected.total_price}}</span>
          </p>
          <template v-if="payData.attributes_selected.items&&payData.attributes_selected.items.length">
            <div class="payitem3"
              v-for="(item,ind2) in payData.attributes_selected.items"
              :key="ind2">
              <div class="yellow-color mt-10">{{item.name}}</div>
              <template v-if="payData.rooms.length !== 0">
                <div class="mt-10"
                  v-for="(service,index) in payData.rooms"
                  :key="index+2">
                  <p class="mt-10 small-bold">{{service.adult}}{{$t('productDetailPage.n_adult')}}x{{service.add_value_service_detail[item.id].adult_price}}</p>
                  <p class="mt-10 small-bold"
                    v-if="service.kids">{{service.kids}}{{$t('productDetailPage.n_children')}}x{{service.add_value_service_detail[item.id].kids_price}}</p>
                </div>
              </template>
              <div class="mt-10"
                v-else>
                <p class="mt-10 small-bold">{{item.adult}}{{$t('productDetailPage.n_adult')}}x{{item.adult_price}}</p>
                <p class="mt-10 small-bold"
                  v-if="item.kids">{{item.kids}}{{$t('productDetailPage.n_children')}}x{{item.kids_price}}</p>
              </div>
            </div>
          </template>
        </li>

        <li class="paysection"
          v-if="payData.discount">
          <p class="payitem">
            <span>{{$t('confirmFootComp.discount')}}:</span>
            <span :style="'color:#aaa;'">-{{payData.discount}}</span>
          </p>
          <p class="payitem2"
            v-if="payData.points&&showmili=='1'">
            <span>{{$t('confirmFootComp.riceGrains')}}</span>
            <span style=";color:#aaa;"><i :style="'color:#aaa'">-</i>
              {{payData.points.discount}}</span>
          </p>
          <p class="payitem2"
            v-if="payData.agent.discount && payData.agent.discount!='' && payData.agent.discount.substring(1) > 0">
            <span>{{$t('confirmFootComp.unionSave')}}</span>
            <span><i :style="'color:#aaa'">-</i>
              {{payData.agent.discount}}</span>
          </p>

          <p class="payitem2"
            v-if="payData.coupons">
            <span>{{$t('coupons')}}</span>
            <span style=";color:#aaa;"><i :style="'color:#aaa'">-</i>
              {{payData.coupons.save}}</span>
          </p>
        </li>

      </ul>
      <p class="payall">
        <span>{{$t('confirmFootComp.priceTotal')}}</span>
        <span>{{payData.total_price}}</span>
      </p>

    </div>
  </section>
</template>

<script>
  export default {
    props: {
      payData: Object,
      showmili: String,
    },

    data() {
      return {}
    },
    watch: {},
    created() {},
    mounted() {
      console.log(1111, this.payData)
    },
    methods: {
      closepops() {
        this.$emit('closepops', 'false')
      },
    },
  }
</script>

<style scoped>
  .paylist {
    width: 750px;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    overflow: hidden;
    border-radius: 24px 24px 0px 0px;
    padding-bottom: 40px;
  }

  .paytitle {
    font-size: 36px;
    color: #191919;
    height: 106px;
    line-height: 106px;
    padding: 0 32px;
    border-bottom: 2px solid #e4e4e4;
    font-weight: bold;
    text-align: left;
  }

  .paytitle i {
    line-height: 106px;
    float: right;
  }

  .payall {
    width: 750px;
    padding: 0 32px;
    box-sizing: border-box;
    height: 94px;
    margin-bottom: 120px;
    border-top: 2px solid #e4e4e4;
  }

  .payall span:nth-child(1) {
    color: #a1a1a1;
    font-size: 24px;
    display: inline-block;
    float: left;
    line-height: 94px;
  }

  .payall span:nth-child(2) {
    color: #ff5454;
    display: inline-block;
    line-height: 94px;
    float: right;
    font-size: 32px;
  }

  .paysection {
    padding: 10px 0;
    border-top: 2px solid #e4e4e4;
  }

  .payitem {
    width: 750px;
    padding: 0 32px;
    box-sizing: border-box;
    height: 78px;
    font-weight: bold;
  }

  .payitem span:nth-child(1) {
    color: #191919;
    font-size: 28px;
    display: inline-block;
    float: left;
    line-height: 78px;
    width: 450px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .payitem span:nth-child(2) {
    color: #fb605d;
    display: inline-block;
    line-height: 78px;
    float: right;
    font-size: 28px;
  }

  .payitem2 {
    width: 750px;
    height: 60px;
    padding: 0 32px;
    box-sizing: border-box;
  }
  .payitem3 {
    width: 750px;
    padding: 0 32px;
    box-sizing: border-box;
    font-size: 25px;
    font-weight: 600;
  }
  .yellow-color {
    color: rgba(255, 203, 60, 1);
    font-weight: normal;
  }
  .small-bold {
    font-size: 24px;
    font-weight: 400;
    color: rgba(61, 61, 61, 1);
  }
  .payitem2 span:nth-child(1) {
    font-size: 28px;
    display: inline-block;
    float: left;
    line-height: 40px;
    color: rgba(61, 61, 61, 1);
    width: 450px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .payitem2 span:nth-child(2) {
    color: #303030;
    font-size: 28px;
    display: inline-block;
    line-height: 60px;
    float: right;
  }
</style>
