<template>
  <div>
    <van-nav-bar class="layout-header tours-no-bb classBg show-bg"
                 ref="layoutHeader"
                 fixed
                 :z-index="999"
                 @click-left="leftClick">
      <van-icon class="left-wrap"
                name="arrow-left"
                slot="left"/>
      <van-icon class="right-wrap" slot="right">
        <div class="big-search">
          <div :class="isSearch ? 'has-keyword': ''">
            <div class="search-box" >
              <van-icon name="search" />
              <input class="box" show-action v-model="query1" @search="getpro" />
            </div>
            <div class="search-btn" @click="getpro" v-if="isSearch">{{$t('headerSearch.search')}}</div>
          </div>
        </div>
      </van-icon>
    </van-nav-bar>
    <div class="product-list">
      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="datax.length>0">
        <van-list v-model="isLoading" :finished="prodFinished" :finished-text="$t('noMore')" @load="onLoad" :immediate-check="false">
          <template v-if="datax.length">
            <van-cell v-for="(data,ind) in datax" :key="ind">
              <div class="product-item" @click="selectDetail(data.article_id)" target="_blank">
                <div class="box-img">
                  <img :src="data.cover" alt="">
                </div>
                <div class="con">
                  <div class="p1" v-html="data.name.length>30?data.name.substr(0,26)+'...':data.name"></div>
                  <p class="p2">
                    <img :src="data.create_user.face" alt="">
                    <span style="color:#575757;" v-if="data.create_user.name"
                          v-html="data.create_user.name.length>6?data.create_user.name.substr(0,6)+'....':data.create_user.name"
                    ></span>
                    <span style="color:#575757;" v-else>佚名</span>

                    <span>阅读{{data.read_count}}</span>
                    <span>评论{{data.comment_count}}</span>
                  </p>
                  <p class="p3">
                    <span>{{data.create_at.substr(0,10)}}</span>
                    <span v-if="data.relate_position!=''">
                      <img src="../../assets/imgs/addres.png" alt="">
                      <a v-html="data.relate_position.length>7?data.relate_position.substr(0,5)+'...':data.relate_position"></a>
                    </span>
                  </p>
                </div>
              </div>
            </van-cell>
          </template>
          <!--<div v-else>暂无数据</div>-->
        </van-list>
      </van-pull-refresh>
    </div>
  </div>

</template>

<script>
  import {getattack} from '@/api/products'

  export default {
    name: 'productList',
    filters: {
      showInt(val) {
        if(val){
          return val.split('.')[0]
        }
      },
    },
    data(){
      return {
        isShowFx: false,
        isLoading: false,
        datax:[],
        pagination:{
          page:1,
        },
        objid:this.$route.query.id||202,
        prodFinished:false,
        showTag:false,
        query1:'',//关键字
        isSearch:false,
      }
    },
    computed: {
      iconTour() {
        return this.data.icons_tour
      },
    },
    watch:{
      'query1':function (val,oldval) {
        if(val!=''){
          this. isSearch=true
        }
        else{
          this. isSearch=false
        }
      }
    },
    mounted(){
      this.getpro()
    },
    methods: {
      selectDetail(attackId) {
        this.$router.push({
          path: '/attack/detail',
          query: {
            'attackId':attackId
          }
        });
      },
      async getpro() {
        this.datax=[];
        let {code, data} = await getattack({
          page:1,
          keyword:this.query1
        })
        if (code === 0) {
          this.datax=data.items;
          this.pagination=data.pagination;
        }

      },
      // 滑动会请求数据
      async onLoad() {
        // 获取数据
        let that=this;
        let {code, data } = await getattack({
          page:that.pagination.page+1,
          keyword:that.query1
        })
        if (code === 0) {
          that.datax.push(...data.items)
          that.pagination=data.pagination;
          that.isLoading = false
          // 数据全部加载完成
          if (that.pagination.total_page==that.pagination.page) {
            that.prodFinished = true
          }
        }
      },
      // 返回上一级
      leftClick() {
        this.$router.go(-1)

      },
      // 上拉刷新
      async onRefresh(){
        // 获取数据
        let that=this;
        that.datax=[];
        let {code, data} = await getattack({
          page:1,
          coupon_id:this.objid
        })
        if (code === 0) {
          this.datax=data.items;
          this.pagination=data.pagination;
          that.isLoading = false
          // 数据全部加载完成
          if (that.pagination.total_page==that.pagination.page) {
            that.prodFinished = true
          }

        }

      },
    }
  }
</script>
<style>
  body{
    overflow: scroll!important;
    position: relative!important;
  }
