<template>
  <div class="tour-page">
    <van-nav-bar
  :title="bottomSlide?detailNeu?detailNeu.name:'景区详情':''"
  :style="{'backgroundColor':(bottomSlide?'#fff':'transparent')}"
  left-text="返回"
  left-arrow
  :fixed="true"
  :z-index="121"
  :border="false"
  @click-left="onClickLeft"
  @click-right="onClickRight"
  class="header"
  :class="{active:bottomSlide}"
>
</van-nav-bar>
<!-- 景点详情 -->
<section class="detail" v-if="detailNeu" ref="header">
  <div class="detail-banner" :style="{backgroundImage: 'url(' + detailNeu.images[0] + ')'}">
    <div class="detail-banner-black">
      <h1 v-if="detailNeu.name">{{detailNeu.name}}</h1>
      <article v-if="detailNeu.brief">{{detailNeu.brief}}</article>
    </div>
  </div>
  <div class="detail-main">
    <div class="detail-status" @click="goImgDetail()">  
      <span v-if="detailNeu.video_total>0"><img src="../../assets/imgs/tour/video.png" alt="">{{detailNeu.video_total}}</span>
      <span v-if="detailNeu.image_total>0"><img src="../../assets/imgs/tour/img.png" alt="">{{detailNeu.image_total}}</span>
    </div>
    <div class="detail-message">
      <div class="detail-name">
        <h2>{{detailNeu.name}}</h2>
        <div class="detail-span">
          <span>
            <img src="../../assets/imgs/tour/star.png" alt="">{{detailNeu.score == null || detailNeu.score == '' ? '5.0' : detailNeu.score}}
          </span>
          <span>（{{detailNeu.comment_total}}{{$t('tour.comm')}}）</span>
        </div>
      </div>
      <ul>
        <li>
          <span>
            <img src="../../assets/imgs/tour/add.png" alt="">
          </span>
          <div class="detail-marquee">
            <van-notice-bar
              color="#9E9E9E"
              background="#FFF"  
              mode="link"
              :text="(detailNeu.address == null || detailNeu.address == '') ? '暂无' : detailNeu.address"/>
            </van-notice-bar>
          </div>
        </li>
        <li>
          <span>
            <img src="../../assets/imgs/tour/time.png" alt="">
          </span>
          <div class="detail-marquee">
             <van-notice-bar
            color="#9E9E9E"
            background="#FFF"
            :text="$t('tour.yingye')+':'+((detailNeu.opening_hours == null || detailNeu.opening_hours == '') ? '暂无' : detailNeu.opening_hours)"/>
          </div>
        </li>
        <li>
          <span class="img-playTime">
            <img src="../../assets/imgs/tour/play.png" alt="">
          </span>
          <div class="detail-buy">
            <span class="detail-buy-playTime">
            {{$t('tour.playtime')+':'}}{{detailNeu.play_days>0?detailNeu.play_days+'天':''}} {{detailNeu.play_days>=0 ? detailNeu.play_hours>0?product.play_hours+'小时':'':'暂无'}}
            </span>
            <span class="detail-buy-ticket"><a href="#ticket">{{$t('tour.byatt')}}</a></span>
            <span class="detail-buy-money" v-if="detailNeu.price">{{detailNeu.price}}/起</span>
          </div>
        </li>
      </ul>
    </div>
  </div>
  
  
</section>
<!-- 玩法攻略 -->
<section class="attack" v-if="attack&&attack.list&&attack.list.length">
  <div class="attack-status">
    <h2>玩法攻略</h2>
    <span class="total">（{{attack.list.length}}篇）</span>
    <span class="more" v-if="attack&&attack.list.length>2" @click="toAttack()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
  </div>
