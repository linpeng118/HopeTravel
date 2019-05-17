<template>
  <div>
    <div class="header"
      v-if="!isApp">
      <van-nav-bar class="bar-shadow"
        :title="$t('helpPage.changeorder')"
        @click-left="onClickLeft"
        left-arrow
        v-if="!isApp">
      </van-nav-bar>
    </div>
    <div class="advantage_wrap" v-html="$t('helpPage.changeHtml')">
      {{}}
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        isApp: this.$route.query.platform,
      }
    },
    head() {
      return {
        title: '取消和修改条例'
      }
    },
    methods: {
      onClickLeft() {
        this.$router.go(-1)
      }
    }
  }
</script>

<style>
  /*开始*/
  .advantage_wrap {
    margin: 0 auto;
    padding-top: 0.79rem;
    padding-bottom: 1.5rem;
    overflow: hidden;
    width: 100%;
    max-width: 720px;
  }
  .advantage_inner {
    width: 90%;
    margin: 0 auto;
    padding: 0.3rem 0;
  }
  .advantage_inner_p1 {
    font-size: 0.28rem;
    color: #222222;
    line-height: 0.5rem;
    font-weight: bold;
  }
  .advantage_inner_p2 {
    font-size: 0.24rem;
    color: #666666;
    line-height: 0.42rem;
  }
  .borderDash {
    border-bottom: 1px dashed #f3f3f3;
  }
  .pay_fail_header {
    left: 50%;
    max-width: 720px;
    transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
  }
  html .footer_wrap_wrapper {
    left: 50%;
    max-width: 720px;
    transform: translate(-50%, 0);
    -ms-transform: translate(-50%, 0);
    -moz-transform: translate(-50%, 0);
    -webkit-transform: translate(-50%, 0);
    -o-transform: translate(-50%, 0);
  }

  table {
    border-color: #666666;
    color: #666666;
    font-size: 0.24rem;
    border-right: 1px solid #666666;
    border-bottom: 1px solid #666666;
  }
  table thead td {
    padding: 0.1rem 0;
    text-align: center;
    border-top: 1px solid #666666;
    border-left: 1px solid #666666;
  }
  table tbody td {
    font-size: 0.22rem;
    text-align: center;
    padding: 0.05rem 0.1rem;
    border-top: 1px solid #666666;
    border-left: 1px solid #666666;
  }
  .advantage_inner_p3 {
    font-size: 0.24rem;
    margin: 0.1rem 0 0.2rem 0;
  }
  body .td1,
  body .td2 {
    width: 20%;
    text-align: center;
  }
  body .td4,
  body .td5 {
    width: 30%;
    text-align: center;
  }
  .td6 {
    text-align: center;
    line-height: 0.4rem;
  }
</style>
