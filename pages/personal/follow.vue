<template>
  <!--我的关注-->
  <div class="follow-wrap">
    <div class="header">
      <van-nav-bar
        class="bar-shadow"
        title="我的收藏"
        @click-left="onClickLeft"
        @click-right="saveFollow"
        left-arrow
      >
        <span class="header-btn" slot="right" @click="isModify =!isModify" v-if="!isModify">编辑</span>
        <span class="header-btn" slot="right" @click="isModify =!isModify" v-else>取消</span>
      </van-nav-bar>
    </div>
    <div class="product-wrap">
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
                <dd>价格：<span class="price">{{item.default_price}}</span></dd>
              </dl>
            </div>
          </van-cell>
        </van-cell-group>
      </van-checkbox-group>

      <div class="no-product" v-if="!productList.length && !firstLoad">暂无收藏，快去收藏吧</div>
      <div class="no-product" v-if="firstLoad">数据加载中...</div>
      <div v-if="isModify" class="btn-delete"><van-button block @click="deleteProductFavorites">删除</van-button></div>
    </div>
  </div>
</template>

<script>
import {getFavorites} from '@/api/profile'
import {delFavorite} from '@/api/products'
export default {
  name: 'follow',
  data() {
    return {
      result: [],
      isModify: false,
      productList:[],
      firstLoad: true
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    async init() {
      let {code, data, msg} = await getFavorites({page_size: 6})
      if(code === 0) {
        this.productList = data || []
        this.firstLoad = false
      } else {
        // this.$toast(msg)
        this.firstLoad = false
        this.productList = []
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
        this.$toast('删除成功')
        this.init()
      } else {
        this.$toast('删除失败')
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

</style>
