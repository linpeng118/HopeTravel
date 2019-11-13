<template>
    <div class="btn_container clearfix">
      <a target="_blank" @click="toList2()" class="btn_online fl" id="qa-wangqiao-btn" >
        <img style="widht:.52rem;height:.52rem;" src="../../assets/imgs/custom/btn1.png" alt="">
        在线咨询
      </a>
      <nuxt-link tag="a" class="btn_custom fl" :to="{ name: 'custom', query: $route.query}">
        <img style="widht:.48rem;height:.48rem;" src="../../assets/imgs/custom/btn2.png" alt="">
        立即定制
      </nuxt-link>
    </div>
</template>
<script>
import onCustomerService from '@/assets/js/customerService.js'
export default {
    methods:{
        toList2() {
            onCustomerService('custom')
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
  .btn_container a {
    width: 375px;
    display: inline-block;
    height: 100px;
    box-sizing: border-box;
    text-align: center;
  }
</style>
