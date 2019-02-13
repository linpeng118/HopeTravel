<template>
  <div class="tag-wrap">
    <div class="filter-content">
      <div class="show-list">
        <div class="city-wrap">
          <van-nav-bar
            left-arrow
            @click-left="onClickLeft"
            v-if="showBar"
            :leftText="dataObj.title"
          />
          <div class="main">
            <div v-for="(value, key) in dataObj" :key="key">
              <template v-if="typeof value === 'object'">
                <div class="title" v-if="key !== 'title' && key!== 'type'">{{key}}</div>
                <ul class="city-list">
                  <li v-for="item in value" :key="item.id" @click="selectItem(item)" :class="selectActive(item)">
                    <span>{{item.name}}</span>
                    <i class="van-icon van-icon-success"></i>
                  </li>
                </ul>
              </template>
            </div>
          </div>
          <!--<div class="tags-letter">-->
          <!--<ul>-->
          <!--<li v-for="(value, key) in dataObj" :key="key">-->
          <!--<span v-if="typeof value === 'object'">-->
          <!--{{key}}-->
          <!--</span>-->
          <!--</li>-->
          <!--</ul>-->
          <!--</div>-->

        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="left" @click="reset">清除</div>
      <div class="right" @click="sendEvent">选中</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cityList',
  props: {
    dataObj: { // 数据来源
      type: Object,
      default: null
      // 数据格式为{'D': [{id:0,name:'大阪',key:'D'}]}
    },
    multiple: {  // 是否多选
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    showBar: { // 是否显示顶部bar
      type: Boolean,
      default: false
    }
  },
  data(){
    return{
      activeList:[]
    }
  },
  created() {
    // console.log(this.dataObj.type)
  },
  methods: {
    // 返回
    onClickLeft () {
      this.activeList = [] // 清空数据
      this.$emit('back')
    },
    // 点击每一项
    selectItem(item) {
      let index = this.activeList.findIndex(list => (item.id === list.id))
      if(index >= 0) {
        this.activeList.splice(index, 1)
      } else {
        if(this.multiple) {
          this.activeList.push(item)
        } else {
          this.activeList = [item]
        }
      }
    },
    // 视觉上判断是否选中
    selectActive(item) {
      let index = this.activeList.findIndex(list => (item.id === list.id))
      return index >=0 ? 'active' : ''
    },
    // 重置数据
    reset() {
      this.activeList = [] // 清空数据
    },
    // 派发事件
    sendEvent(){
      this.$emit('selectItem', this.activeList, this.dataObj.type)
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .tag-wrap{
  }
  .filter-content{
    position: absolute;
    top: 2.213333rem;
    bottom: 1.173333rem;
    left: 100px;
    right: 0;
    background-color: #fff;
    padding-bottom: 1.333333rem;
    overflow-y: auto;
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
          display: flex;
          justify-content: space-between;
          align-items: center;
          i{
            display: none;
          }
          &:last-child{
            border-bottom: none;
          }
          &.active{
            color: #EF9A1A;
            i{
              display: inline-block;
            }
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
  }
  .bottom-btn{
    height:88px;
    position: fixed;
    bottom: 88px;
    left: 100px;
    right: 0;
    background-color: #fff;
    display: flex;
    box-shadow:0px -1px 10px rgba(0,0,0,0.16);
    .left,.right{
      width: 50%;
      line-height: 100px;
      font-size:32px;
      text-align: center;
      color: #191919;
    }
    .right{
      background-color: #399EF6;
      color: #fff;
    }
  }
</style>
