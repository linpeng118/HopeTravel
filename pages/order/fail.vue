<template>
  <result title="支付" :status="status" describe="支付异常">
    <div class="fail-wrap">
      <div class="text">opps！不知为何没有支付成功 <br/>请稍后再试</div>
      <div class="fail-skip">
        <van-button :block="true" class="self-btn-blue">联系客服</van-button>
        <van-button :block="true" class="self-btn-null">联系客服</van-button>
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
          name: 'close',
          color: '#FB605D'
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .fail-wrap{
    margin-top:28px;
    .text{
      color: #5E5E5E;
      font-size: 24px;
      margin-bottom: 122px;
    }
    .fail-skip{
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
