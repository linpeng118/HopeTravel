<template>
  <div class="union-page-container">
    <header-bar title="稀饭联盟说明"></header-bar>
    <div style="padding-top: 46px">
      <div class="text-box">
        <h2 class="title">什么是稀饭联盟？</h2>
        <p>
          稀饭联盟是稀饭旅行提供给注册用户的分享平台，联盟成员可通过分享获得奖励金。
        </p>
        <p>分享获益方式如下：</p>
        <h3 class="title">分享产品</h3>
        <p>产品分享奖励金将在产品列表以及产品详情展示，联盟成员可通过产品推广链接进行
          分享，当产品完成订单后即可获得相应奖励金。</p>
        <h3 class="title">邀请好友</h3>
        <p>联盟成员通过邀请新人加入联盟，新人首单获得奖励金时，即可获得新人首单奖励金
          的25%</p>
        <p>分享越多，就能获得越多收益。成为稀饭联盟成员后，还能享受平台不定期的专属购买福利，欢迎你的加入！</p>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
export default {
  name: 'about_xf_union',
  components: {HeaderBar},
}
</script>

<style type="text/scss" lang="scss" scoped>
  .text-box{
    margin: 20px 15px;
    background-color: #fff;
    border-radius:12px;
    box-shadow:0px 4px 4px rgba(217,217,217,0.14);
    color: #9B9B9B;
    padding: 20px;
    font-size:24px;
    h2.title{
      font-size:32px;
      color: #3C3C3C;
      margin: 10px 0;
    }
    h3.title{
      font-size:28px;
      color: #3C3C3C;
    }
    p{
      line-height: 40px;
      margin-bottom: 20px;
    }
  }
</style>
