<template>
  <div class="city-wrap">
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      v-if="multiple"
      :leftText="title"
    />
    <div class="main">
      <div v-for="list in dataList" :key="list.key">
        <div class="title">{{list.key}}</div>
        <ul class="city-list">
          <li v-for="item in list.list" :key="item.id" @click="selectItem(item)" :class="selectActive(item)">{{item.name}}</li>
        </ul>
      </div>
    </div>
    <div class="tags-letter">
      <ul>
        <li v-for="list in dataList" :key="list.key">{{list.key}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cityList',
  props: {
    dataList: { // 数据来源
      type: Array,
      default: null
    },
    multiple: {  // 是否多选
      type: Boolean,
      default: false
    },
    title: { // 多选时候配置
      type: String,
      default: ''
    }
  },
  data(){
    return{
      activeList:[]
    }
  },
  methods: {
    onClickLeft () {
      this.$emit('slectItem', this.activeList)
    },
    selectItem(item) {
      if(this.multiple) {
        this.activeList.push(item.id)
      } else {
        this.activeList = [item.id]
      }
    },
    selectActive(item) {
      return this.activeList.indexOf(item.id) >=0 ? 'active': ''
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .city-wrap{
    width: 100%;
    background-color: #fff;
    .title {
      padding: 0 36px;
      height:32px;
      background:#F1F1F1;
      font-size:22px;
      line-height: 32px;
      color: #C7C7C7;
    }
    .city-list{
      padding: 0 36px;
      li {
        line-height: 80px;
        height: 80px;
        border-bottom: 2px solid #D8D8D8;
        font-size: 22px;
        &:last-child{
          border-bottom: none;
        }
        &.active{
          color: #EF9A1A;
        }
      }
    }
    .tags-letter{
      width: 16px;
      position: fixed;
      right: 10px;
      top: 500px;
      li{
        color: #399EF6;
        font-size:18px;
        line-height:40px;
      }
    }
  }
</style>
