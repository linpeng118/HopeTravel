<template>
  <div ref="homeatt">
    <product-detail-header class="product-detail-header elsehead"
                           v-if="objdata&&showelsenav"
                           :transparent="true"
                           :title="objdata.name"
                           fixed
                           @callOnRight="onHeaderRight"
                           @callOnLeft="goBack"
                           ref="refProdctDetailHeader" />
    <div class="banner">
    <img v-if="objdata&&objdata.cover" :src="objdata.cover" alt="">
  </div>
    <!-- 右上角更多操作 -->
    <transition name="fade">
      <div class="show-more"
           v-show="showMore&&!shownav&&!showtip">
        <div class="show-more-item"
             @click="onHomePage">
          <img src="~/assets/imgs/product/icon_home@2x.png"
               alt="">
          <span class="item-title">{{$t('productDetailPage.homePage')}}</span>
        </div>
        <div class="show-more-item"
             @click="onDest">
          <img src="~/assets/imgs/product/icon_pos@2x.png"
               alt="">
          <span class="item-title">{{$t('productDetailPage.destination')}}</span>
        </div>
        <div class="show-more-item"
             @click="onFollow">
          <img src="~/assets/imgs/product/icon_star@2x.png"
               alt="">
          <span class="item-title">{{$t('productDetailPage.myFollow')}}</span>
        </div>
      </div>
    </transition>
    <div class="con" ref="homeatt2" v-if="objcon&&objcon.length">
      <div class="attack-head" v-if="objdata">
        <div class="imgbox"><img :src="objdata.create_user.face" alt=""></div>
        <div class="conbox">
          <p>
            <span style="text-align: left">{{objdata.create_user.name||'佚名'}}</span>
            <span style="text-align: right"><img src="../../assets/imgs/addres.png" alt=""> {{objdata.relate_position}}</span>
          </p>
          <p>
            <span style="text-align: left">{{objdata.create_user.brief||'未设置个性签名'}}</span>
            <span style="text-align: right">阅读{{objdata.read_count}}&nbsp;&nbsp;&nbsp;{{objdata.create_at?objdata.create_at.substr(0,10):''}}</span>
          </p>
        </div>
      </div>
      <div class="elsefix" v-if="objdata&&showtip">
        <div class="attack-head" >
          <div class="imgbox"><img :src="objdata.create_user.face" alt=""></div>
          <div class="conbox">
            <p>
              <span style="text-align: left" v-if="objdata.create_user.name"
              v-html="objdata.create_user.name.length>5?objdata.create_user.name.substr(0,4)+'....':objdata.create_user.name"
              ></span>
              <span style="text-align: left" v-else>佚名</span>
            </p>
            <p>
              <span style="text-align: left">{{objdata.create_user.brief||'未设置个性签名'}}</span>
            </p>
            <p class="elsecon"v-if="objcon">{{objcon[activeTitle].chapter_title}}</p>
            <van-icon v-if="shownav==false" name="wap-nav" class="elseicon " @click="shownav=true" />
            <van-icon v-if="shownav==true" name="arrow-up" class="elseicon " @click="shownav=false" />
          </div>
        </div>
      </div>
      <div class="elsefixbox" v-if="shownav&&showtip" @click="shownav=false">
        <div >
          <p v-for="(itemx,indx) in objcon" @click.stop="totitle(indx)" :key="indx">{{itemx.chapter_title}}</p>
        </div>
      </div>
      <div class="elsetitle">
        {{objdata.name}}
      </div>
      <div class="attack-item" v-for="(item,ind) in objcon" :key="ind" ref="title">
        <p class="titlex">{{item.chapter_title}}</p>
        <div class="conx" v-html="item.content">
        </div>
        <template v-if="item.relate_product&&item.relate_product.length">
          <div class="prox" v-for="(pro,inde) in item.relate_product" :key="inde" @click="topro(pro.product_id)">
           <div class="imgbox"><img :src="pro.image" alt=""></div>
            <div class="conbox">
              <p v-html="pro.name.length>29?pro.name.substr(0,26)+'...':pro.name"></p>
              <p><span>{{pro.default_price}}</span>&nbsp;<span>起</span></p>
            </div>
          </div>
        </template>

      </div>

    </div>
    <div class="boxfoot">
      <input type="text" v-model="searchtext">
      <label @click="subcomm()">{{$t('submit')}}</label>
      <span v-if="objdata" @click="firstload()"><img src="../../assets/imgs/ic_comment@2x.png" alt=""><i>{{objdata.comment_count}}</i></span>
      <span v-if="!isfav&&objdata" @click="addfav()"><img src="../../assets/imgs/ic_like@2x.png" alt=""><i>{{objdata.collection_count}}</i></span>
      <span v-else-if="objdata" @click="delfav()"><img src="../../assets/imgs/ic_like2@2x.png" alt=""><i>{{objdata.collection_count}}</i></span>
    </div>
    <van-popup
      v-model="showcomm"
      round
      position="bottom"
      class="popup2"
    >
    <div class="comment">
      <van-nav-bar :title="$t('attackcomm')" @click-right="showcomm=false" >
        <van-icon name="cross" slot="right"/>
      </van-nav-bar>
      <p class="elsep" v-if="objdata">{{$t('allcomm')}}{{objdata.comment_count}}条</p>

      <van-pull-refresh v-model="isLoading" @refresh="onRefresh" v-if="datacomm.length>0">
        <van-list v-model="isLoading" :finished="prodFinished" :finished-text="$t('noMore')" @load="onLoad" :immediate-check="false">
          <template v-if="datacomm.length">
            <van-cell v-for="(item,ind) in datacomm" :key="ind">
              <div class="itemcom">
                <p>{{item.user_name}} <span v-html="item.created.substr(0,10)"></span></p>
                <p v-html="item.content"></p>
              </div>
              <img :src="item.face" alt="">
            </van-cell>
          </template>

        </van-list>
      </van-pull-refresh>
      <div v-else>
        <div class="itemcom2">
        </div>
      </div>
      <p class="submitp">
        <input type="text" v-model="searchtext">
        <label @click="subcomm()">{{$t('submit')}}</label>
      </p>
    </div>
    </van-popup>

