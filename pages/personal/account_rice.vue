<template>
  <div class="container">
    <div class="header">
      <div class="nav-bar">
        <van-icon class="arrow" name="arrow-left" @click="onClickLeft"></van-icon>
        <span class="tittle">我的米粒</span>
        <i class="description" @click="riceDetail">米粒说明</i>
      </div>
      <div class="usable-rice">
        <div class="usable-left">
          <h6>当前可用米粒</h6>
          <div class="num">145</div>
        </div>
        <div class="usable-right">等值于$1.45</div>
      </div>
    </div>
    <div class="body">
      <!-- 次级菜单 -->
      <div class="sub-menu">
        <div class="line clearfix">
          <div class="line-left fl">
            <h6>交易米粒</h6>  
            <p>积分将在订单完成后到账</p>
          </div>
          <div class="line-right fr">
            <h5 class="color1">
              +315
            </h5>
          </div>    
        </div>
        <div class="line clearfix">
          <div class="line-left fl">
            <h6>支付成功</h6>  
            <p>积分将在订单完成后到账</p>
          </div>
          <div class="line-right fr">
            <h5 class="color1">
              +5
            </h5>
          </div>    
        </div>
        <div class="line clearfix">
          <div class="line-left fl">
            <h6>支付抵现</h6>  
            <p>积分将在订单完成后到账</p>
          </div>
          <div class="line-right fr">
            <h5 class="color2">
              -100
            </h5>
          </div>    
        </div>
        <div class="line clearfix">
          <div class="line-left fl">
            <h6>交易米粒</h6>  
            <p>积分将在订单完成后到账</p>
          </div>
          <div class="line-right fr">
            <h5 class="color1">
              +315
            </h5>
          </div>    
        </div>
        <div class="line clearfix">
          <div class="line-left fl">
            <h6>交易米粒</h6>  
            <p>积分将在订单完成后到账</p>
          </div>
          <div class="line-right fr">
            <h5 class="color1">
              +315
            </h5>
          </div>    
        </div>
        <div class="line clearfix">
          <div class="line-left fl">
            <h6>交易米粒</h6>  
            <p>积分将在订单完成后到账</p>
          </div>
          <div class="line-right fr">
            <h5 class="color1">
              +315
            </h5>
          </div>    
        </div>
        <div class="line clearfix">
          <div class="line-left fl">
            <h6>交易米粒</h6>  
            <p>积分将在订单完成后到账</p>
          </div>
          <div class="line-right fr">
            <h5 class="color1">
              +315
            </h5>
          </div>    
        </div>
        

       
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "component_name",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
     window.history.go(-1);
    },
    riceDetail(){
      this.$router.push({
        path:"/personal/rice_detail"
      })
    }
  }
};
</script>
<style lang="scss" scoped>

.container {
  background: #f1f1f1;
  height:100vh;
  .header {
    width: 750px;
    height: 318px;
    background: rgba(57, 158, 246, 1);
    opacity: 1;
    padding: 0 32px;
    .nav-bar {
      color: #fff;
      box-sizing: content-box;
      height: 80px;
      padding-top: 40px;
      position: relative;
      .arrow {
        width: 100px;
        font-size: 40px;
        line-height: 80px;
      }
      .tittle {
        width: 400px;
        text-align: center;
        font: bold 34px/80px "";
        position: absolute;
        left: 150px;
        top: 40px;
      }
      .description {
        font: 24px/80px "";
        position: absolute;
        right: 0;
        top: 45px;
      }
    }
    .usable-rice {
      color: #fff;
      box-sizing: content-box;
      position: relative;
      height: 180px;
      .usable-left {
        position: absolute;
        left: 0;
        top: 30px;
        h6 {
          font: 28px/28px "";
        }
        .num {
          margin-top: 20px;
          font: 80px/100px "";
        }
      }
      .usable-right {
        position: absolute;
        right: 0;
        bottom: 20px;
        font: 28px/28px "";
      }
    }
  }
  .body {
    padding: 0 32px 24px;
    background: #f1f1f1;

    .sub-menu {
      width: 686px;
      background: #fff;
      border-radius: 8px;
      margin-top: 24px;
      margin-bottom: 24px;
      padding:24px 26px 10px 26px;
      .line{
        height:120px;
        border-bottom:1px solid rgb(233, 232, 232);    
        .line-left{
          h6{
            font:28px/60px "";
            color:#191919;
          }
          p{
            font:24px/40px "";
            color:#989898;
          }
        } 
        .line-right{
          .color1{
            font:bold 40px/120px "";
            color:#399EF6;
          }
          .color2{
            font:bold 40px/120px "";
            color:#EF9A1A;
          }
        }    
      }
      
    }
   
  }
}
</style>