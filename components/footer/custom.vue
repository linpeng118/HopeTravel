<template>
    <div class="btn_container clearfix">
      <div @click="toList2()" class="btn_online fl" id="qa-wangqiao-btn" >
        <img style="widht:.52rem;height:.52rem;" src="../../assets/imgs/custom/btn1.png" alt="">
        在线咨询
      </div>
      <div class="btn_custom fl" @click="toCustom()">
        <img style="widht:.48rem;height:.48rem;" src="../../assets/imgs/custom/btn2.png" alt="">
        立即定制
      </div>
    </div>
</template>
<script>
import onCustomerService from '@/assets/js/customerService.js'
export default {
  methods:{
    toList2() {
        onCustomerService('custom')
    },
    toCustom() {
      let {query} = this.$route
      this.$router.push({
        path: '/custom',
        query
      })
    },
  }
}
</script>
<style lang="scss" scoped>
  .btn_online {
    color: #5e5e5e !important;
    background: rgb(243, 243, 243);
    font: 32px/100px "";
  }
  .btn_custom {
    background: #ef9a1a;
    color: #fff !important;
    font: 32px/100px "";
  }
  .btn_container > div {
    width: 375px;
    display: inline-block;
    height: 100px;
    box-sizing: border-box;
    text-align: center;
  }
</style>
