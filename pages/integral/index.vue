<template>
  <div class="out-layer-con integral">
    <div>
      <h2 class="title">什么是米粒</h2>
      <p class="txt-index">米粒是稀饭旅行网对会员的一种奖励，是会员财富的
      象征。用户可通过购买产品、完善个人资料，登录签
      到等行为获得米粒。为了保障米粒的价值以及公平，
      米粒不支持人民币充值哦.</p>

      <p class="txt-index"><strong>米粒有什么用</strong></p>

      <p class="txt-index">目前米粒可以在订购行程时直接抵扣部分现金。100米
        粒=1美元（美元哟），部分产品可实现百分百的抵扣！除了直抵现金，以后还会扩展多更的用途哟</p>

      <p class="txt-index"><strong>如何获得米粒</strong></p>

      <p class="txt-index"><strong>★ 注册稀饭</strong></p>
      <p class="txt-index">注册成为稀饭会员，可获赠100米粒。</p>
      <p class="txt-index"><strong>★ 个人资料认证</strong></p>
      <p class="txt-index">1、验证手机/邮箱可获赠100米粒。（请放心，我们跟您一样讨厌垃圾信息）</p>
      <p class="txt-index">2、完善生日信息，可获赠100米粒。（我们将在您生日时为您送出意想不到的惊喜哦）</p>
      <p class="txt-index"><strong>★ 每日签到</strong></p>
      <p class="txt-index">每日登录，可获赠5米粒</p>
      <p class="txt-index"><strong>★ 订购旅游产品</strong></p>
      <p class="txt-index">在线订购稀饭旅行产品，消费$1可获得2个稀饭米粒，不足1美元的不计算。米粒会在行程结束后30天内到账</p>
      <p class="txt-index"><strong>★ 不定期活动</strong></p>
      <p class="txt-index">稀饭旅行会不定期的举行活动，欢迎关注公众号：
        zmcslxs 了解</p>

      <p class="txt-index">说明</p>
      <p class="txt-index">1、若发现有恶意刷米粒行为，稀饭旅行有权收回相应的米粒赠送；</p>
      <p class="txt-index">2、分销、联盟不享受米粒赠送；</p>
      <p class="txt-index">3、会员持有米粒不转让、不抵现；</p>
      <p class="txt-index">4、米粒有效期：2年有效（即2018年的米粒将会在2019年12月31日清零）。</p>

    </div>
  </div>
</template>

<script>
export default {
  name: 'index',
  head() {
    return {
      title: '米粒说明'
    }
  },
}
</script>

<style type="text/scss" lang="scss" scoped>
  .out-layer-con{
    position: relative;
    top: 88px;
    border-top: 2px solid #D8D8D8;
  }
  .integral{
    font-size: 28px;
    line-height: 34px;
    padding: 32px;
    h2.title{
      text-align: center;
      font-size: 34px;
      padding: 20px 0;
    }
    .p-left-20{
      padding-left: 60px;
    }
    p{
      margin: 10px 0;
      img{
        width: 100%;
      }
    }
    .txt-index{
      text-indent: 30px;
    }
  }
</style>