<div class="attack-swiper"
          v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <div class="swiper-slide"
              v-for="(item,index) in attack.list"
              v-if="index<5"
              :key="index">
                <img :src="item.cover" alt="">
                <article class="attack-name">{{item.name}}</article>
                <article class="attack-status">{{item.days?item.days+'天行程':''}}&nbsp;{{item.tour_num?item.tour_num+'个景区':''}}</article>
            </div>
          </div>
        </div>
</section>
<!-- 景点门票 -->
<section class="tickets" v-if="tickets&&tickets.list&&tickets.list.length">
  <div class="tickets-status">
    <h2>{{$t('tour.tour-atr')}}</h2>
    <span class="total">（{{tickets.list.length}}项）</span>
    <span class="more" @click="toTickets()" v-if="tickets&&tickets.list.length>3">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
  </div>
  <ul>
    <li v-for="(item,index) in tickets.list" :key="index" v-if="index<3" :style="index==tickets.list.length-1?'border:none':''">
      <div class="tickets-message">
        <span class="self-support" v-if="item.self_support">{{$t('selfSupport')}}</span>
        <span class="tickets-name">{{item.name}}</span>
        <span class="ifcard"></span>
        <span class="tickets-price">${{item.default_price}}</span>
      </div>
      <div class="tickets-tips">
        <span class="special-price" v-for="(item,index) in item.special_icons" v-if="item.special_icons&&index<2" :key="index"></span>
        <span class="coupons" v-for="(item,index) in item.coupons" v-if="item.coupons&&index<2" :key="index"></span>
        <span class="buy">{{$t('tour.byatt')}}</span>
      </div>
    </li>
  </ul>
</section>
<!-- 相关行程 -->
<section class="products" v-if="products&&products.list.length">
  <div class="products-status">
    <h2>{{$t('tour.xiangguan')}}</h2>  
    <span class="more" @click="toProducts()" v-if="products&&products.list.length>3">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
  </div>
  <ul>
    <li v-for="(item,index) in products.list" :key="index">
      <div class="products-message">
          <span class="products-name"><i v-if="!item.self_support" class="products-self_support">{{$t('selfSupport')}}</i>{{item.name}}</span>
          <div class="products-coupons">
            <span v-for="(coupons,index) in item.coupons" :key="index" v-if="index<2">{{coupons}}</span>
          </div>
          <div class="products-price">
            <span class="products-special_price">{{(item.special_price ? item.special_price : item.default_price) | toFixedFilter}}<i>起</i></span>
            <span class="products-default_price" v-if="item.special_price">{{item.default_price}}</span>
            <span class="products-score" v-if="item.comment_score&&item.comment_score!='0.0'"><img src="../../assets/imgs/tour/star.png" alt="">{{item.comment_score}}分</span>
          </div>
        </div>
        <div class="products-slogen">
          <span class="products-hot-text">{{$t('tour.hot-text')}}</span>
          <span class="products-sales" v-if="item.sales>0">{{item.sales}}人出行</span>
        </div>
      
      <div class="products-img">
        <img :src="item.image" alt="">
        
        <span class="products-is_video">
          <i v-if="item.is_video"><img src="../../assets/imgs/tour/video3.png" alt=""></i>
        </span>
      </div>
    </li>
  </ul>
</section>
<!-- 评论 -->
<section class="comments" v-if="comments&&comments.length">
  <div class="comments-status">
    <h2>评论</h2>
    <span class="more" v-if="comments&&comments.length>2" @click="toComments()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
  </div>
  <ul v-if="comments&&comments.length">
    <li v-for="(item,index) in comments" :key="index" v-if="index<2">
      <img class="comments-face" :src="item.face" alt="">
      <div class="comments-main">
        <p class="comments-user">{{item.user_name}}</p>
        <p class="comments-created"><span>{{item.created}}</span></p>
        <p class="comments-content">{{item.content}}</p>
        <p class="comments-img" v-if="item.image&&item.image.length>0">
          <img v-for="(child,childIndex) in item.image" :key="childIndex" :src="child" alt="">
        </p>
        <p class="comments-note" v-if="item.image&&item.image.length>0">
          <img src="../../assets/imgs/tour/imgcion.png" alt="">
          <span> 共{{item.image.length}}张</span>
        </p>
      </div>
    </li>
  </ul>
