<template>
    <div class="search-main">
        <div class="result-line">
            <h2 v-if="titleList">{{titleList.lineTitle}}</h2>
            <div class="line">
                <hot-city-tag v-for="line in data.lineList" :key="line.id" :className="line.is_hot ? 'active' : 'normal'" @callOnTag="selectDetail" :tag="line" />
            </div>
        </div>
        <!--热门景点-->
        <div class="hot-box">
            <h2 v-if="titleList">{{titleList.hotTitle}}</h2>
            <hot-place :lists="data.hotPlace" @selectDetail="selectDetail"></hot-place>
        </div>
        <div class="hot-box">
            <h2 v-if="titleList">{{titleList.targetTitle}}</h2>
            <hot-place :lists="data.hotTarget" @selectDetail="selectDetail" :isDesc="false"></hot-place>
        </div>
        <div class="play-box">
            <h2 v-if="titleList">{{titleList.playTitle}}</h2>
            <div class="play-ways" v-for="play in data.playWaysList" :key="play.id" @click="selectDetailPlay(play)">
                <img :src="play.image" alt="">
                <div class="title">
                    <span>{{play.content}}</span>
                    <span class="desc">{{play.subTitle}}</span>
                </div>
            </div>
            <!--<play-ways v-for="play in data.playWaysList" :key="play.id" :item="play"></play-ways>-->
        </div>
    </div>
</template>

<script>
    import HotCityTag from '@/components/tags/index.vue'
    import HotPlace from '@/components/hot_place/index.vue'
    import PlayWays from '@/components/play_ways/index.vue'
    export default {
        name: 'recommend',
        components: {
            HotCityTag,
            HotPlace,
            PlayWays
        },
        props: {
            data: {
                type: Object,
                default: () => ({
                    lineList: [],
                    hotPlace: [],
                    hotTarget: [],
                    playWaysList: []
                })
            },
            titleList: {
                type: Object,
                default: null
            }
        },
        mounted() {},
        methods: {
            selectDetail(item, items) {
                this.$emit('selectDetail', item, items)
            },
            selectDetailPlay(play) {
                console.log(33312131, play)
                let {
                    category,
                    product_type,
                    span_city,
                    start_city
                } = play
                let item = {
                    category,
                    product_type,
                    span_city,
                    start_city
                }
                // console.log(item)
                this.$emit('selectDetail', item, play)
            }
        }
    }

</script>

<style type="text/scss" lang="scss" scoped>
    .search-main{
    h2{
      padding: 10px 0 20px 0;
      font-size:28px;
      color: #9A9A9A;
    }
    .active{
      background-color: #00ABF9;
      color: #fff;
    }
    .play-ways{
      padding: 12px 0 20px 0;
      img {
        width:506px;
        height:120px;
        border-radius:8px;
      }
      .title{
        font-size:24px;
        color: #000;
        font-weight: 400;
        span.desc{
          font-size:22px;
          color: #BEBEBE;
        }
      }
    }
  }
</style>
