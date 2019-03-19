<template>
  <div>
    <header-bar title="稀饭联盟"></header-bar>
    <div class="main-union" style="padding-top: 46px;">
      <!--我的收益-->
      <div class="self-news">
        <div class="left">
          <span class="price">$23423.00</span>我的收益
        </div>
        <div class="right" @click="onProfitCenter">
          <van-icon class-prefix="my-icon" info="1" />
          您有新收益
          <van-icon name="arrow" />
        </div>
      </div>
      <!--限时奖励-->
      <div class="reward-time-box">
        <van-swipe indicator-color="white">
          <van-swipe-item>
            <div class="item">
              <div class="desc">
                <p>玩转美西经典小环 莫哈维$1000</p>
                <div class="price">
                  赚 $ 80.1
                </div>
              </div>
              <div class="time">
                限时奖励 04：14：59
              </div>
              <img src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-7.jpg" alt="">
            </div>
          </van-swipe-item>
          <van-swipe-item>
            <div class="item">
              <div class="desc">
                <p>玩转美西经典小环 莫哈维$1000</p>
                <div class="price">
                  赚 $ 80.1
                </div>
              </div>
              <div class="time">
                限时奖励 04：14：59
              </div>
              <img src="http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg" alt="">
            </div>
          </van-swipe-item>
        </van-swipe>
      </div>
      <!--产品列表-->
      <div class="hot-product-list">
        <van-tabs v-model="currentTab" title-active-color="#DB302C" color="transparent">
          <van-tab title="热销产品">
            <template v-for="hotItem in hotProductList">
              <union-item :key="hotItem.product_id" :item="hotItem" @select="selectProduct"></union-item>
            </template>
          </van-tab>
          <van-tab title="超高佣金">
            <template v-for="cashItem in cashProductList">
              <union-item :key="cashItem.product_id" :item="cashItem" @select="selectProduct"></union-item>
            </template>
          </van-tab>
          <van-tab title="热门景点">
            <template v-for="sightItem in sightProductList">
              <union-item :key="sightItem.product_id" :item="sightItem" :sight="true" @select="selectSight"></union-item>
            </template>
          </van-tab>
        </van-tabs>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import UnionItem from '@/components/list/unionList'
export default {
  name: 'sale_union',
  components: {HeaderBar, UnionItem},
  data() {
    return {
      currentTab: 0,
      hotProductList: [
        {
          product_id: 123,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1233,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1232,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1223,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1623,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        }
      ],
      cashProductList: [
        {
          product_id: 123,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1233,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1232,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1223,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1623,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          save:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        }
      ],
      sightProductList: [
        {
          product_id: 123,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          score:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1233,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          score:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1232,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          score:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1223,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          score:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        },
        {
          product_id: 1623,
          imageUrl: 'http://www.pptok.com/wp-content/uploads/2012/08/xunguang-3.jpg',
          title: '玩转美西经典小环 莫哈维玩转美西环 莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...莫哈维玩转美西经典小环 莫...',
          score:421,
          default_price: '$ 1000',
          get_price: '$ 80.1'
        }
      ],
    }
  },
  methods: {
    onClickLeft() {
      console.log('onClickLeft')
    },
    onProfitCenter() {
      console.log('onClickright')
      this.$router.push({
        path: '/personal/sale_union/my_profit'
      })
    },
    selectProduct(item){

    },
    selectSight(item){
      console.log(item)
      this.$router.push({
        name: 'sight_spot'
      })
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .main-union{
    background-color: #F5F4F9;
    .self-news{
      height:160px;
      display: flex;
      padding: 0 18px;
      background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
      box-shadow:0px 3px 6px rgba(0,43,100,0.16);
      color: #fff;
      font-size: 12px;
      align-items: center;
      justify-content: space-between;
      .left{
        display: flex;
        align-items: center;
        span.price{
          margin-right: 10px;
          font-size: 52px;
          vertical-align: middle;
          line-height: 50px;
        }
      }
      .right{
        height: 40px;
        line-height: 40px;
        display: flex;
        align-items: center;
        .my-icon{
          width: 40px;
          height: 40px;
          display: inline-block;
          position: relative;
          background: url("../../../assets/imgs/union/icon_gold@2x.png") no-repeat;
          background-size: cover;
          margin-right: 10px;
        }
        i{
          font-style: normal;
          margin-left: 10px;
        }
      }
    }
    .hot-product-list{
      margin: 10px 15px;
      background-color: #fff;
      border-radius:12px;
      box-shadow:0px 4px 4px rgba(217,217,217,0.14);
    }
    .reward-time-box{
      height: 230px;
      padding: 0 15px;
      margin-top: 20px;
      .item{
        position: relative;
        width: 100%;
        height: 230px;
        .desc{
          position: absolute;
          bottom: 30px;
          right: 20px;
          color: #fff;
          font-size:24px;
        }
        .price{
          text-align: right;
          font-size:38px;
          font-weight: bold;
        }
        .time{
          position: absolute;
          top: 0;
          left: 0;
          height:36px;
          padding: 0 16px;
          line-height: 36px;
          font-size:24px;
          border-radius:12px 0px 0px 0px;
          background-color: #DB302C;
          color: #fff;
        }
        img{
          width: 100%;
          height: 230px;
          border-radius:12px;
        }
      }
    }
  }
</style>
<style>
  .hot-product-list .van-tab--active {
    color: #DB302C;
  }
  .my-icon .van-info{
    background-color: #FF0600;
    border-color: #FF0600;
  }
</style>
