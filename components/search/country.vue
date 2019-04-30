<template>
  <div class="search-main">
    <div class="country-bg" @click="selectCountryLine(data.allLines)">
      <img :src="data.allLines.image" alt="">
      <div class="desc">{{data.cityName}}{{$t('searchComp.allWay')}}{{data.allLines.content}}条</div>
    </div>
    <div class="hot-box" v-if="data.hotTarget && data.hotTarget.length">
      <h2>{{$t('searchComp.hotDestinations')}}</h2>
      <hot-place :lists="data.hotTarget" :isDesc="false" @selectDetail="selectDetail"></hot-place>
    </div>
    <div class="result-line" v-if="data.allArea && data.allArea.length">
      <h2>{{$t('searchCompallDestinations')}}</h2>
      <div class="line">
        <hot-city-tag v-for="line in data.allArea"
                      :key="line.id"
                      :className="line.active ? 'active' : 'normal'"
                      @callOnTagKeywords="selectDetailKeyword"
                      :isKeywords="true"
                      :tag="line" />
      </div>
    </div>
  </div>
</template>

<script>
import HotPlace from '@/components/hot_place/index.vue'
import HotCityTag from '@/components/tags/index.vue'
export default {
  name: 'country',
  components: {
    HotPlace,
    HotCityTag
  },
  props: {
    data: {
      type: Object,
      default: null
    }
  },
  created() {
    console.log(this.data)
  },
  methods: {
    selectDetail(item){
      this.$emit('selectDetail', item)
    },
    selectCountryLine(line) {
      let {category} = line
      this.$emit('selectDetailLine', category)
    },
    selectDetailKeyword(value) {
      this.$emit('selectDetailKeyword', value)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .country-bg{
    width:518px;
    height:120px;
    position: relative;
    background-color: #d8d8d8;
    border-radius: 8px;
    overflow: hidden;
    img{
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .desc{
      position: relative;
      z-index: 4;
      line-height: 120px;
      font-size:28px;
      color: #FFFFFF;
      padding-left: 18px;
    }
  }
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
  }
</style>
