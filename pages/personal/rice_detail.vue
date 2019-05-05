<template>
  <div class="container">
    <div class="nav-bar">
        <van-nav-bar class="nav-bar" :title="$t('personalPage.riceGrainDesc')" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="body">
      <div class="rice-detail" v-html="$t('html.riceDetail')">
        <div></div>
      </div>
    </div>
  </div>
</template>
<script>
import { Toast } from "vant";

export default {
  name: "component_name",
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      window.history.go(-1);
    }
  }
};
</script>
<style lang="scss">
    .container{
        .nav-bar{
            color:#191919;
            box-shadow: 1px 1px 5px 5px rgba(192, 192, 192, 0.2)
        }
        .body{
            padding: 34px 35px 24px;
            background:#fff;
            text-align: justify;
        }
    }
  .rice-detail{
    font:28px/50px "";
    color:#989898;
    h6.title{
      font:28px/60px "";
      color:#191919;
    }
  }
</style>
