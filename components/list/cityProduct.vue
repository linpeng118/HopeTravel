<template>
  <div class="new-prd-l" @click="changePage">
    <div class="img-m">
      <img :src="item.image">
      <div class="start-c">{{productTypeValue(item.product_type)}}</div>
      <div class="rate">{{item.comment_score == '0.0' ? '5.0' : item.comment_score}}分</div>
    </div>
    <div class="name-p">
      <span v-if="item.name_short" class="short-name">{{item.name_short}}</span>
      <span v-else class="name">{{item.name}}</span>
    </div>
    <div class="tag-p-s" v-if="item.icons_tour && item.icons_tour.length">
      <span v-for="tag in item.icons_tour" :key="tag.title">{{tag.title}}</span>
    </div>
    <div class="price-b"> 
      <span class="p-j">{{item.special_price || item.default_price}}</span>起 {{item.sales}}人去过
    </div>
  </div>
</template>
<script>
export default {
  props:{
    item: {
      type: Object,
      default: null
    }
  },
  methods:{
    productTypeValue(val) {
      const type = [
        {type: 3,title: this.$t('tours.exquisiteGroup')},
        {type: 1,title: this.$t('tours.localGroup')},
        {type: 2,title: this.$t('tours.localPlay')},
        {type: 4,title: this.$t('tours.tickets')},
        {type: 5,title: this.$t('tours.aDayTrip')},
        {type: 6,title: this.$t('tours.connectionService')},
        {type: 7,title: this.$t('tours.cruise')},
      ]
      let target = type.find(item => {
        return item.type === val
      })
      return target.title
    },
    changePage(){
      this.$router.push(`/product/detail?productId=${this.item.product_id}`)
    }
  }
}
</script>
<style type="text/scss" lang="scss" scoped>
  .new-prd-l{
    margin-bottom: 30px;
    .img-m{
      height: 334px;
      position: relative;
      border-radius:16px; 
      overflow: hidden;
      margin-bottom: 10px;
      img{
        width: 100%;
        height: 100%;
      }
      .start-c{
        height: 52px;
        position: absolute;
        top: 0;
        color: #fff;
        background-color: rgba(0,0,0,0.5);
        font-size:24px;    
        line-height: 52px;    
        padding: 0 16px;          
        border-radius: 0 0 16px 0;          
      }
      .rate{
        position: absolute;
        right: 8px;
        bottom: 8px;
        border-radius: 16px 0 16px 16px;
        width: 88px;
        height: 38px;
        line-break: 38px;
        text-align: center;
        color: #FFB300;
        background-color: rgba(0,0,0,0.5);
        font-size:24px;
      }
    }
    .name-p{
      height: 80px;
      font-size:28px;
      font-weight:bold;
      line-height:40px;
      color:#2D2D2D;
      overflow: hidden;
      span{
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp:2;
        overflow: hidden;
        font-size:28px;
        font-weight:bold;
        line-height:40px;
        color:rgba(45,45,45,1);
      }
    }
    .tag-p-s{
      margin-top: 10px;
      display: flex;
      flex-wrap:wrap;
      height:36px;
      overflow: hidden;
      span{
        height:36px;
        line-height: 36px;
        padding: 0 10px;
        color: #00ABF9;
        background-color: #DCF4FF;
        border-radius:8px;
        font-size:20px;
        margin-right: 8px;
        margin-bottom: 10px;
      }
    }
    .price-b{
      margin-bottom: 10px;
      font-size:24px;
      line-height:34px;
      color: #AEAEAE;
      span.p-j{
        color: #F55E2F;
        font-size:32px;
        font-weight:bold;
        line-height: 44px;
        margin-right: 8px;
      } 
    }
  }
</style>