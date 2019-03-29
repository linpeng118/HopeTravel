<template>
  <div class="page-container">
    <header-bar title="我的联盟饭友"></header-bar>
    <div style="padding-top: 46px;" class="main-box">
      <div class="count-item">
        <div class="detail">
          <img src="../../../assets/imgs/union/icon_union@2x.png" alt="">
          <div class="desc">
            <p class="name">稀饭盟友</p>
            <p v-if="JSON.stringify(friendReport) !== '{}'">产生{{friendReport.total.order}}个订单，帮我赚取了{{friendReport.total.income}}</p>
          </div>
          <div class="right">
            <span class="num" v-if="JSON.stringify(friendReport) !== '{}'">{{friendReport.total.friend}}</span> 人
          </div>
        </div>
        <div class="link-btn" @click="goToPathShare('shareFriends')">邀请朋友加入，有钱大家一起赚</div>
      </div>
      <div class="detail-item" v-for="item in friendReport.friends" :key="item.customer_id">
        <van-row type="flex" align="center">
          <van-col span="9">
            <div class="people-info">
              <img :src="item.face" alt="">
              <div>
                {{item.name}}
                <p>{{item.date}}</p>
              </div>
            </div>
          </van-col>
          <van-col span="5">
            <p class="num">{{item.share}}</p>
            <p>分享</p>
          </van-col>
          <van-col span="5">
            <p class="num">{{item.order}}</p>
            <p>订单</p>
          </van-col>
          <van-col span="5">
            <p class="num">{{item.income}}</p>
            <p>收益</p>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {friendReport} from '@/assets/js/mixins/friendReport'
export default {
  name: 'my_share',
  components: {
    HeaderBar
  },
  mixins:[friendReport],
  data() {
    return {
    }
  },
  mounted(){
    console.log(this.friendReport)
  },
  methods:{
    goToPathShare(value) {
      if(value === 'shareFriends') {
        this.$router.push({
          path: '/personal/sale_union/invite_friends'
        })
      }
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~/assets/style/union/list.scss";
  .people-info{
    display: flex;
    text-align: left;
    align-items: center;
    justify-content: center;
    img{
      margin-right: 20px;
      border-radius: 50%;
    }
  }
</style>
