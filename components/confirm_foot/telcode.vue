<template>
  <div class="tag-wrap">

    <div class="filter-content" ref="cityWrap">
      <div class="show-list">
        <div class="city-wrap">
          <van-nav-bar class="login-header tours-no-bb"
                       ref="loginHeader"
                       :title="$t('chooseCode')"
                       :z-index="999"
                       @click-left="onClickLeft">
            <van-icon class="left-wrap" name="arrow-left" slot="left" />
          </van-nav-bar>
          <div class="main">
            <div v-for="(value, key) in dataObj" :key="key" :ref="'listGroup' + key">
              <template v-if="typeof value === 'object'">
                <div class="title" v-if="key !== 'title' && key!== 'type'">{{key}}</div>
                <ul class="city-list" >
                  <li v-for="item in value" :key="item.id" @click="selectCode(item)" :class="selectActive(item)">
                    <span><a style="color: #131313">{{item.name}}</a><a style="color: #aaa">&nbsp;&nbsp;+{{item.telcode}}</a></span>
                    <i class="van-icon van-icon-success"></i>
                  </li>
                </ul>
              </template>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="tags-letter" @touchstart.stop.prevent="onShortcutTouchStart">
      <ul>
        <li v-for="(value, key) in dataObj" :key="key" :data-index="key">
          <template v-if="typeof value === 'object'&&key!='热门城市'">
            {{key}}
          </template>
        </li>
      </ul>
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
    this.touch = {}
  },
  methods: {
    // 返回
    onClickLeft () {
      this.activeList = [] // 清空数据
      this.$emit('back')
    },
    // 点击每一项
    selectCode(item) {
      console.log(this.dataObj)
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
      this.sendEvent();
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
      this.$emit('selectCode', this.activeList, this.dataObj.type)
    },
    onShortcutTouchStart(e) {
      let anchorIndex = this.getData(e.target, 'index')
      this.touch.y1 = e.touches[0].pageY;
      this.touch.anchorIndex = anchorIndex;
      console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx')
      console.log(anchorIndex)
      this._scrollTo(anchorIndex)
    },
    getData(el, name, val) {
      console.log('getData')
      const prefix = 'data-'
      name = prefix + name
      if (val) {
        return el.setAttribute(name, val)
      } else {
        console.log('coming')
        return el.getAttribute(name)
      }
    },
    _scrollTo(key) {
      this.$refs.cityWrap.scrollTop = 100;
      let top=this.$refs['listGroup' + key][0].getBoundingClientRect().top;
      this.$refs.cityWrap.scrollTop = top
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .tag-wrap{
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
  .filter-content{
    position: absolute;
    top: 0;
    bottom: 1.173333rem;
    left: 0;
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
        text-align: left;
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
          a:nth-child(1){
            width: 200px;
            display: inline-block;
          }
          i{
            display: none;
          }
          &:last-child{
            border-bottom: none;
          }
          &.active{
            color: #1989fa;
            i{
              display: inline-block;
            }
          }
        }
      }

    }
    .main{
      margin-top: 50px;
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
  }.login-header {
     height: 88px;
     font-size: 32px;
     color: #191919;
     background-color: #fff;
     box-shadow:0px 4px 12px rgba(0,0,0,0.14);
     border-bottom:1px solid rgb(238, 238, 238);
     transition: all 0.5s;
     .left-wrap {
       /*color: #404040;*/
       /*font-size: 32px;*/
     }
     .right-wrap {
       .search {
         width:92px;
         height:36px;
         background:rgba(57,158,246,1);
         opacity:1;
         color: #fff;
         border-radius:18px;
       }
     }
   }
</style>
