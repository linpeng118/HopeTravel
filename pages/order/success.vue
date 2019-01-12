<template>
  <result title="支付成功" :status="status" describe="支付成功">
    <div class="success-wrap">
      <div class="text">支付金额：<span>$100.00（等价于700.00）</span></div>
      <div class="success-skip">
        <van-button :block="true" class="self-btn-blue">继续逛逛</van-button>
        <van-button :block="true" class="self-btn-null">查看订单</van-button>
      </div>
    </div>
  </result>
</template>

<script>
import Result from '@/components/status/result'
export default {
  components: {
    Result
  },
  data() {
    return {
      status: {
        name: 'passed',
        color: '#4BCC15'
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .success-wrap{
    margin-top:110px;
    .text{
      color: #191919;
      font-size: 24px;
      span{
        color: #399EF6;
        font-size: 28px;
        font-weight: 600;
      }
    }
    .success-skip{
      margin-top: 52px;
    }
    .self-btn-blue{
      background-color: #399EF6;
      color: #fff;
    }
    .self-btn-null{
      border:none;
      margin-top: 14px;
    }
  }

</style>
