<template>
  <div class="union-item">
    <nuxt-link :to="`/product/detail?productId=${item.product_id}`" class="img-box" target="_blank">
      <img :src="item.image" alt="">
    </nuxt-link>
    <div class="desc" >
      <nuxt-link class="title" :to="`/product/detail?productId=${item.product_id}`" target="_blank">{{item.name}}</nuxt-link>
      <div class="fx-p" v-if="!sight">{{'分销销额：' + item.agent_sales}}</div>
      <div class="fx-p" v-if="sight" style="margin-top: 10px;">{{'点击量：' + item.score}}</div>
      <div class="price-box" v-if="!sight">
        <div>
          <p class="default-p">{{item.default_price}}</p>
          <p class="profit-p" v-if="item.margin !== '0.00'">{{'赚'+item.agent_fee}}</p>
        </div>
        <div class="share-btn" @click="selectDetail(item)">
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'unionList',
  props:{
    item: {
      type:Object,
      default: null
    },
    sight: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    selectDetail(item){
      this.$emit('select', item)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .union-item{
    padding: 24px;
    display: flex;
    border-top: 1px solid #E1E1E1;
    .desc{
      flex: 1;
      padding-left: 32px;
      .title{
        font-size:24px;
        line-height: 30px;
        height: 60px;
        overflow: hidden;
        color: #5B5B5B;
        display: block;
      }
      .fx-p{
        font-size: 20px;
        color: #9B9B9B;
        margin-bottom: 10px;
      }
      .price-box{
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
      }
      .default-p{
        font-size:28px;
        color: #3B3B3B;
        line-height:36px;
        margin-bottom: 6px;
      }
      .profit-p{
        color: #FF2027;
        font-size:24px;
      }
      .share-btn{
        position: relative;
        width:60px;
        height:60px;
        background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
        border-radius:80px;
        &:before{
          position: absolute;
          top: 10px;
          left: 12px;
          content: '';
          background:  url("../../assets/imgs/union/icon_share@2x.png") no-repeat center;
          background-size: cover;
          height: 40px;
          width: 40px;
        }
      }
    }
    .img-box{
      width:240px;
      height:180px;
      background-color: #aaaaaa;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
