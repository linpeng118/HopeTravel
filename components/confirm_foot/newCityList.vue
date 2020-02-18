<template>
  <div class="tag-wrap">

    <div class="filter-content" ref="cityWrap">
      <div class="show-list" v-if="showList">
        <div class="city-wrap">
          <van-nav-bar class="login-header tours-no-bb"
                       ref="loginHeader"
                       :title="$t('confirmFootComp.titleCityList')"
                       :z-index="999"
                       fixed
                       @click-left="onClickLeft"
                       @click-right="onClickRight">
            <van-icon class="left-wrap" name="arrow-left" slot="left" />
            <van-icon class="right-wrap" name="search" slot="right" />
          </van-nav-bar>
          <div class="main">
            <div v-for="(value, key) in dataObj" :key="key" :ref="'listGroup' + key">
              <template v-if="typeof value === 'object'">
                <div class="title" v-if="key !== 'title' && key!== 'type'">
                  {{key.toUpperCase()}}
                  
                  </div>
                <ul class="city-list" >
                  <li v-for="item in value" :key="item.id" @click="selectItem(item)" :class="selectActive(item)">
                    <span>{{item.name}}</span>
                    <i class="van-icon van-icon-success"></i>
                  </li>
                </ul>
              </template>
            </div>
          </div>
          <div class="tags-letter" @touchstart.stop.prevent="onShortcutTouchStart">
          <ul>
          <li v-for="(value, key) in dataObj" :key="key" :data-index="key">
          <template v-if="typeof value === 'object'&&key!=='热门'">
          <!-- <span v-if="key!=='热门'">{{key}}</span><span v-else>{{key.slice(0,1)}}</span> -->
          {{key.toUpperCase()}}
          </template>
          <template v-if="typeof value === 'object'&&key==='热门'">
          <!-- <span v-if="key!=='热门'">{{key}}</span><span v-else>{{key.slice(0,1)}}</span> -->
          {{key.slice(0,1)}}
          </template>
          </li>
          </ul>
          </div>
        </div>
      </div>
      <div class="search-list" v-if="showSearch">
        <div class="searchHeader">
          <div class="SearchTop">
             <van-icon class="leftSearch" name="arrow-left" @click="onSearchLeft"/>
          </div> 
          <div class="SearchMain">
              <span>{{$t('confirmFootComp.titleCityList')}}</span>
              <van-icon class="rightSearch" name="cross" @click="onSearchRight"/>
          </div>
          <input type="text" v-model="searchKeyword">
        </div>
        <div class="searchBody">
          <ul>
            <li v-for="(value,index) in searchList" :key="index" @click="selectItemSearch(value)">
              <span>{{value.name}}</span>
            </li>
          </ul>
        </div>
      </div>
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
      activeList:[],
      showList: true,//正常展示国家列表
      showSearch:false,//是否展示搜索
      searchList:[],//搜索出来的数据
      searchKeyword:'',//搜索的关键词
      // listData:[],//列表数据
      // tagsData:[],//侧边索引数据
    }
  },
  watch:{
    searchKeyword(curVal,oldVal){
     // 实现input连续输入，只发一次请求
        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.searchKey(curVal);
        }, 300);
       
    }
  },
  created() {
    this.touch = {}
    // let arr = [],obj={};
    //   arr = this.dataObj['列表'];
    //   arr['热门'] = this.dataObj['热门'];
    //  this.listData = new Array(arr);
    //  this.listData[0].sort(-1);
    // this.listData = this.dataObj['列表'].push(this.dataObj['热门']);
    // this.tagsData = this.dataObj['热门'];
    // console.log('this.listData',this.listData,this.listData[0]);
    
  },
  
  methods: {
    //搜索关键词
    searchKey(curVal){
      let hash = {};
      for (let key in this.dataObj) {
          this.dataObj[key].map((value,index)=>{
          if(value.name.match(curVal)){
            /* if(!this.searchList[index].includes(value)){
              this.searchList.push(value)
            } */
            this.searchList.push(value)
           
          }
        })
        
      }
      //搜索列表对象去重
      //根据id相同来去重
       this.searchList = this.searchList.reduce(function(item, next) {
              hash[next.id] ? '' : hash[next.id] = true && item.push(next);
              return item
            }, [])
      if(!curVal){
         this.searchList = [];
      }
      console.log(this.searchList);
      
    },
    //搜索栏left slot点击
    onSearchLeft(){
      this.showSearch = false;
      this.showList=true;
      this.searchKeyword = "";
      this.searchList = [];
    },
    //搜索栏right slot点击
    onSearchRight(){
      this.showSearch = false;
      this.showList=true;
      this.searchKeyword = "";
      this.searchList = [];
    },
    //搜索
    onClickRight(){
      this.showSearch = true;
      this.showList=false;
    },
    // 返回
    onClickLeft () {
      this.activeList = [] // 清空数据
      this.$emit('back')
    },
    // 点击每一项
    selectItem(item) {
      // console.log(this.dataObj)
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
    selectItemSearch(item) {
      // console.log(this.dataObj)
      this.showSearch = false;
      this.showList = true;
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
      console.log(this.activeList);
      
      this.$emit('selectItem', this.activeList, this.dataObj.type)
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
  }
  .filter-content{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: #fff;
    padding-bottom: 1.333333rem;
    overflow-y: auto;
    .city-wrap{
      width: 100%;
      background-color: #fff;
      padding: 84px 72px 0;
      .title {
        height:32px;
        // background:#F1F1F1;
        font-size:22px;
        line-height: 32px;
        color: #C7C7C7;
        margin-top: 32px;
      }
      .city-list{
        li {
          /* line-height: 80px;
          height: 80px;
          border-bottom: 2px solid #D8D8D8;
          font-size: 22px; */
          height: 90px;
          font-size:32px;
          font-weight:500;
          line-height:44px;
          border-bottom: 2px solid #D8D8D8;
          display: flex;
          display: -webkit-flex;
          justify-content: space-between;
          -webkit-justify-content: space-between;
          align-items: center;
          -webkit-align-items: center;
          i{
            display: none;
          }
          &:first-child{
            height: 80px;
          }
          /* &:last-child{
            border-bottom: none;
          } */
          &.active{
            color: #1989fa;
            i{
              display: inline-block;
            }
          }
        }
      }
      .tags-letter{
        width: 20px;
        position: fixed;
        right: 18px;
        top: 356px;
        // transform: translateY(-50%);
        text-align: center;
        li{
          color: #399EF6;
          font-size:20px;
          font-weight:bold;
          line-height:30px;
        }
      }
    }
    .main{
      margin-top: 16px;
      .title{
        font-size:26px;
        font-weight:400;
        line-height:36px;
      }
    }
    .search-list{
      background-color: #535353;
      position: relative;
      height: 100%;
      padding-top: 240px;
      .searchHeader{
        position: fixed;
        left: 0;
        top: 0;
        padding: 20px 60px 0;
        background-color: #fff;
        input{
          width:632px;
          height:64px;
          background-color: #D5D5D5;
          border-radius:32px;
          outline: none;
          border: 0;
          margin: 16px 0 8px;
          padding:10px 36px;  
          font-size:32px;
          font-weight:400;
          line-height:30px;
        }
        .SearchTop{
          width: 100%;
          font-size: 40px;
          color: #000;
        }
        .SearchMain{
          position: relative;
          span{
            width:420px;
            height:84px;
            font-size:60px;
            font-weight:600;
            line-height:84px;
          }
          .rightSearch{
            font-size: 60px ;
            color: #000;
            position: absolute;
            right: 0;
            top: 50%;
            transform: translateY(-50%);
          }
        }
      }
      .searchBody{
        width:100%;
        ul{
          padding: 10px 72px 0;
          height: 900px;
          overflow-y: auto; 
          li{
            height: 82px;
            border-bottom:2px solid #E0E0E0;
            position: relative;
            &:last-child{
              border: 0;
            }
            span{
              height:44px;
              font-size:32px;
              font-weight:500;
              line-height:44px;
              color: #fff;
              position: absolute;
              top: 50%;
              transform: translateY(-50%);
            }
          }
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
  .login-header {
     height: 84px;
     font-size: 60px;
     color: #191919;
     background-color: #fff;
     box-shadow:0px 4px 12px rgba(0,0,0,0.14);
     transition: all 0.5s;
      .left-wrap {
        color: #000 !important;
        font-size: 40px !important;
      }
      .van-nav-bar__title{
        font-size:60px;
        font-weight:600;
        line-height:82px;
        margin-left: 70px;
      }
      .right-wrap {
        color: #000 !important;
        width: 100% !important;
        font-size: 56px !important;
      }
     /*  .leftSearch{
        color: #000 !important; 
        font-size: 40px !important;
      }
      .rightSearch{
        font-size: 60px !important;
        color: #000 !important;
      } */
   }
  
</style>