</div>
</template>
<script>
  import {getattackobj,getattackobj2,getattaccomm,upcomm,getisfa,addFavorite2,delFavorite2} from '@/api/products'
  import ProductDetailHeader from '@/components/header/productDetail'
  export default {

    name: "article-detail",
    components: {
      ProductDetailHeader,
    },
    data() {
      return {
        isApp: this.$route.query.platform,
        objid: this.$route.query.attackId,
        objdata:null,
        objcon:null,
        showcomm:false,//是否显示评论列表
        datacomm:[],
        prodFinished:false,
        searchtext:"",
        isfav:0,
        activeTitle:0,
        showtip:false,
        showMore:false,
        shownav:false,
        showelsenav:true

      };
    },
    mounted() {
      this.getpro()
      this.getisfav()
      window.addEventListener('scroll', this.menu)
    },
    methods: {
      goBack() {
        let obj= (this.$router.go(-1))?this.$router.go(-1).name:(this.$router.from.name||'')
        if(obj=='login'||obj=='article-detail'){
          this.$router.push({
            path: 'article/list'
          });
        }
        else{
          this.$router.go(-1)
        }

      },
      //第一次获取评论
      async firstload(){
        // 获取数据
        let that=this;
        that.datacomm=[]
        let {code,pagination,data} = await getattaccomm({
          page:1,
          id:that.objid
        })
        if (code === 0) {
          that.datacomm=data
          that.pagination=pagination;
          that.isLoading = false
          that.showcomm=true
          // 数据全部加载完成
          if (that.pagination.total_page==that.pagination.page) {
            that.prodFinished = true

          }

        }
      },
      async getpro() {
        this.objcon=null;
        let {code, data} = await getattackobj2(this.objid)
        if (code === 0) {
          this.objdata=data.base;
          this.objcon=data.chapters;
        }
      },
      // 是否收藏
      async getisfav() {
        let {code, data} = await getisfa(this.objid)
        if (code === 0) {
          this.isfav=data.is_favorite;
        }
      },
      // 显示右上角更多操作
      onHeaderRight() {
        this.showMore = !this.showMore
      },
      jumpTo(path) {
        this.$router.push({
          path
        })
      },
      // 返回首页
      onHomePage() {
        this.jumpTo('/')
      },
      // 搜索页面
      onDest() {
        this.jumpTo('/search')
      },
      // 搜索页面
      onPersonal() {
        this.jumpTo('/personal')
      },
      // 收藏页面
      async onFollow() {
        this.jumpTo('/personal/follow')
      },
      async addfav() {
        let {code} = await addFavorite2(this.objid)
        if (code === 0) {
          this.isfav=1;
        }
      },

      async delfav() {
        let {code,data} = await delFavorite2(this.objid)
        if (code === 0) {
          this.isfav=0;
        }
      },
      menu() {
        let a=this.$refs.title;
        let that=this;
        let st=document.documentElement.scrollTop || document.body.scrollTop;
        let st1=document.documentElement.clientHeight;
        if(st>5){
          this.showelsenav=false
          this.showMore=false
        }
        else{
          this.showelsenav=true
        }
        if(st>(st1+5)){
          this.showtip=true

        }
        else{
          this.showtip=false
          this.shownav=false
        }
        if(a&&a.length&&a.length>0){
          for(let i = 0; i < a.length; i++) {
            let a1 = a[i];
            if(st>20){
              let top = a1.offsetTop;
              if (st >= top && st <=a1.offsetHeight + top) {
                that.activeTitle=i
                break;
              }
            }
          }
        }
      },
      totitle(ind) {
        let a=this.$refs.title;
        let top = a[ind].offsetTop;
        this.shownav=false
        if(document.documentElement.scrollTop > top){
          let timer = setInterval(() => {
            document.documentElement.scrollTop = document.documentElement.scrollTop-10
            if (document.documentElement.scrollTop <= top) {
              clearInterval(timer)
            }
          }, 1)
        }
        else if(document.documentElement.scrollTop < top){
          let timer = setInterval(() => {
            let speed = Math.floor(-(document.documentElement.scrollTop - top) / 3)
            document.documentElement.scrollTop = document.documentElement.scrollTop +10
            if (document.documentElement.scrollTop >= top) {
              clearInterval(timer)
            }
          }, 1)
        }
        else{
          return false
        }


      },
      topro(productId) {
        this.$router.push({
          name: 'product-detail',
          query: {
            productId
          }
        });
      },
      // 上拉刷新
      async onRefresh(){
        // 获取数据
        let that=this;
        let {code, data} = await getattaccomm({
          page:that.pagination.page-1||1,
          id:that.objid
        })
        if (code === 0) {
          that.datacomm.push(...data.items)
          that.pagination=data.pagination;
          that.isLoading = false
          // 数据全部加载完成
          if (that.pagination.total_page==that.pagination.page) {
            that.prodFinished = true
          }

        }

      },
      // 滑动会请求数据
      async onLoad() {
        // 获取数据
        let that=this;
        let {code, data } = await upcomm({
          page:that.pagination.page+1||1,
          id:that.objid
        })
        if (code === 0) {
          that.datacomm.push(...data.items)
          that.pagination=data.pagination;
          that.isLoading = false
          // 数据全部加载完成
          if (that.pagination.total_page==that.pagination.page) {
            that.prodFinished = true
          }
        }
      },
      //提交评论
      async subcomm(){
        let that=this;
        if(that.searchtext!=''){
          let {code} = await upcomm({
            comment:that.searchtext,
            id:that.objid
          })
          if (code === 0) {
            that.searchtext=''
            that.$dialog.alert({
              message: '评论成功'
            });
          }
        }

      }
    }
  };
