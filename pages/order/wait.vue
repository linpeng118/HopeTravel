<template>
  <result title="支付" :status="status" describe="订单处理中...">
    <div class="wait-wrap">
      <div class="text">支付正在处理中，请稍后</div>
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
          name: 'underway-o',
          color: '#399EF6'
        }
      }
    }
  }
</script>

<style type="text/scss" lang="scss" scoped>
  .wait-wrap{
    margin-top:28px;
    .text{
      color: #5E5E5E;
      font-size: 24px;
      margin-bottom: 156px;
    }
  }

</style>
