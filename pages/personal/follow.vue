<template>
  <!--我的关注-->
  <div class="follow-wrap">
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        :title="$t('personalPage.myCollection')"
        @click-left="onClickLeft"
        left-arrow
      >
      </van-nav-bar>
    </div>

    <div class="workbox">
      <span class="span1" @click="type=1" :style="type==1?'border-bottom:2px solid #399ef6':''">商品</span>
      <span class="span1" @click="type=2" :style="type==2?'border-bottom:2px solid #399ef6':''">{{$t('attack')}}</span>
      <span class="span2" @click="isModify =!isModify" v-if="!isModify">{{$t('edit')}}</span>
      <span class="span2" @click="isModify =!isModify" v-else>{{$t('cancel')}}</span>
    </div>
    <div class="product-wrap" v-if="type==1">
      <van-checkbox-group v-model="result" v-if="productList.length">
        <van-cell-group>
          <van-cell
            v-for="(item,index) in productList"
            clickable
            :key="item.product_id"
            :name="item.product_id"
            @click="changeProduct(index)"
          >
            <van-checkbox :name="item.product_id" ref="checkboxes" v-if="isModify" class="checked" />
            <div class="content" @click="selectItem(item.product_id)">
              <div class="pro-pic">
                <img :src="item.image" alt>
              </div>
              <dl class="pro-content">
                <dt class="no-wrap-line3">{{item.name}}</dt>
                <dd>{{$t('personalPage.price')}}}：<span class="price">{{item.default_price}}</span></dd>
              </dl>
            </div>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div class="no-product" v-if="!productList.length && !firstLoad">{{$t('personalPage.goToCollect')}}</div>
      <div class="no-product" v-if="firstLoad">{{$t('dataLoading')}}</div>
      <div v-if="isModify" class="btn-delete"><van-button block @click="deleteProductFavorites">{{$t('delete')}}</van-button></div>
    </div>
    <div class="product-wrap" v-if="type==2">
      <van-checkbox-group v-model="result" v-if="productList.length">
        <van-cell-group>
          <van-cell
            v-for="(data,index) in productList2"
            clickable
            :key="data.product_id"
            :name="data.product_id"
            @click="changeProduct(index)"
          >
            <van-checkbox :name="data.product_id" ref="checkboxes" v-if="isModify" class="checked" />
            <div class="product-item" target="_blank">
              <div class="box-img">
                <img :src="data.cover" alt="">
              </div>
              <div class="con">
                <div class="p1">{{data.name}}</div>
                <p class="p2">
                  <img :src="data.create_user.face" alt="">
                  <span style="color:#575757;">{{data.create_user.name||'佚名'}}</span>
                  <span>阅读{{data.read_count}}</span>
                  <span>评论{{data.comment_count}}</span>
                </p>
                <p class="p3">
                  <span>{{data.create_at}}</span>
                  <span v-if="data.relate_position!=''">
                      <img src="../../assets/imgs/addres.png" alt="">
                      <a v-html="data.relate_position.length>7?data.relate_position.substr(0,5)+'...':data.relate_position"></a>
                    </span>
                </p>
              </div>
            </div>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>
      <div class="no-product" v-if="!productList.length && !firstLoad">{{$t('personalPage.goToCollect')}}</div>
      <div class="no-product" v-if="firstLoad">{{$t('dataLoading')}}</div>
      <div v-if="isModify" class="btn-delete"><van-button block @click="deleteProductFavorites">{{$t('delete')}}</van-button></div>
    </div>
  </div>
</template>

