<!--订单和行程的页脚组件-->
<template>
  <section>

    <div class="paylist">
      <p class="paytitle">
        {{$t('costDetail')}}
        <van-icon @click="closepops()" name="cross"/>
      </p>
      <ul>
        <li class="paysection">
          <p class="payitem" v-if="payData.base_price">
            <span>{{$t('confirmFootComp.basicTourFee')}}:</span>
            <span>{{payData.base_price}}</span>
          </p>
          <p class="payitem2" >
            <span>{{$t('adult')}}:</span>
            <span>{{payData.adult}} {{$t('person')}}</span>
          </p>
          <p class="payitem2" v-if="payData.child!=0">
            <span>{{$t('child')}}:</span>
            <span>{{payData.child}} {{$t('person')}}</span>
          </p>
        </li>
        <li class="paysection" v-if="payData.dfc.price">
          <p class="payitem" >
            <span>{{payData.dfc.name}}</span>
            <span>
              {{payData.dfc.price}}</span>
          </p>
        </li>
        <li class="paysection" v-if="payData.attributes_selected">
          <p class="payitem" >
            <span>{{$t('confirmFootComp.travelCost')}}:</span>
            <span>{{payData.attributes_selected.total_price}}</span>
          </p>
          <template v-for="(item,ind) in payData.attributes_selected.items">
            <p class="payitem2" :key="ind">
              <span>{{item.name}}</span>
              <span>
                 <i :style="item.prefix=='+'?'color:#D51D28':'color:#aaa;text-decoration:line-through'">{{item.prefix}} </i>
                {{item.price}}</span>
            </p>
          </template>
        </li>

        <li class="paysection" v-if="payData.discount">
          <p class="payitem">
            <span>{{$t('confirmFootComp.discount')}}:</span>
            <span :style="'color:#aaa;text-decoration:line-through'">-{{payData.discount}}</span>
          </p>
          <p class="payitem2" v-if="payData.points&&showmili=='1'" >
            <span>{{$t('confirmFootComp.riceGrains')}}</span>
            <span style="text-decoration:line-through;color:#aaa;"><i :style="'color:#aaa'">-</i>
                {{payData.points.discount}}</span>
          </p>
          <p class="payitem2" v-if="payData.agent.discount && payData.agent.discount!='' && payData.agent.discount.substring(1) > 0" >
            <span>{{$t('confirmFootComp.unionSave')}}</span>
            <span><i :style="'color:#aaa'">-</i>
                {{payData.agent.discount}}</span>
          </p>

          <p class="payitem2" v-if="payData.coupons" >
            <span>{{$t('coupons')}}</span>
            <span style="text-decoration:line-through;color:#aaa;"><i :style="'color:#aaa'">-</i>
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
    created() {

    },
    mounted() {

      // console.log(this.payData)

    },
    methods: {
      closepops() {
        this.$emit("closepops", 'false')
      }


    }


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
    border-bottom: 2px solid #E4E4E4;
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
    margin-bottom: 100px;
    border-top: 2px solid #E4E4E4;

  }

  .payall span:nth-child(1) {
    color: #A1A1A1;
    font-size: 24px;
    display: inline-block;
    float: left;
    line-height: 94px;
  }

  .payall span:nth-child(2) {
    color: #FF5454;
    display: inline-block;
    line-height: 94px;
    float: right;
    font-size: 32px;
  }

  .paysection {
    border-top: 2px solid #E4E4E4;
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
    color: #FB605D;
    display: inline-block;
    line-height: 78px;
    float: right;
    font-size: 28px;
  }

  .payitem2 {
    width: 750px;
    padding: 0 32px;
    box-sizing: border-box;
    height: 60px;
  }

  .payitem2 span:nth-child(1) {
    color: #191919;
    font-size: 28px;
    display: inline-block;
    float: left;
    line-height: 60px;
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
