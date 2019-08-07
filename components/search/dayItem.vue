<template>
  <div class="sort-box" v-if="dayShow" @click="closeLayer">
    <div class="setitem" @click.stop>
      <span v-for="(item,ind) in dayResult.items" @click="selectDayItem(item)" :key="ind" :class="checkedClass(item)">{{item.name}}</span>
    </div>
    <div style="background-color: #F1F1F1" @click.stop>
      <van-row class="day-btn">
        <van-col span="12">
          <van-button type="default" block @click="cancelDay">{{$t('reset')}}</van-button>
        </van-col>
        <van-col span="12">
          <van-button type="info" block @click="selectDay">{{$t('chosen')}}</van-button>
        </van-col>
      </van-row>
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
    dayResult: {
      type: Object,
      default: null
    },
    checkitem: {
      type: String,
      default: ''
    }
  },
  data(){
    return {
      selectItems: []
    }
  },
  watch:{
    selectItems(newValue){

    }
  },
  created() {
    if(this.checkitem){
      this.selectItems = this.checkitem.split(',')
    }
  },
  methods: {
    selectDayItem(item) {
      this.selectItems.push(item.id + '')
      console.log(this.selectItems)
    },
    closeLayer() {
      this.$emit('close')
    },
    cancelDay(){
      this.selectItems = []
      this.$emit('deleteDay')
    },
    selectDay(){
      this.$emit('selectSort', this.selectItems.toString())
    },
    checkedClass(item){
      let id = item.id + ''
      return this.selectItems.indexOf(id) >=0 ? 'active':''
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
  .day-btn{
    button{
      border-radius: 0;
    }
  }
</style>