</section>
<!-- 附近景点 -->
<section class="nearby" v-if="nearby&&nearby.length">
  <div class="nearby-status">
    <h2>{{$t('tour.local')}}</h2>
    <span class="more" v-if="comments&&comments.length>5" @click="toNearby()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
  </div>
  <ul v-if="nearby&&nearby.length">
    <li v-for="(item,index) in nearby" :key="index" @click="totour(item.tour_city_id)">
      <div class="nearby-img"><img :src="item.image" alt=""></div>
      <div class="nearby-main">
        <p class="nearby-status">
          <span class="nearby-name">{{item.name}}</span>
          <span class="nearby-distance"><img src="../../assets/imgs/tour/add.png" alt="">{{item.distance}}</span>
        </p>
        <p class="nearby-brief">{{item.brief||$t('tour.no-con1')}}</p>
        <p class="nearby-price" v-if="item.ticket_price">门票：{{item.ticket_price}}</p>
      </div>
    </li>
  </ul>
</section>
  </div>
</template>

<script>
export default {
  layout:'default',
  head(){
    return{
      title: this.detailNeu?this.detailNeu.name:'景区详情',
      meta:[
        {
          name: 'description',
          content: this.detailNeu?this.detailNeu.name:'', 'hid':'description'
        }
      ]
    }
  },
  async asyncData({ $axios, store,  params, query, req}) {
      let tourId 
      let detailNeu //景点详情
      let tickets //门票
      let products //相关行程
      let nearby //附近景点
      let comments //评论
      let attack   //攻略 
      if (String(query.tourId).indexOf('-') >= 0) {
        tourId = Number(query.tourId.toString().split('-')[0])
      } else {
        tourId = Number(query.tourId)
      }
      try{
        let {code,msg,data} = await $axios.$get('/api/tour/home',{
          header:{
            'Platform': store.state.platform,
            'Phone-Type': store.state.phoneType,
            'App-Version': store.state.phoneType,
            'Language': store.getters.language,
          },
          params:{
            tour_city_id: tourId
          }
        })
        if(code == 0){
          console.log(data);
          
          detailNeu = data.tour_detail;
          tickets = data.tickets;
          products = data.products;
          nearby = data.nearby_tour;
          comments = data.comments;
          attack = data.attack_article;
          
          
        }
        else{
          console.log('error',msg);
          
        }
      }catch(error){
        console.log(error);
        
      }
      return{
        detailNeu, //景点详情
        tickets, //门票
        products, //相关行程
        nearby, //附近景点
        comments, //评论
        attack,   //攻略
        tourId,
      }
  },
  filters:{
      toFixedFilter:function(value){
        let str =value.split(".");   
        return str[0]
      }
    },
  data(){
    return{
      bottomSlide:false,
      swiperOption: {
          /* loop: true, */
          spaceBetween:10,
          slidesPerView: "auto",
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true //修改swiper的父元素时，自动初始化swiper
        },
        falg: true
    }
  },
  async mounted(){
    window.addEventListener('scroll',this.scrollBehavior)
  },
  async beforeDestroy() {
    window.removeEventListener('scroll',this.scrollBehavior)
  },
  methods: {
    //鼠标滚动行为监听，往下滚动，navbar透明，否则为白色
    scrollBehavior(){
      let scrollTopNeu = document.documentElement.scrollTop || document.body.scrollTop;
      let navHeight = this.$refs.header.offsetTop;
      console.log(scrollTopNeu,navHeight);
      
      if(scrollTopNeu > navHeight){
        this.bottomSlide = true;
      }
      else{
        this.bottomSlide = false;
      }
    },
    onClickLeft() {
      let href = window.location.href.slice(-1)
        if(href == '#'){
          this.$router.go(-2)
        } else {
          this.$router.go(-1)
        }
    },
    onClickRight() {
    
    },
    //点击景点详情的detail-status跳转到景区相册
    goImgDetail(){
      this.$router.push('/tour/imgshow?tourId='+this.tourId)
    },
    //点击攻略更多跳转攻略列表
    toAttack(){
      this.$router.push({
        path: '/article/list'
      })
    },
    //点击景点门票更多跳转门票列表
    toTickets(){
      this.$router.push({
          path: '/product/list',
        });
    },
    //点击相关行程更多跳转行程列表
    toProducts(){
      this.$router.push({
          path: '/product/list',
        });
    },
    //到附近景点的详情
    totour(id){
      let tourId = this.$route.query.tourId
      if (id === tourId) {
        return
      }
        this.$router.push({
          path: '/tour/detail',
          query: {
            'tourId':id
          }
        })
    },
  }
}
</script>

