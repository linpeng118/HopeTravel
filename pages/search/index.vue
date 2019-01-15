<template>
  <div>
    <lay-header title="搜索" :isSearch="false" :classBg="true" :barSearch="true" searchKeyWords="城市/景点/产品/关键字"></lay-header>
    <div class="search-wrap">
      <van-badge-group :active-key="activeKey" @change="onChange" class="badge-bar">
        <van-badge title="热门推荐" />
        <van-badge title="美东"/>
        <van-badge title="美东"/>
        <van-badge title="美东"/>
      </van-badge-group>
      <recommend :data="recommendObj" v-if="activeKey === 0"></recommend>
      <country :data="countryObj"></country>
    </div>
  </div>
</template>

<script>
import LayHeader from '@/components/header/index.vue'
import Recommend from '@/components/search/recommend.vue'
import Country from '@/components/search/country.vue'
export default {
  name: 'search',
  components: {
    LayHeader,
    Recommend,
    Country
  },
  data() {
    return {
      activeKey: 0,
      recommendObj: {
        lineList: [
          {title: '美国全景',id:1},
          {title: '纽约+阿拉斯加+洛杉矶',id:2,active: true},
          {title: '美国+墨西哥',id:3, active:true},
          {title: '美国+加拿大',id:4},
          {title: '纽约+阿拉斯加+洛杉矶',id:5}
        ],
        hotPlace: [
          {id: 1, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
          {id: 2, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
          {id: 3, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '黄石国家公园', desc: '惊艳黄石'},
        ],
        hotTarget: [
          {id: 1, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '纽约'},
          {id: 2, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '洛杉矶'},
          {id: 3, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '塞班'},
          {id: 4, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '纽约'},
          {id: 5, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '洛杉矶'},
          {id: 6, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '塞班'},
        ],
        playWaysList: [
          {id: 1, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg', title: '极限体验w', desc: '挑战自己，突破极限'},
          {id: 2, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg', title: '极限体验2', desc: '挑战自己，突破极限'},
          {id: 3, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg', title: '极限体验3', desc: '挑战自己，突破极限'},
        ]
      },
      countryObj: {
        image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',
        num: 10,
        country: '北美',
        hotTarget: [
          {id: 1, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '纽约'},
          {id: 2, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '洛杉矶'},
          {id: 3, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '塞班'},
          {id: 4, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '纽约'},
          {id: 5, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '洛杉矶'},
          {id: 6, image: 'https://y.gtimg.cn/music/photo/radio/track_radio_307_13_1.jpg',title: '塞班'},
        ],
        lineList: [
          {title: '美国全景',id:1},
          {title: '纽约',id:2,},
          {title: '墨西哥',id:3,},
          {title: '美国',id:4},
          {title: '纽洛杉矶',id:5}
        ]
      }
      // searchKeyWords: ''
    }
  },
  methods: {
    onChange(key) {
      this.activeKey = key;
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .search-wrap{
    position: relative;
    top:88px;
    .badge-bar{
      position: fixed;
      top:88px;
      bottom: 0;
      width: 180px;
      background-color: #F1F1F1;
    }
    .van-badge{
      padding: 32px 0;
      font-size:28px;
      background-color: transparent;
      height: 100px;
      line-height: 36px;
      border:none;
    }
    .van-badge--select {
      background-color: #fff;
    }
    .search-main {
      flex: 1;
      padding-left: 210px;
      padding-right: 32px;
      padding-top:20px;
      .result-line{
        padding-top: 22px;
      }
    }
  }
</style>
<style>
  .search-wrap .van-badge__text{
    padding-left: 32px;
  }
  .search-wrap .van-badge--select .van-badge__text{
    border-left: 6px solid #399EF6;
  }
</style>