</script>


<style>
  .attack-item img{
    max-width: 686px;
    height: auto;
  }
  .elsehead.transparent .left-wrap, .elsehead.transparent .right-wrap{
    background: rgba(0, 0, 0, 0)!important;
    color: #fff!important;
  }
  body{
    overflow: scroll!important;
    position: relative!important;
  }

</style>
<style lang="scss" scoped>
  .product-detail-header {
    height: 88px;
    box-shadow: none!important;
  }
  .elsetitle{
    color: #2d2d2d;
    font-size: 50px;
    padding-top: 30px
  ;
  }
  .product-detail {
    padding-bottom: 144px;
    background: #f2f2f2;
    min-height: 100%;

    .banner-wrap {
      position: relative;
      .banner {
        height: 434px;
        width: 100%;

        .banner-img {
          height: 434px;
          width: 100vw;

          img {
            height: 434px;
            width: 100vw;
          }
        }

        .custom-indicator {
          position: absolute;
          right: 22px;
          bottom: 24px;
          padding: 0 14px;
          font-size: 20px;
          color: #fff;
          border-radius: 20px;
          background: rgba(0, 0, 0, 0.55);
        }
      }
      .serial-num {
        position: absolute;
        left: 22px;
        bottom: 24px;
        padding: 0 14px;
        height: 32px;
        line-height: 32px;
        background: rgba(0, 0, 0, 0.55);
        border-radius: 20px;
        font-size: 20px;
        color: rgba(255, 255, 255, 1);
        text-align: center;
      }
      .video-box{
        position: absolute;
        bottom: 24px;
        left: 50%;
        transform: translateX(-50%);
        width: 132px;
        height: 50px;
        color: #fff;
        font-size: 20px;
        padding-left: 60px;
        line-height: 50px;
        background-image: url("../../assets/imgs/icon_video@2x.png");
        background-size: cover;
      }
    }

    .product {
      padding: 20px 0;
      background: #fff;
      .setelse{
        padding: 0 24px;
      }

      .name {
        color: #3e3e3e;
        letter-spacing: 2px;
        font-size: 32px;
        padding: 0 24px;

        .prod-tag {
          padding: 2px 12px;
          width: 44px;
          height: 28px;
          font-size: 22px;
          font-weight: 400;
          line-height: 28px;
          background: rgba(239, 154, 26, 1);
          color: #fff;
          border-radius: 20px;
        }
      }

      .price-wrap {
        margin-top: 2px;
        .price {
          padding: 0 24px;
          .unit {
            font-size: 24px;
          }
        }
        .default-price {
          padding: 0 24px;
          font-size: 24px;
          font-weight: 300;
          color: #989898;
          text-decoration: line-through;
        }
        .share-btn{
          float: right;
          margin-right: 24px;
          width:220px;
          height:52px;
          background:linear-gradient(180deg,rgba(253,141,103,1) 0%,rgba(245,41,30,1) 100%);
          border-radius:40px;
          font-size:22px;
          text-align: center;
          color: #fff;
          line-height: 52px;
          img{
            vertical-align: text-top;
          }
        }
      }
    }

    .destination {
      background: #fff;
      padding: 0 32px;

      .item-wrap {
        height: 82px;
        display: flex;
        display: -webkit-flex;
        align-items: center;
        -webkit-align-items: center;
        border-bottom: 2px solid #e4e4e4;

        .item-list {
          flex: 0 0 1;
          height: 80px;
          line-height: 80px;
          width: 100%;
          overflow: hidden;

          .item {
            margin-right: 30px;
            display: inline-block;
            height: 82px;
            font-size: 28px;
            font-weight: 300;
            color: rgba(91, 91, 91, 1);
            letter-spacing: 2px;

            img {
              vertical-align: middle;
              width: 28px;
              height: 28px;
            }
          }
        }

        .item-arrow {
          font-size: 28px;
          flex: 0 0 28px;
          width: 28px;
        }
      }

      .city {
        padding: 20px 0;

        .from,
        .to {
          img {
            width: 40px;
            height: 40px;
            vertical-align: top;
          }

          .title {
            margin-left: 4px;
            height: 38px;
            font-size: 28px;
            font-weight: 400;
            line-height: 44px;
            color: rgba(0, 0, 0, 1);
            letter-spacing: 2px;
          }

          .addr {
            margin-left: 40px;
            font-size: 28px;
            font-weight: 300;
            line-height: 44px;
            color: rgba(91, 91, 91, 1);
            letter-spacing: 4px;
          }
        }
      }
    }

    .service-note {
      padding: 0 26px 50px;
      min-height: 200px;
      max-height: 90%;
      border-radius: 24px 24px 0 0;

      .servive-item {
        font-size: 28px;
        font-weight: 400;
        color: #4d4d4d;

        img {
          width: 28px;
          height: 28px;
        }

        .desc {
          margin-top: 8px;
          padding: 0 40px;
        }
      }
    }

    // 公共部分
    .group-price,
    .recommend {
      padding: 20px 28px 20px 32px;
      background: #fff;

      .title {
        height: 40px;
        font-size: 28px;
        font-weight: 400;
        line-height: 40px;
        color: rgba(62, 62, 62, 1);

        img {
          vertical-align: middle;
          height: 28px;
          width: 28px;
        }
      }
    }

    .group-price {

      // height: 272px;
      .content {
        display: flex;
        display: -webkit-flex;
        flex-wrap: wrap;
        -webkit-flex-wrap: wrap;
        align-items: center;
        -webkit-align-items: center;

        .g-price-item {
          margin: 10px 6px 0 0;
          flex: 0 0 220px;
          width: 220px;
          height: 80px;
          border: 2px solid #e0e0e0;
          border-radius: 12px;
          text-align: center;

          &.more {
            color: #1592e6;
            font-size: 24px;
            line-height: 80px;
          }

          .time {
            font-size: 24px;
            font-weight: 400;
            line-height: 40px;
            color: rgba(62, 62, 62, 1);
            letter-spacing: 2px;
          }

          .price {
            font-size: 24px;
            font-weight: 400;
            color: rgba(251, 96, 93, 1);
          }
        }
      }
    }

    .recommend {
      .content {
        font-size: 24px;
        font-weight: 300;
        line-height: 40px;
        color: rgba(57, 158, 246, 1);
      }
    }

    /*评论版块*/
    .comment__wrapper{
      margin: 24px 0;
      background: #fff;
      padding-bottom: 40px;
      h1{
        width: 100%;
        padding: 0 24px 0 28px;
        height: 84px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        b{
          color: #F48206;
          font-size: 32px;
        }
        span{
          color: #399EF6;
          font-size: 24px;
          height: 100%;
          display: flex;
          align-items: center;
          font-weight: 500;
          i{
            margin-top: 4px;
          }
        }
      }
      p{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 28px;
        height: 34px;
        line-height: 34px;
        color: #B5B5B5;
        font-size: 24px;
      }
      .comment__cnt{
        height: auto;
        margin-top: 24px;
        color: #191919;
        line-height: 1.8;
        overflow : hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        text-indent: 2em;
      }
    }

    .tab-list-wrap {
      background: #fff;
      transition: all 0.3s;
    }

    .fixed-tab {
      position: fixed;
      z-index: 999;
      top: 88px;
      width: 100%;
      box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.14);

      .tab-list {
        margin-top: 0 !important;
      }
    }

    .tab-height {
      height: 80px;
    }

    .tab-list {
      margin-top: 24px;
      display: flex;
      display: -webkit-flex;
      justify-content: space-around;
      -webkit-justify-content: space-around;
      align-items: center;
      -webkit-align-items: center;
      background: #fff;

      .tab-item {
        flex: 0 0 25%;
        text-align: center;
        height: 80px;
        line-height: 80px;
        font-size: 28px;
        font-weight: 300;
        color: rgba(64, 64, 64, 1);
        background: #fff;

        &.active {
          border-bottom: 4px solid #4bb1f5;
        }

        .tab-day {
          padding: 6px 8px;
          width: 48px;
          height: 42px;
          border-radius: 14px;
          color: #fff;
          font-size: 24px;
          background: rgba(75, 177, 245, 1);
        }
      }
    }

    .features {
      // height: 1520px;
      // background: url("../../assets/imgs/product/bg_features.png") no-repeat 0 0/100%
      //   100%;
    }

    .trip {
      background: #fff;

      .header-wrap {
        padding: 34px 28px 0 32px;
        text-align: center;

        .header-title {
          height: 44px;
          font-size: 32px;
          font-weight: 400;
          line-height: 44px;
          color: #191919;
        }

        .header-content {
          padding: 54px 0 28px;
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
          -webkit-justify-content: space-around;
          align-items: center;
          -webkit-align-items: center;
          border-bottom: 2px solid #c9c9c9;

          .item {
            img {
              width: 60px;
              height: 60px;
            }

            p {
              margin-top: 12px;
              font-size: 24px;
              font-weight: 400;
              line-height: 44px;
              color: #191919;
            }
          }
        }
      }

      .content-wrap {
        padding-top: 36px;

        .content-title {
          text-align: center;
          height: 44px;
          font-size: 32px;
          font-weight: 400;
          line-height: 44px;
          color: #191919;
        }

        .content {
          margin-top: 46px;
          padding-bottom: 20px;
          padding-left: 30px;

          .title-wrap {
            .icon {
              padding: 4px 12px;
              text-align: center;
              background: #f48206;
              border-radius: 20px;
              font-size: 24px;
              color: #fff;
            }

            .title-s {
              margin-left: 16px;
              font-size: 28px;
              font-weight: 400;
              line-height: 40px;
              color: #191919;
            }
          }

          .detail {

            .summarize-wrap,
            .attractions-wrap,
            .hotel-wrap,
            .meals-wrap {
              .title {
                height: 40px;
                font-size: 28px;
                font-weight: 300;
                line-height: 44px;
                color: #191919;

                img {
                  vertical-align: middle;
                  width: 28px;
                  height: 28px;
                }
              }
            }

            .summarize-wrap,
            .attractions-wrap,
            .hotel-wrap {
              .body {
                font-size: 24px;
                font-weight: 300;
                line-height: 40px;
                color: #5e5e5e;
                position: relative;

                &::before {
                  content: "";
                  position: absolute;
                  left: 14px;
                  top: 0;
                  width: 2px;
                  background: #8f8f8f;
                  height: 100%;
                }
              }
            }

            .summarize-wrap {
              margin-top: 22px;

              .body {
                padding: 12px 18px 24px 33px;
              }
            }

            .attractions-wrap {
              .body {
                padding: 12px 0 24px 33px;
                overflow: hidden;

                .attr-imgs {
                  height: 220px;
                }

                .desc {
                  margin-top: 22px;
                  font-size: 24px;
                  font-weight: 300;
                  line-height: 40px;
                  color: #5e5e5e;
                }
              }
            }

            .hotel-wrap {
              .body {
                padding: 12px 18px 24px 33px;
              }
            }

            .meals-wrap {
              .body {
                padding: 12px 18px 24px 33px;
                font-size: 24px;
                font-weight: 400;
                line-height: 40px;
                color: #5e5e5e;
              }
            }
          }
        }
      }
    }

    .ad-custom {
      padding: 20px 0;
      text-align: center;

      span {
        height: 34px;
        font-size: 24px;
        font-weight: 400;
        line-height: 40px;
        color: rgba(193, 193, 193, 1);
        letter-spacing: 2px;

        &.custom {
          color: #399ef6;
        }
      }
    }

    .cost {
      background: #fff;

      .title {
        padding-top: 36px;
        text-align: center;
        font-size: 32px;
        font-weight: 400;
        line-height: 44px;
        color: #191919;
      }

      .group-price-desc,
      .price-desc,
      .price-include {
        margin: 0 auto;
        padding: 24px 0 28px;
        width: 686px;
        border-bottom: 2px solid #e4e4e4;

        .title-s {
          font-size: 28px;
          font-weight: 400;
          line-height: 44px;
          color: #191919;
        }

        .text {
          font-size: 24px;
          font-weight: 300;
          line-height: 40px;
          color: #3e3e3e;
        }
      }

      .group-price-desc {
        margin: 56px auto 0;

        .price-item-wrap {
          padding: 0 6px;
          display: flex;
          display: -webkit-flex;
          justify-content: center;
          -webkit-justify-content: center;
          text-align: center;
          flex-wrap: wrap;
          -webkit-flex-wrap: wrap;

          .price-item {
            margin-top: 20px;
            flex: 0 0 220px;
            width: 220px;
            text-align: center;
            position: relative;

            &:not(:nth-child(3n)):not(:last-child) {
              &::after {
                position: absolute;
                right: -6px;
                top: 8px;
                content: "";
                height: 60px;
                width: 2px;
                background: #e4e4e4;
              }
            }

            .num {
              font-size: 24px;
              font-weight: 400;
              line-height: 44px;
              color: #989898;
            }

            .price {
              font-size: 24px;
              font-weight: 400;
              line-height: 44px;
              color: rgba(251, 96, 93, 1);
            }
          }
        }
      }
    }

    .notice {
      font-weight: 400;

      .title {
        font-size: 28px;
        line-height: 44px;
        color: #191919;
      }

      .text {
        margin-top: 18px;
        font-size: 24px;
        line-height: 40px;
        color: #3e3e3e;
      }

      .tip {
        font-size: 20px;
        line-height: 36px;
        color: #bcbcbc;
      }
    }

    // fixed
    .footer-fixed {
      position: fixed;
      width: 100%;
      z-index: 1000;
      bottom: 0;
      transition: all 0.3s;
      background: #fff;
      box-shadow: 0px -4px 12px rgba(0, 0, 0, 0.14);
    }

    .footer-tabbar {
      height: 120px;
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      background: #fff;

      .operate,
      .reserve {
        flex: 0 0 50%;
      }

      .operate {
        display: flex;
        display: -webkit-flex;
        justify-content: space-around;
        -webkit-justify-content: space-around;

        .btn-operate {
          text-align: center;

          img {
            width: 60px;
            height: 60px;
          }

          .operate-name {
            font-size: 20px;
            font-weight: 300;
            color: rgba(62, 62, 62, 1);
          }
        }
      }

      .reserve {
        padding: 0 20px;

        .btn-reserve {
          color: #fff;
          font-size: 40px;
          font-weight: 400;
          border-radius: 6px;
        }
      }
    }

    .sold-out {
      padding: 0 26px;
      min-height: 200px;
      max-height: 90%;
      border-radius: 24px 24px 0 0;

      .title {
        font-size: 30px;
      }

      .desc {
        font-size: 30px;
        font-weight: bold;
      }

      .sold-out-content {
        padding: 80px 30px;

        .account-wrap {
          display: flex;
          display: -webkit-flex;
          justify-content: space-around;
          -webkit-justify-content: space-around;
          align-items: center;
          -webkit-align-items: center;

          .account-input {
            flex: 0 0 1;
            width: 100%;
          }

          .account-btn {
            height: 80px;
            margin-left: 20px;
            flex: 0 0 100px;
            width: 100px;
            background: rgba(251, 96, 93, 1);
            color: #fff;
          }
        }
      }
    }
  }
  .show-more {
    width: 214px;
    background: rgba(0, 0, 0, 0.7);
    border-radius: 6px;
    position: fixed;
    z-index: 999;
    top: 88px;
    right: 32px;
    padding: 0 10px;

    &::after {
      content: "";
      position: absolute;
      top: -10px;
      right: 8px;
      border-width: 0 14px 10px;
      border-style: solid;
      border-color: transparent transparent rgba(0, 0, 0, 0.7);
    }

    .show-more-item {
      border-bottom: 1px solid rgba(255, 255, 255, 0.6);
      display: flex;
      display: -webkit-flex;
      align-items: center;
      -webkit-align-items: center;
      height: 64px;

      img {
        vertical-align: middle;
        width: 48px;
        height: 48px;
      }

      .item-title {
        margin-left: 12px;
        font-size: 24px;
        font-weight: 300;
        color: rgba(255, 255, 255, 1);
      }
    }
  }
  @import '../../assets/style/custom/index';

  .banner {
    width: 750px;
    height: 520px;
    position: relative;
    .right{
      position: absolute;
      top: 20px;
      right: 0;
      display: inline-block;
      width: 100px;
      height: 100px;
      background: url('~assets/imgs/custom/more.png') no-repeat center center/40px 42px;
    }
    img{
      width: 750px;
      height: 520px;
      display: inline-block;
      background-color: #8f8f8f;
    }
    }
  .con{
    padding: 32px;
    margin-bottom:88px;
    width: 750px;
    box-sizing: border-box;
    border-radius: 30px;
    margin-top: -40px;
    position: relative;
    background-color: #fff;
    z-index: 22;
  }
  .attack-head{
    height: 80px;
    background-color: #fff;
    .imgbox{
      width: 80px;
      height: 80px;
      float: left;
      border-radius: 48px;
      overflow: hidden;
      img{
        width: 80px;
        height: 80px;
        display: inline-block;
        background-color: #ccc;
      }

    }
    .conbox{
      width: 580px;
      height: 80px;
      float: right;
      line-height: 4;
      p:nth-child(1){
        font-size: 24px;
        line-height:40px;
        color: #a2a2a2;
        span{
          display: inline-block;
          width: 65%;
        }
        span:nth-child(1){
          color: #2d2d2d;
          font-size: 28px;
          width: 30%;
        }
        img{
          width: 16px;
          height: 21px;
        }
      }
      p:nth-child(2){
        span{
          display: inline-block;
          width: 47.7%;
        }

        font-size: 24px;
        line-height:40px;
        color: #a2a2a2;

      }
      p:nth-child(3){
        font-size: 24px;
        line-height:40px;
        color:#d4d4d4;
        position: absolute;
        width: 280px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        margin-left: 260px;
        margin-top: -55px;
        text-align: right;
      }
      .elseicon{
        font-size: 32px;
        line-height:40px;
        color:#d4d4d4;
        float: right;
        position: relative;
        margin-top: -55px

      }
    }
  }
  .elsefix{
    position: fixed;
    top: 0;
    width: 100%;
    padding: 16px 32px;
    background-color: #fff;
    left: 0;
    border-bottom: 1px solid rgba(236,236,236,1);
  }
  .elsefixbox{
    left: 0;
    position: fixed;
    width: 100%;
    height: calc(100% - 110px);
    top: 110px;
    background-color: rgba(0,0,0,.2);
    z-index: 1000;
    div{
      border-radius: 0 0 32px 32px;
      border-top: 1px solid #ddd;
      width: 750px;
      height:320px;
      background-color: #fff;
      overflow: scroll;
      p{
        height: 70px;
        line-height: 70px;
        padding: 0 32px;
        text-align: right;
        font-size: 32px;
        color:#575757 ;
      }
    }

  }
  .attack-item{
    width:100%;
    .titlex{
      font-size: 40px;
      line-height: 60px;
      margin: 20px 0;
      color: #2d2d2d;
    }
    .conx{
      font-size: 32px;
      color: #707070;
      text-align: left;
      word-wrap:break-word;
      img{
        max-width: 686px;
        height: auto;
      }
      p{
        img{
          max-width: 686px;
          height: auto;
        }
      }
    }
    .prox{
      width: 100%;
      height: 200px;
      border-radius: 20px;
      overflow: hidden;
      box-shadow:0px 0px 28px rgba(52,52,52,0.2);
      margin: 20px 0;
      .imgbox{
        width:220px;
        height: 200px;
        float: left;
        img{
          width: 220px;
          height: 200px;
          display: inline-block;
          background-color: #ccc;
        }

      }
      .conbox{
        width: 426px;
        float: right;
        height: 200px;
        color: #2d2d2d;
        font-size: 28px;
        padding: 20px 5px;
        p:nth-child(2){
          margin-top: 20px;
          span:nth-child(1){
            font-size: 44px;
            color:#f15b4a;
          }
          span:nth-child(2){
            font-size: 20px;
            color:#b1b1b1;

          }
        }
      }
    }


  }
  .boxfoot{
    width:750px;
    height:88px;
    background-color: #fff;
    border-top: 1px solid rgba(236,236,236,1);
    position: fixed!important;
    bottom: 0;
    opacity:1;
    z-index: 200;
    padding: 16px 32px;
    label{
      font-size: 24px;
      color: #4bb1f5;
      padding: 10px;
      position: relative;
      display: inline-block;
      float: left;
    }
    input{
      width:360px;
      height:56px;
      background:rgba(241,241,241,1);
      opacity:1;
      border-radius:330px;
      display: inline-block;
      float: left;
      font-size: 24px;
      padding: 0 8px;
      border: none;
    }
    span{

      img{
        width:57px;
        height: 57px;
      }
      margin-left: 20px;
      i{
         font-size: 18px;
         color:#399ef6;
        position: absolute;
        font-style: normal;
      }
    }
    span:nth-child(1){
      margin-left: 34px;
      img{
        width: 61px;
        height: 57px;
      }
    }
  }
  .popup{
    width: 100%;
    height: 1200px;
    background-color: rgba(0,0,0,0)!important;
  }
  .popup2{
    width: 100%;
    background-color: rgba(0,0,0,0)!important;
  }
  .comment{
    border-radius: 30px 30px 0 0;
    overflow: hidden;
    background-color: #fff;
    .elsep{
      font-size: 28px;
      color: #d9d9d9;
      padding-left: 30px;
    }
    .submitp{
      width: 750px;
      background-color: #fff;
      padding: 32px 16px;
      border-top: 1px solid #dfdfdf;
      position: fixed;
      bottom: 0;
      label{
        font-size: 24px;
        color: #4bb1f5;
        padding: 10px;
        position: relative;
      }
      input{
        width:640px;
        height:56px;
        background:rgba(241,241,241,1);
        opacity:1;
        border-radius:330px;
        position: relative;
        font-size: 24px;
        padding: 0 8px;
        border: none;
      }
    }
    .van-nav-bar{
      box-shadow: none!important;
    }
    .van-list{
      height:982px;
      overflow-y: scroll;
      padding-bottom: 80px;
    }

    .itemcom{
      width: 600px;
      float: right;
      p:nth-child(1){
        color: #2d2d2d;
        font-size: 28px;
        margin-bottom: 10px;

        span{
          font-size: 20px;
          padding-left: 40px;
          color: #d9d9d9;
        }
      }
      p:nth-child(2){
        font-size: 28px;
        color: #7e7e7e;


      }
    }
    .itemcom2{
      width: 600px;
      height: 300px;
    }

    img{
      width: 60px;
      height: 60px;
      display: inline-block;
      background-color: #f2f2f2;
      position: absolute;
      border-radius: 60px;
    }
    .mylist{
      .van-cell{
        background-color: rgba(0,0,0,0)!important;
      }
    }
    .bottom-user{
      text-align: center;
      line-height: 50px;
      width: 100%;
      padding: 40px 0;
      .p1{
        text-align: center;
        img{
          width: 80px;
          height: 80px;
          border-radius: 80px;
          display: inline-block;
          background-color: #ccc;
        }

      }
      .p2{
        text-align: center;
        font-size: 28px;
        color: #2d2d2d;
      }
      .p3{
        text-align: center;
        font-size: 24px;
        color: #ccc;
      }
    }

  }

</style>
