<template>
  <div class="page-container">
    <header-bar title="提现记录"></header-bar>
    <div style="padding-top: 46px;">
      <nuxt-link to="/personal/transfercore/account_sure" tag="div" class="withdraw-cnt-tit">
        <img src="../../../assets/imgs/union/icon_dollar.png" alt="">发起提现
      </nuxt-link>
      <ul class="record-box" >
        <li>
          <p class="price">$4.23</p>
          <p>刚刚</p>
        </li>
        <li class="color">
          已到账
        </li>
      </ul>
      <ul class="record-box" >
        <li>
          <p class="price">$4.23</p>
          <p>刚刚</p>
        </li>
        <li class="color">
          已到账
        </li>
      </ul>
      <ul class="record-box" >
        <li>
          <p class="price">$4.23</p>
          <p>刚刚</p>
        </li>
        <li>
          已到账
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
export default {
  name: 'transfercore',
  components: {HeaderBar},
}
</script>

<style type="text/scss" lang="scss" scoped>
  .page-container{
    background: #F5F4F9;
    min-height: 100vh;
  }
  .withdraw-cnt-tit{
    height:120px;
    background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
    box-shadow:0px 6px 12px rgba(0,43,100,0.16);
    text-align: center;
    font-size:28px;
    color: #fff;
    line-height: 120px;
    img{
      vertical-align: middle;
    }
  }
  .record-box{
    padding: 28px 24px;
    margin: 16px 15px 0 15px;
    background: #fff;
    border-radius: 12px;
    color: #9B9B9B;
    font-size: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .price{
      font-size: 32px;
      color: #3B3B3B;
      font-weight: bold;
    }
    .color{
      color: #FF7246;
    }
  }
</style>
