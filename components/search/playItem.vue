<template>
  <div class="sort-box" v-if="dayShow">
    <div class="setitem">
      <span @click="selectDayItem(2)" :class="checkitem==2?'active':''"> {{$t('allType')}}</span>
      <span @click="selectDayItem(4)" :class="checkitem==4?'active':''">{{$t('tours.tickets')}}</span>
      <span @click="selectDayItem(5)" :class="checkitem==5?'active':''">{{$t('tours.aDayTrip')}}</span>
    </div>

  </div>
</template>

<script>
export default {
  name: 'sortItem',
  props: {
    dayShow: {
      type: Boolean,
      default: false
    },
    checkitem: {
      type: Number,
      default: null
    }
  },
  created() {

  },
  methods: {
    selectDayItem(item) {
      console.log(item)
      this.$emit('selectSort', item)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .sort-box{
    width: 100%;
    position: fixed;
    top:264px;
    bottom: 0;
    background:rgba(0,0,0,.45);
    font-size:28px;
    .active{
      color: #EF9A1A;
    }
  }
  .setitem{
    width: 100%;
    background-color: #fff;
    padding: 30px 0 30px 30px;
    span{
      width:155px;
      height:60px;
      margin:0 22px 12px 0;
      line-height: 60px;
      border-radius:12px;
      font-size:24px;
      display: inline-block;
      text-align: center;
      background-color: #F1F1F1;
      color: #2D2D2D;
    }
    .active{
      background-color: #EF9A1A;
      color: #fff;
    }
  }
</style>
