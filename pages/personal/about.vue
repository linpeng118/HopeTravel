<template>
  <div class="personal-about-page">
    <normal-header title="关于稀饭" />
    <div class="banner"></div>
    <van-cell v-for="item in aboutList"
      :key="item.type"
      :value="item.value"
      :is-link="item.isRightIcon"
      @click="onCell(item)">
      <template slot="title">
        <img class="cell-icon"
          :src="item.icon"
          alt="icon">
        <span class="custom-text">{{item.title}}</span>
      </template>
    </van-cell>
  </div>
</template>

<script>
  import NormalHeader from '@/components/header/normal'

  const SETTING = {
    CHANGE_PSW: 'changePsw',
    ABOUT: 'about',
    VERSION: 'version',
    GRADE: 'grade',
    CLEAR_CACHE: 'clearCache',
  }

  export default {
    components: {
      NormalHeader
    },
    data() {
      return {
        aboutList: [
          {type: SETTING.CHANGE_PSW, icon: require('~/assets/imgs/personal/about_1@2x.png'), title: '微信公众号', isRightIcon: true, value: '', path: '/personal/wx'},
          {type: SETTING.ABOUT, icon: require('~/assets/imgs/personal/about_2@2x.png'), title: '关于稀饭', isRightIcon: true, value: '', path: '/protocol/about'},
          {type: SETTING.VERSION, icon: require('~/assets/imgs/personal/about_3@2x.png'), title: '用户服务协议', isRightIcon: true, value: '', path: '/protocol/user'},
          {type: SETTING.GRADE, icon: require('~/assets/imgs/personal/about_4@2x.png'), title: '隐私保护', isRightIcon: true, value: '', path: '/protocol/xifan'},
        ]
      }
    },
    computed: {},
    mounted() {},
    methods: {
      onCell(item) {
        this.$router.push({
          path: item.path
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
  .personal-about-page {
    .banner {
      margin: 0 auto;
      padding: 44px 0;
      width: 484px;
      height: 200px;
      background: url("../../assets/imgs/personal/xifan@2x.png") no-repeat 0 0/100%
        100%;
    }
    .cell-icon {
      vertical-align: middle;
      width: 48px;
      height: 48px;
    }
  }
</style>