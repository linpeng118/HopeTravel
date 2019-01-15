<template>
  <result title="支付" :status="status" describe="支付异常">
    <div class="error-wrap">
      <div class="text">支付出现了一些问题</div>
      <div class="error-skip">
        <van-button :block="true" class="self-btn-blue">联系客服</van-button>
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
          name: 'info-o',
          color: '#FB605D'
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .error-wrap{
    margin-top:28px;
    .text{
      color: #5E5E5E;
      font-size: 24px;
      margin-bottom: 156px;
    }
    .error-skip{
      margin-top: 52px;
    }
    .self-btn-blue{
      background-color: #399EF6;
      color: #fff;
    }
  }

</style>