</style>
<style type="text/scss" lang="scss" scoped>
  .layout-header {
    height: 88px;
    font-size: 32px;
    color: #eee;
    background-color: transparent;
    transition: all 0.5s;
    overflow: hidden;
    &.show-bg {
      background-color: #fff;
      color: #191919;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);
      .left-wrap {
        /*color: #191919;*/
      }
    }
    .right-wrap {
      .big-search{
        width: 634px;
        height: 72px;
      }
      .van-search{
        background: #fff !important;
        border-radius:36px;
        height: 72px;
        padding: 0;
      }
    }
  }
  .search-box{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    -webkit-align-items: center;
    box-sizing: border-box;
    width:618px;
    padding: 0 6px 0 20px;
    height:68px;
    background: #DBDBDB;
    border-radius:36px;
    overflow: hidden;
    i.van-icon-search{
      color: #fff;
      font-size: 40px;
    }
    .box{
      width: 550px;
      border: none;
      outline: 0;
      color: #666;
      background: #DBDBDB;
      padding: 10px 0;
      line-height: 40px;
      &.list{
        width: 470px !important;
      }
    }
    input{

    }
    i.van-icon-clear{
      color: #666;
      padding-right: 10px;
    }
  }
  .has-keyword{
    display: flex;
    display: -webkit-flex;
    align-items: center;
    justify-content: center;
    .search-box{
      flex: 1;
      -webkit-flex: 1;
      align-items: center;
      .box{
        width: 460px;
        padding: 10px 0;
      }
    }
    .search-btn{
      line-height: 72px;
      padding-left: 10px;
      color: #00ABF9;
    }
    .personal-btn{
      font-size: 48px !important;
      padding-left: 10px;
      i{
        vertical-align: bottom;
        font-size: 48px !important;
      }
    }
  }
  .product-list{
    padding-top: 70px;
    .product-item{
      width:750px;
      height:300px ;
      padding-top: 10px;
      box-sizing: border-box;
      .box-img{
        width: 240px;
        display: inline-block;
        height: 240px;
        border-radius:12px;
        overflow: hidden;
        position: absolute;
        background-color: #dedede;
        box-shadow:0px 0px 12px rgba(52,52,52,0.2);
        img{
          width: 240px;
          height: 240px;
        }
      }
      .con{
        padding:20px 28px 20px 180px ;
        margin-top: 36px;
        width: 620px;
        height: 240px;
        box-sizing: border-box;
        background:rgba(255,255,255,1);
        box-shadow:0px 0px 28px rgba(52,52,52,0.2);
        border-radius: 12px;
        margin-left: 60px;
        .p1{
          width: 418px;
          font-size: 28px!important;
          color: #2d2d2d;
          line-height: 44px;
          padding-left: 20px;
          height: 110px;
          padding-bottom: 20px;
        }
        .p2{
          width: 418px;
          height: 48px;
          font-size: 24px;
          color: #d4d4d4;
          line-height: 48px;
          img{
            width: 48px;
            height: 48px;
            background-color: #cfcfcf;
            margin-left: 20px;
            border-radius: 48px;
            display: inline-block;
            position: relative;
            top: 16px;

          }
          span{
            margin-left: 12px;
          }
        }
        .p3{
          width: 418px;
          height: 48px;
          font-size: 24px;
          text-align: right;
          color: #d4d4d4;
          margin-top: 8px;
          span{
            margin-left: 20px;
            line-height: 36px;
            display: inline-block;
            img{
              width: 16px;
              height: 21px;
              display: inline-block;
            }
          }


        }
      }

    }
  }
  .setcop{
    width:750px;
    height:88px;
    background:rgba(254,248,236,1);
    opacity:1;
    line-height: 88px;
    text-align: center;
    font-size: 24px;
    color: #FBA35A;
  }
  .setspecial{
    display: inline-block;
    margin-right: 10px;
    font-size: 20px;
    font-weight: 300;
    color:rgba(251,96,93,1);
    position: relative;
    overflow: hidden;
    padding: 2px 0 0 0 ;
  }
  .ileft{
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: #fff;
    position: absolute;
    border: 2px solid rgba(251,96,93,1);
    margin-top: 15px;
    margin-left: -7px;
  }
  .iright{
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 14px;
    background-color: #fff;
    position: absolute;
    border: 2px solid rgba(251,96,93,1);
    margin-top: -28px;
    margin-left:calc(100% - 7px);
  }
  .icon{
    border: 2px solid rgba(251,96,93,1);
    padding: 10px 14px 10px 10px;
    line-height: 20px;
    border-radius: 8px;
    display: inline-block;
  }
</style>