<script>
import {getFavorites} from '@/api/profile'
import {delFavorite,getFavoriteList2} from '@/api/products'
export default {
  name: 'follow',
  data() {
    return {
      result: [],
      isModify: false,
      productList:[],
      productList2:[],
      firstLoad: true,
      type:1,
    }
  },
  mounted() {
    this.init()
    this.init2()
  },
  methods: {
    async init() {
      let {code, data, msg} = await getFavorites({page_size: 6})
      if(code === 0) {
        this.productList = data || []
        this.firstLoad = false
      } else {
        this.firstLoad = false
        this.productList = []
      }
    },
    async init2() {
      let {code, data, msg} = await getFavoriteList2({page:1})
      if(code === 0) {
        this.productList2 = data || []
      } else {
        this.productList2 = []
      }
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    saveFollow() {},
    // 编辑
    changeProduct(index) {
      if(this.isModify) {
        this.$refs.checkboxes[index].toggle()
      }
    },
    async deleteProductFavorites(){
      let {code} = await delFavorite({
        product_id: this.result.join(',')
      })
      if(code === 0) {
        this.$toast(this.$t('operateSuc'))
        this.init()
      } else {
        this.$toast(this.$t('operateFail'))
      }
    },
    // 详情跳转
    selectItem(productId) {
      if(!this.isModify) {
        this.$router.push({
          name: 'product-detail',
          query: {
            productId
          }
        })
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .follow-wrap{
    .header{
      border-bottom: 2px solid #DEDEDE;
    }
    .header-btn {
      color: #fff;
      width: 92px;
      height: 36px;
      background: rgba(57, 158, 246, 1);
      border-radius: 18px;
      font-size: 22px;
      padding: 2px 20px;
    }
    .product-wrap{
      padding: 0 0 140px 0;
      .content {
        font: 24px/32px "";
        padding: 28px 0;
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        .pro-pic {
          margin-right: 26px;
          width: 208px;
          height: 144px;
          background: #ddd;
          img {
            width: 208px !important;
            height: 144px !important;
          }
        }
        .pro-content {
          flex: 1;
          font-size:24px;
          line-height: 33px;
          dt {
            height: 66px;
            line-height: 33px;
            overflow: hidden;
            color: #191919;
            font-size:24px;
          }
          dd {
            padding-top: 36px;
            color: #989898;
            .price{
              font-size:32px;
              font-weight:400;
              color:#FB605D;
            }
          }
        }
      }
    }
    .no-product{
      color: #989898;
      font-size: 28px;
      text-align: center;
      padding-top: 30px;
    }
    .btn-delete {
      height: 140px;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      padding: 26px 144px;
      background-color: #fff;
      button{
        border-radius:8px;
        background-color: #399EF6;
        color: #fff;
      }
    }
  }
</style>
<style type="text/scss" lang="scss">
  .product-wrap{
    .content{
      flex: 1;
    }
    .van-cell__value{
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      .checked{
        padding-right: 20px;
      }
    }
  }
  .workbox{
    width: 100%;
    height: 88px;
    line-height: 88px;
    padding-top: 14px;
    display: inline-block;
    span{
      display: inline-block;
      height: 60px;
      line-height:60px;
      font-size: 28px;
    }
    .span1{
      color: #191919;
      float: left;
      margin-left: 32px;
    }
    .span2{
      color: #399EF6;
      float: right;
      margin-right: 32px;
      margin-left: 32px;
    }
  }
   .product-item{
    width:750px;
    height:300px ;
    padding-top: 10px;
    box-sizing: border-box;
    .box-img{
      width: 240px;
      display: inline-block;
      height: 240px;
      border-radius:12px;
      overflow: hidden;
      position: absolute;
      background-color: #4bb1f5;
      img{
        width: 240px;
        height: 240px;
      }
    }
    .con{
      background-color: #ffd97f;
      padding:20px 28px 20px 180px ;
      margin-top: 36px;
      width: 620px;
      height: 240px;
      box-sizing: border-box;
      background:rgba(255,255,255,1);
      box-shadow:0px 0px 28px rgba(52,52,52,0.2);
      border-radius: 12px;
      margin-left: 60px;
      .p1{
        width: 418px;
        font-size: 28px!important;
        color: #2d2d2d;
        line-height: 44px;
        padding-left: 20px;
        height: 110px;
        padding-bottom: 20px;
      }
      .p2{
        width: 418px;
        height: 48px;
        font-size: 24px;
        color: #d4d4d4;
        line-height: 48px;
        img{
          width: 48px;
          height: 48px;
          background-color: #cfcfcf;
          margin-left: 20px;
          display: inline-block;
          position: relative;top: 16px;
        }
        span{
          margin-left: 12px;
        }
      }
      .p3{
        width: 418px;
        height: 48px;
        font-size: 24px;
        text-align: right;
        color: #d4d4d4;
        margin-top: 8px;
        span{
          margin-left: 20px;
          line-height: 36px;
          display: inline-block;
          img{
            width: 16px;
            height: 21px;
            display: inline-block;
          }
        }


      }
    }

  }

</style>