<style lang="scss" scoped>
.tour-page{
    background-color:#f3f3f3 ;
    padding-bottom: 52px;
    position:relative !important;
    overflow-x: hidden !important;
    overflow-y: auto !important;
    .header{
      height: 88px;
      background-color: transparent;
      color: #fff;
      font-size: 0;
    }
    //景点详情
    .detail{
      .detail-banner{
        width: 100%;
        height: 640px;
        background-repeat: no-repeat;
        background-size: cover;
        .detail-banner-black{
          width: 100%;
          padding-top: 140px;
          height: 640px;
          box-sizing: border-box;
          z-index: 2;
          background-color: rgba(29,29,29,.3);
          h1{
            height: 74px;
            margin-top: 72px;
            font-size: 52px;
            line-height: 74px;
            color:rgba(255,255,255,1);
            font-weight: bold;
            text-align: center;
          }
          article{
            font-size: 24px;
            line-height: 34px;
            color:#9E9E9E;
            font-weight: 400;
            text-align: center;
          }
        }
      }
      .detail-main{
        z-index: 3;
        margin: 0 auto;
        margin-top: -198px;
        width: 686px;
        box-sizing: border-box;
        .detail-status{
          overflow: hidden;
          span{
            font-size: 28px;
            line-height: 40px;
            font-weight: 400;
            color:rgba(255,255,255,1);
            margin-left: 20px;
            float: right;
            img{
              width: 48px;
              height: 48px;
              vertical-align: middle;
            }
          }
        }
        .detail-message{
          margin-top: 10px;
          padding-left: 24px;
          width: 100%;
          height: 318px;
          background:rgba(255,255,255,1);
          border-radius: 12px;
          .detail-name{
            width: 100%;
            padding: 26px 0 0 0; 
            font-size: 0;
            overflow: hidden;
            h2{
              font-size: 44px;
              line-height: 60px;
              font-weight: bold;
              color:rgba(29,29,29,1);
              max-width:  200px;
              display: inline;
              vertical-align: middle;    
            }
            .detail-span{
              font-size: 0;
              margin-top: 10px;
              height:44px;
              line-height: 44px;
              border-left:1px solid rgba(206,206,206,1);
              float: right;
              padding-left: 10px;
              span{
              font-size: 24px;
              line-height: 34px;
              font-weight: bold;
              color:rgba(255,190,13,1);
              img{
                width: 34px;
                height: 34px;
                vertical-align: sub;
              }
            }
            span:last-child{              
              font-weight:400;
              color:rgba(94,94,94,1);
              }
            }  
          }
          ul{
            li{
              font-size: 0;
              span{
                font-size: 28px;
                line-height: 40px;
                font-weight: 400;
                color:rgba(158,158,158,1);
                vertical-align: middle;
                img{
                  width: 28px;
                  height: 28px;
                }
              }
              .img-playTime{
                img{
                  vertical-align: middle;
                }
              }
              .detail-marquee{
                display: inline-block;
                vertical-align: middle;
                width: 602px;
                margin-left: 6px;
                border-bottom: 2px solid rgba(206,206,206,1) !important;
                box-sizing: border-box;
                .van-notice-bar{
                  padding-left:0;
                  height: 72px;
                }
              }
              .detail-buy{
                display: inline-block;
                width: 602px;
                height: 70px;
                line-height: 70px;
                margin-left: 6px;
               /*  overflow: hidden; */
                .detail-buy-playTime{
                  font-size: 28px;
                  line-height: 40px; 
                  font-weight: 400;
                  color:rgba(158,158,158,1);
                }
                .detail-buy-money{
                  font-size: 24px;
                  line-height: 34px;
                  font-weight: bold;
                  color:rgba(29,29,29,1);
                  margin-top: 18px;
                  float: right;
                }
                .detail-buy-ticket{
                 float: right; 
                 margin:14px 0 0 20px;
                  a{
                    color:red;
                    font-size: 24px;
                    line-height: 34px;
                    font-weight: bold;
                  }
                }
              }
            }
            li:first-child{
              margin-top: 16px;
            }
          }
        }
      }
      
  }
    //玩法攻略
    .attack{
      width: 718px;
      margin: 40px 0 0 32px;
      .attack-status{
        font-size: 0;
        h2{
          font-size: 36px;
          line-height: 50px;
          font-weight: bold;
          color:rgba(29,29,29,1);
          display: inline;
          vertical-align: middle;
        }
        .total{
          font-size: 28px;
          line-height: 40px;
          height: 40px;
          font-weight: 400;
          color:rgba(158,158,158,1);
          vertical-align: middle;
        }
        .more{
          font-size: 24px;
          line-height: 34px;
          font-weight: 400;
          color:rgba(77,192,42,1);
          margin-left: 302px;
          vertical-align: middle;
          img{
            width: 28px;
            height: 28px;
            vertical-align: text-top;
          }
        }
      }
      .attack-swiper{
        width: 100%;
        height: 280px;
        margin-top: 16px;
        .swiper-slide{
          width: 334px;
          font-size: 0;
          border-radius: 8px;
          background-color: #fff;
          overflow: hidden;
          img{
            width: 100%;
            height: 188px;
            border-radius: 4px 4px 0px 0px;
          }
          .attack-name{
            font-size: 28px;
            line-height: 40px;
            height: 40px;
            font-weight: bold;
            color:rgba(29,29,29,1);
            white-space: nowrap;
            text-overflow:ellipsis;
            overflow: hidden;
            padding: 0 16px;
          }
          .attack-status{
            font-size: 24px;
            line-height: 34px;
            font-weight: 400;
            color:rgba(158,158,158,1);
            padding: 0 16px;
          }
        }
      }
    }
    //景点门票
    .tickets{
      width: 686px;
      margin: 0 auto;
      margin-top: 80px;
      .tickets-status{
        font-size: 0;
        h2{
          font-size: 36px;
          line-height: 50px;
          font-weight: bold;
          color:rgba(29,29,29,1);
          display: inline;
          vertical-align: middle;
        }
        .total{
          font-size: 28px;
          line-height: 40px;
          height: 40px;
          font-weight: 400;
          color:rgba(158,158,158,1);
          vertical-align: middle;
        }
        .more{
          font-size: 24px;
          line-height: 34px;
          font-weight: 400;
          color:rgba(77,192,42,1);
          margin-left: 302px;
          vertical-align: middle;
          img{
            width: 28px;
            height: 28px;
            vertical-align: text-top;
          }
        }
      }
      ul{
        width: 100%;
        border-radius:4px;
        padding: 0 16px;
        margin-top: 16px;
        background-color: #fff;
        box-sizing: border-box;
        li{
          width: 100%;
          height: 120px; 
          box-sizing: border-box;
          border-bottom:1px solid rgba(206,206,206,1);
          .tickets-message{
            width: 100%;
            height: 60px;
            padding-top: 18px;
            box-sizing: border-box;
            overflow: hidden;
            font-size: 0;
            .self-support{
              display: inline-block;
              height:32px;
              background:rgba(255,190,13,1);
              opacity:1;
              border-radius:8px;
              line-height: 32px;
              font-size: 20px;
              color: #fff;
              text-align: center;
              padding: 0 4px;
              vertical-align: middle;
            }
            .tickets-name{
              display: inline-block;
              font-size: 28px;
              line-height: 40px;
              height: 40px;;
              font-weight: bold;
              color:rgba(29,29,29,1);
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 75%;
            } 
            .tickets-price{
              font-size: 32px;
              line-height: 44px;
              font-weight: bold;
              color:rgba(255,52,52,1);
              float: right;
            }
          }
          .tickets-tips{
            width: 100%;
            height: 60px;
            padding-top: 6px;
            padding-bottom: 18px;
            box-sizing: border-box;
            overflow: hidden;
            font-size: 0;
            .special-price{
              width:58px;
              display: inline-block;
              height:32px;
              background:#FF3434;
              border-radius:8px;
              font-size: 20px;
              line-height: 32px;
              margin-right: 10px;
              color: #fff;
              padding: 0 4px;
              box-sizing: border-box;
              text-align: center;
              vertical-align: middle;
            }
            .coupons{
              height:32px;
              border-radius:8px;
              line-height: 32px;
              text-align: center;
              margin-right: 10px;
              border: 1px solid #FF3434;
              vertical-align: middle;
              background:rgba(255,255,255,1);
              border:2px solid rgba(255,52,52,1);
              font-size:20px;
              box-sizing: border-box;
              color: #FF3434;
              padding: 0 4px;
            }
            .buy{
              height:34px;
              padding: 4px 16px;
              line-height: 28px;
              font-size: 20px;
              font-weight: 500;
              color: #fff;
              background:rgba(255,52,52,1);
              border:1px solid rgba(255,52,52,1);
              border-radius:12px;
              float: right;
            }
          }
        }
      }
    }
    //相关行程
    .products{
      width: 686px;
      margin: 0 auto;
      margin-top: 60px;
      .products-status{
        font-size: 0;
        h2{
          font-size: 36px;
          line-height: 50px;
          font-weight: bold;
          color:rgba(29,29,29,1);
          display: inline;
          vertical-align: middle;
        }
        .more{
          font-size: 24px;
          line-height: 34px;
          font-weight: 400;
          color:rgba(77,192,42,1);
          margin-left: 416px;
          vertical-align: middle;
          img{
            width: 28px;
            height: 28px;
            vertical-align: text-top;
          }
        }
      }
      ul{
        width: 686px;
        margin: 0 auto;
        li{
          height: 276px;
          width: 100%;
          margin-top: 20px;
          padding-top: 36px;
          position: relative;
          .products-message{
            width:630px;
            height:240px;
            margin-left:56px;
            padding:14px 18px 0 184px;
            background:rgba(255,255,255,1);
            font-size: 0;
            position: relative;
            border-radius: 8px;
            .products-name{
              width: 428px;
              font-size:28px;
              font-weight:bold;
              line-height:38px;
              color:rgba(45,45,45,1);
              overflow: hidden;
              display: -webkit-box;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
              .products-self_support{
                height:28px;
                background:rgba(255,190,13,1);
                border-radius:30px;
                font-size: 20px;
                font-weight:400;
                line-height: 28px;
                color: #fff;
                padding:2px 10px;
                font-style: normal;
                margin-right: 4px;
            }
            }
            .products-coupons{
              margin-top: 2px;
              font-size: 0;
              height: 36px;
              span{
                height:36px;
                background-color:rgba(255,255,255,1);
                border:2px solid rgba(255,52,52,1);
                border-radius:8px;
                font-size:20px;
                font-weight:400;
                line-height:44px;
                color:rgba(255,52,52,1);
                margin-right: 10px;
                padding: 0 4px;
              }
            }
            .products-price{
              width: 428px;
              position: absolute;
              bottom: 50px;
              overflow: hidden;
              .products-special_price{
                font-size:36px;
                font-weight:bold;
                line-height:44px;
                color:rgba(255,52,52,1);
                i{
                  font-size:20px;
                  font-weight:400;
                  line-height:28px;
                  color:rgba(158,158,158,1);
                  font-style: normal;
                  margin-left: 4px;
                }
              }
              .products-default_price{
                margin-left: 14px;
                text-decoration: line-through;
                font-size:20px;
                font-weight:400;
                line-height:28px;
                color:rgba(158,158,158,1);
              }
              .products-score{
                font-size:24px;
                font-weight:400;
                line-height:44px;
                color:rgba(255,190,13,1);
                margin-right: 12px;
                vertical-align: baseline;
                float: right;
                img{
                  width: 34px;
                  height: 34px;
                  display: inline-block;
                  vertical-align: sub;
                }
              }
            }
          }
          .products-slogen{
              position: absolute;
              left: 74px;
              bottom: 14px;
              width: 584px;
              font-size: 0;
              overflow: hidden;
              .products-hot-text{
                font-size:22px;
                font-weight:400;
                line-height:28px;
                color:rgba(158,158,158,1);
              }
              .products-sales{
                font-size:24px;
                font-weight:400;
                line-height:44px;
                color:rgba(158,158,158,1);
                position: absolute;
                top: 50%;
                right: 0;
                transform: translateY(-50%);
              }
            }
          .products-img{
            position: absolute;
            left: 0;
            top: 0;
            border-radius: 20px;
            box-sizing: border-box;
            img{
              width: 220px;
              height: 220px;
              border-radius: 10px;
              display: inline-block;
              background-color: #eee;
            }
            .products-is_video{
              position:absolute;
              width: 240px;
              margin-top: 170px;
              i{
                float: right;
                display: inline-block;
                margin-right: 25px;
                margin-bottom: 25px;
                img{
                  width: 40px!important;
                  height: 40px!important;
                }
            }
            }
          }
        }
      }
    }
    //评论
    .comments{
      width: 686px;
      margin: 0 auto;
      margin-top: 60px;
      .comments-status{
        font-size: 0;
        h2{
          font-size: 36px;
          line-height: 50px;
          font-weight: bold;
          color:rgba(29,29,29,1);
          display: inline;
          vertical-align: middle;
        }
        .more{
          font-size: 24px;
          line-height: 34px;
          font-weight: 400;
          color:rgba(77,192,42,1);
          margin-left: 416px;
          vertical-align: middle;
          img{
            width: 28px;
            height: 28px;
            vertical-align: text-top;
          }
        }
      }
      ul{
        width: 100%;
        padding: 20px 12px;
        background-color: #fff;
        li{
          .comments-face{
            width: 60px;
            height: 60px;
            display: inline-block;
            background-color: #f2f2f2;
            position: absolute;
            border-radius: 60px;
            float: left;
          }
          .comments-main{
            width: 575px;
            display: inline-block;
            margin-left: 70px;
            border-bottom:2px solid #CECECE ;
            p:nth-child(1){
              color: #1D1D1D;
              font-size: 28px;
              line-height: 50px;
            }
            p:nth-child(2){
              span{
                font-size: 20px;
                color: #d9d9d9;
              }
            }
            p:nth-child(3){
              font-size: 28px;
              color:#1D1D1D;
            }
            .comments-img{
              width: 100%;
              height:138px;
              img{
                width:182px;
                height: 138px;
                float: left;
                margin-right: 5px;
              }
            }
            .comments-note{
              img{
                width: 48px;
                height: 48px;
                }
              span{
                font-size:20px ;
                line-height: 48px;
                color: #9e9e9e;
                height: 48px;
                display: inline-block;
                position: relative;
                top: -14px;
              }
            }
          }
        }
      }
    }
    //附近景点
    .nearby{
      width: 686px;
      margin: 0 auto;
      margin-top:56px;
      .nearby-status{
        font-size: 0;
        h2{
          font-size: 36px;
          line-height: 50px;
          font-weight: bold;
          color:rgba(29,29,29,1);
          display: inline;
          vertical-align: middle;
        }
        .more{
          font-size: 24px;
          line-height: 34px;
          font-weight: 400;
          color:rgba(77,192,42,1);
          margin-left: 416px;
          vertical-align: middle;
          img{
            width: 28px;
            height: 28px;
            vertical-align: text-top;
          }
        }
      }
      ul{
        li{
          height: 168px;
          margin-top: 16px;
          padding: 20px 12px 20px 20px;
          background-color: #fff;
          overflow: hidden;
          border-radius: 8px;
          .nearby-img{
            width: 170px;
            height: 128px;
            margin-right: 18px;
            float: left;
            background-color: #eee;
            border-radius: 8px;
            img{
              width: 100%;
              height: 100%;
            }
          }
            .nearby-main{ 
              width: 466px;
              float: left;
              font-size: 0;
              .nearby-status{
                overflow: hidden;
                  .nearby-name{
                    width: 360px;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                    font-size:36px;
                    font-weight:bold;
                    line-height:50px;
                    color:rgba(29,29,29,1);
                    float: left;
                  }
                  .nearby-distance{
                    font-size:24px;
                    font-weight:400;
                    line-height:34px;
                    color:rgba(255,190,13,1);
                    float: right;
                    margin-top: 6px;
                    img{
                      width: 28px;
                      height: 28px;
                      position: relative;
                      top: 5px;
                    }
                  }
              }
              .nearby-brief{
                font-size:24px;
                font-weight:400;
                line-height:34px;
                color:rgba(29,29,29,1);
                overflow:hidden; //超出的文本隐藏
                text-overflow:ellipsis; //溢出用省略号显示
                white-space:nowrap; //溢出不换行
              }
              .nearby-price{
                margin-top: 14px;
                font-size:24px;
                font-weight:500;
                line-height:34px;
                color:rgba(158,158,158,1);
              }
            }
        }
      }
    }
  }
  
