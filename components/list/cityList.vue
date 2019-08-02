<template>
  <div>
    <van-nav-bar
      left-arrow
      @click-left="onClickLeft"
      v-if="showBar"
      :leftText="dataObj.title"
      class="fixed-title"
    />
    <div class="filter-content" ref="cityWrap">
      <div class="city-wrap">
        <div class="main">
          <div v-for="(value, key) in dataObj" :key="key" :ref="'listGroup' + key">
            <template v-if="typeof value === 'object'">
              <div class="title" v-if="key !== 'title' && key!== 'type'">{{key}}</div>
              <ul class="city-list" >
                <li v-for="item in value" :key="item.id" @click="selectItem(item)" :class="selectActive(item)">
                  <span>{{item.name}}</span>
                  <i class="van-icon van-icon-success"></i>
                </li>
              </ul>
            </template>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom-btn">
      <div class="left" @click="reset">{{$t('listComp.eliminate')}}</div>
      <div class="right" @click="sendEvent">{{$t('listComp.selection')}}</div>
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
    },
    title: {
      type: String,
      default: ''
    },
    showBar: {
      type: Boolean,
      default: false
    },
    filterSelect:{
      type: String,
      default: ''
    }
  },
  data(){
    return{
    }
  },
  methods: {
    // 返回
    onClickLeft () {
      this.$emit('back')
    },
    // 点击每一项
    selectItem(item) {
      this.$emit('selectItem', item.id.toString(), this.dataObj.type)

    },
    // 视觉上判断是否选中
    selectActive(item) {
      if(this.filterSelect) {
        let index = this.filterSelect.split(',').findIndex(id => (item.id == id))
        return index >=0 ? 'active' : ''
      }
    },
    // 重置数据
    reset() {
      this.$emit('selectItemCancel', this.dataObj.type)
    },
    // 派发事件
    sendEvent(){
      this.$emit('select')
    },
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .filter-content{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 100px;
    right: 0;
    background-color: #fff;
    padding-bottom: 1.333333rem;
    overflow-y: auto;
    .city-wrap{
      width: 100%;
      background-color: #fff;
      .main{
        padding-top: 88px;
      }
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
          display: -webkit-flex;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          align-items: center;
          -webkit-align-items: center;
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
        width: 50px;
        position: fixed;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        text-align: center;
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
    bottom: 0;
    left: 100px;
    right: 0;
    background-color: #fff;
    display: flex;
    display: -webkit-flex;
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
  .fixed-title{
    position: fixed;
    top: -1px;
    left: 100px;
    width: 100%;
    height: 88px;
  }
</style>
