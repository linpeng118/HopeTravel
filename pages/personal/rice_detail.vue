<template>
  <div class="container">
    <div class="nav-bar">
        <van-nav-bar class="nav-bar" title="米粒说明" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="body">
        <div class="section">
            <h6>什么是米粒？</h6>
            <p>
                粒是稀饭旅行网对会员的一种奖励，是会员财富的象征。米粒是稀饭旅行网对会员的一种奖励，是会员财富的象征。米粒是稀饭旅行网对会员的一种奖励，是会员财富的象征。米粒是稀饭旅行网对会员的一种奖励，是会员财富的象征。米粒是稀饭旅行网对会员的一种奖励，是会员财富的象征。
            </p>
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
<style lang="scss" scoped>
    .container{
        .nav-bar{
            color:#191919;
            box-shadow: 1px 1px 5px 5px rgba(192, 192, 192, 0.2)
        }
        .body{
            padding: 34px 35px 24px;
            background:#fff;
            text-align: justify;
            .section{
                h6{
                    font:28px/60px "";
                    color:#191919;
                }
                p{
                    font:28px/50px "";
                    color:#989898;
                }
            }

        }
    }
</style>