</style>

<style lang="scss">
/* 重写vant覆盖样式 */
  
  .tour-page .header .van-nav-bar__text{
    color: #fff !important;
    font-size: 30px;
    line-height: 50px;
    font-weight:400;  
    margin-top: 4px;
  }
  

    //navbar left返回图标重写 
    .header .van-nav-bar__left{
      height: 92px;
      i{
        margin-top: 4px;
        color: #fff !important;
      }
      
    }
    .header.active .van-nav-bar__left{
      i{
        color: #000 !important;
      }
      
    }
    //navbar 返回文字重写
    .header.van-nav-bar.van-nav-bar--fixed.active{
      color: #000 !important;
    }
    .tour-page .header.active .van-nav-bar__text{
        color: #000 !important;
    }
    .tour-page .header.active .van-nav-bar .van-icon{
        color: #000 !important;
    }
   //navbar 标题重写
    .header .van-nav-bar__title{
      
      color:rgba(29,29,29,1);
    }
    //navbar 阴影消除
    .tour-page .header.van-nav-bar{
  
      box-shadow: none !important;
      -webkit-box-shadow: none !important;
    }
    //详情栏notice 右箭头改动
   .detail-marquee .van-notice-bar{
      .van-notice-bar__right-icon{
        position: absolute !important;
        right: 0 !important;
      }
      
    }
</style>