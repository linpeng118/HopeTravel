<template>
  <div class="page-container">
    <header-bar title="我的分享"></header-bar>
    <div style="padding-top: 46px;" class="main-box">
      <div class="count-item">
        <div class="detail">
          <img src="../../../assets/imgs/union/icon_share_big@2x.png" alt="">
          <div class="desc">
            <p class="name">本周分享效果</p>
            <p v-if="JSON.stringify(shareReport) !== '{}'">{{shareReport.total.view}}个浏览，产生了{{shareReport.total.order}}个订单</p>
          </div>
          <div class="right" v-if="JSON.stringify(shareReport) !== '{}'">
            <span class="num">{{shareReport.total.view}}</span> 个
          </div>
        </div>
        <nuxt-link tag="div" class="link-btn" to="/personal/sale_union">越分享越有钱，分享永不止步</nuxt-link>
      </div>
      <div class="detail-item" v-for="(item,index) in shareReport.platform" :key="index">
        <van-row type="flex" align="center">
          <van-col span="6">
            <img :src="item.image" alt="">
            <p class="name">{{item.title}}</p>
          </van-col>
          <!--<van-col span="6" v-if="item.id !== 4">-->
            <!--<p class="num">{{item.share || 0}}</p>-->
            <!--<p>分享</p>-->
          <!--</van-col>-->
          <van-col span="9">
            <p class="num">{{item.view || 0}}</p>
            <p>浏览</p>
          </van-col>
          <van-col span="9">
            <p class="num">{{item.order || 0}}</p>
            <p>订单</p>
          </van-col>
        </van-row>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderBar from '@/components/header/sale_union'
import {getShareReport} from '@/api/sale_union'
// import {shareReport} from '@/assets/js/mixins/shareReport'
export default {
  name: 'my_share',
  components: {
    HeaderBar
  },
  // mixins: [shareReport],
  data() {
    return {
      shareReport: {}
    }
  },
  mounted(){
    this.shareInit()
    console.log(this.shareReport)
  },
  methods: {
    async shareInit() {
      let {code,data} = await getShareReport()
      let _obj = {}
      if(code === 0) {
        _obj.total = data.total
        _obj.platform = this._normalizeData(data.platform)
      }
      this.shareReport = _obj
    },
    _normalizeData(lists){
      let _obj = {
        'weixin': '微信好友',
        'qq': 'QQ好友',
        'sinaweibo':'新浪微博',
        'm': '文章链接',
      }
      lists.forEach(item => {
        item.image = require(`../../../assets/imgs/union/${item.platform}@2x.png`)
        item.title = _obj[item.platform]
      })
      return lists
    },
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  @import "~/assets/style/union/list.scss";
</style>
