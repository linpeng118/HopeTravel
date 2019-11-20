<template>
 <div class="tour-page">
   <section>
     <van-nav-bar class="login-header tours-no-bb elsecom"
                  ref="loginHeader"
                  :fixed="true"
                  :z-index="999"
                  
                  :title="product?product.name:'景区详情'"
                  @click-left="onClickLeft">
       <van-icon class="left-wrap"
                 name="arrow-left"
                 slot="left" />
     </van-nav-bar>
   </section>
   <div class="tour-head" v-if="product">
     <img v-if="product.images&&product.images.length>0" :src="product.images[0]" alt="">
     <div>
       <p v-if="product">{{product.name}}</p>
       <p v-if="product">{{product.brief}}</p>
     </div>

   </div>
   <div class="box-con">
     <div class="tour-jianjie" v-if="product">
       <p class="p0" @click="onimgbox()">
         <span v-if="product.video_total > 0"><img src="../../assets/imgs/tour/video.png" alt="">{{product.video_total}}</span>
         <span v-if="product.image_total > 0"><img src="../../assets/imgs/tour/img.png" alt="">{{product.image_total}}</span>
       </p>
       <div v-if="product">
         <p class="p1">{{product.name}}</p>
         <p class="p2">
           <a class="span1">
            <img src="../../assets/imgs/tour/star.png" alt="">{{(product.score == null || product.score == '') ? '5.0' : product.score}}
           </a>
           <a class="span2" v-if="product.comment_total">({{product.comment_total}}{{$t('tour.comm')}})</a>
         </p>
         <p class="p3">
           <span class="span1"><img src="../../assets/imgs/tour/add.png" alt=""></span>
           <span class="span2 noBorderTop"> <img src="../../assets/imgs/tour/right2.png" alt="">
             <vue-marquee :content="(product.address == null || product.address == '') ? '暂无' : product.address" class="two" :showtwo="false"></vue-marquee>
           </span>
         </p>
         <p class="p3 noTop">
           <span class="span1"><img src="../../assets/imgs/tour/time.png" alt=""></span>
           <span class="span2">
              <vue-marquee :content="$t('tour.yingye')+':'+((product.opening_hours == null || product.opening_hours == '') ? '暂无' : product.opening_hours)" class="two" :showtwo="false"></vue-marquee>
           </span>
         </p>
         <p class="p3 noTop">
           <span class="span1"><img src="../../assets/imgs/tour/play.png" alt=""></span>
           <span class="span21">{{$t('tour.playtime')}}：

             {{product.play_days>0?product.play_days+'天':''}} {{product.play_days>0 ? product.play_hours>0?product.play_hours+'小时':'':'暂无'}}
           <i class="span4" v-if="product.price">{{product.price}}/起 <a href="#piaopiao" style="color: red">&nbsp;&nbsp;{{$t('tour.byatt')}}</a></i>
           </span>
         </p>
       </div>
     </div>
     <!--攻略-->
     <div class="tourtitle" v-if="attack&&attack.list&&attack.list.length">
       <span class="span1">玩法攻略</span>
       <span class="span2">（{{attack.total}}篇）</span>
       <span class="span3" v-if="attack&&attack.list&&attack.list.length>2" @click="toattlist()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
     </div>
     <div class="tour-gonglve" v-if="attack&&attack.list&&attack.list.length">
       <div class="gonglvebox">
         <div class="gonglve-item" v-for="(item,ind) in attack.list" :key="ind" v-if="ind<3" @click="toatt(item.article_id)" >
           <div class="imgbox"><img :src="item.cover" alt=""></div>
           <p class="p1">{{item.name}}</p>
           <p class="p2">{{item.days!=''?item.days+'天行程':''}}{{item.tour_num!=''?item.tour_num+'个景区':''}}</p>
         </div>
       </div>
     </div>
     <!--门票-->
     <div class="tourtitle" v-if="tickets&&tickets.list&&tickets.list.length" id="piaopiao" >
       <span class="span1">{{$t('tour.tour-atr')}}</span>
       <span class="span2">（{{tickets.total}}项）</span>
       <span class="span3" v-if="tickets&&tickets.list&&tickets.list.length>2" @click="toprolist()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
     </div>
     <div class="tour-menpiao" v-if="tickets&&tickets.list&&tickets.list.length">
       <div class="menpiao-item" v-for="(item,ind) in tickets.list" :key="ind" :style="ind==tickets.list.length-1?'border:none':''">
         <p class="p1">
           <span class="ziyin" v-if="item.self_support">{{$t('selfSupport')}}</span>
           <span class="span1">{{item.name}}</span>
           <span class="span2"></span>
           <span class="span3">￥{{item.default_price}}</span>
          </p>
         <p class="p2">
           <span class="tejia" v-for="(item2,ind2) in item.special_icons" :key="ind2" v-if="ind2<2">{{item2.title}}</span>
           <span class="youhui" v-for="(item2,ind2) in item.coupons" :key="ind2" v-if="ind2<2">{{item2}}</span>
           <span v-if="!item.special_icons&&!item.coupons" style="color: #ccc">{{$t('tour.nosale')}}</span>
           <span class="buybtn" @click="toproobj(item.product_id)">{{$t('tour.byatt')}}</span>
         </p>
       </div>
     </div>
     <!--行程-->
     <div class="tourtitle" v-if="products&&products.list.length">
       <span class="span1">{{$t('tour.xiangguan')}}</span>
       <span class="span3" v-if="products&&products.list.length>2" @click="toprolist()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
     </div>
     <div class="tour-xingcheng" v-if="products&&products.list.length">
       <div class="product-item" target="_blank" v-for="(item,ind) in products.list" :key="ind" @click="toproobj(item.product_id)">
         <div class="box-img">
           <img :src="item.image" alt="">
           <span class="spcie-box">
             <i class="spice-icon" v-for="(item3,ind3) in item.special_icons" :key="ind3">{{item3.title}}</i>
           </span>
           <!--<span v-if="!item.is_soldout">-->
             <!--{{productTypeValue(item.product_type)}}-->
           <!--</span>-->
           <span class="spcie-else">
             <i class="vi" v-if="item.is_video"><img src="../../assets/imgs/tour/video3.png" alt=""></i>
           </span>
         </div>
         <div class="con">
           <div class="p1" ><span class="ziyin" v-if="item.self_support">{{$t('selfSupport')}}</span>{{item.name}}</div>
           <div class="p0">
             <span v-for="(item2,ind2) in item.coupons" :key="ind2" v-if="ind2<2">{{item2}}</span>
           </div>
           <p class="p2">
             <span class="span1">
                <span>{{(item.special_price ? item.special_price: item.default_price) | toFixedFilter}}
                <i>起&nbsp;</i>
                </span>
                <i v-if="!item.special_price" style="text-decoration:line-through">{{item.default_price | toFixedFilter}}</i>
             </span>
             <span class="span2" v-if="item.comment_score > 0"><img src="../../assets/imgs/tour/star.png" alt="">{{item.comment_score}}分</span>
           </p>
         </div>
         <p class="p3">
           <span class="span1">{{$t('tour.hot-text')}}</span>
           <span class="span2" v-if="item.sales>0">{{item.sales}}人出行</span>
         </p>
       </div>

     </div>
     <!--评论-->
     <div class="tourtitle" v-if="comments&&comments.length">
       <span class="span1">评论</span>
       <span class="span3" v-if="comments&&comments.length>2" >{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
     </div>
     <div class="tour-pinglun" v-if="comments&&comments.length">
       <div v-for="(item,ind) in comments" :key="ind">
         <img class="img2" :src="item.face" alt="">
         <div class="itemcom">
           <p>{{item.user_name}}</p>
           <p><span>{{item.created}}</span></p>
           <p>{{item.content}}</p>
           <p class="imgb" v-if="item.image&&item.image.length>0">
             <img v-for="(item2,ind2) in item.image" :key="ind2" :src="item2" alt="">
           </p>
           <p class="icon" v-if="item.image&&item.image.length>0">
             <img src="../../assets/imgs/tour/imgcion.png" alt="">
             <span class="span1"> 共{{item.image.length}}张</span>
           </p>
         </div>
       </div>

     </div>
     <!--附近景点-->
     <div class="tourtitle" v-if="nearby&&nearby.length">
       <span class="span1">{{$t('tour.local')}}</span>
     </div>
     <div class="tour-local" v-if="nearby&&nearby.length">
       <div class="touritem" v-for="(item,ind) in nearby" :key="ind" v-if="ind<5" @click="totour(item.tour_city_id)" >
         <div class="imgb2"><img :src="item.image" alt=""></div>
         <div class="con">
           <p class="p1">
            <span class="span0">{{item.name}}</span>
             <span class="span1"><img src="../../assets/imgs/tour/add.png" alt="">{{item.distance}}</span>
           </p>
           <p class="p2">{{item.brief||$t('tour.no-con1')}}</p>
           <!-- <p class="p3">门票：{{item.ticket_price||$t('tour.no-con2')}}</p> -->
          <p class="p3" v-if="item.ticket_price">门票：{{item.ticket_price}}</p>
         </div>
       </div>
     </div>
   </div>


 </div>
</template>

<script>
  import VueMarquee from 'vue-marquee-ho';
  import Css from 'vue-marquee-ho/dist/vue-marquee.min.css'
  let goToBackPage = '/tour/list' // 记录下来当前的页面
  export default {
    layout: 'default',
    head() {
      return {
        title: this.product?this.product.name:'景区详情',
        meta: [
          {name: 'description', content:this.product?this.product.name:'', 'hid': 'description'},
        ]
      }
    },
    components:{
      "vue-marquee": VueMarquee
    },
    async asyncData({$axios, query, store, req}) {
      let tourId
      let product
      let attack
      let  tickets
      let  products
      let  comments
      let  nearby
      if (String(query.tourId).indexOf('-') >= 0) {
        tourId = Number(query.tourId.toString().split('-')[0])
      } else {
        tourId = Number(query.tourId)
      }
      try {
        let {
          code,
          msg,
          data
        } = await $axios.$get(`/api/tour/home`, {
          headers: {
            'Platform': store.state.platform,
            'Phone-Type': store.state.phoneType,
            'App-Version': store.state.phoneType,
            'Language': store.getters.language,
          },
          params:{
            tour_city_id:tourId
          }
        })
        if (code === 0) {
          console.log(99999,data);
          
          product = data.tour_detail; // 产品信息
          attack = data.attack_article;
          tickets = data.tickets;
          products = data.products;
          comments = data.comments;
          nearby = data.nearby_tour
          console.log(11111111111111111111111111,attack);
          
        } else {
          console.log('error:', msg)
        }
      } catch (error) {
        console.log('detail-error', error)
      }
      return {
        product,
        attack,
        tickets,
        products,
        comments,
        nearby,
        tourId
      }
    },
     filters:{
      toFixedFilter:function(value){
        let str =value.split(".");   
        return str[0]
      }
    },
    data() {
      return {
        loading: false,
        isTransparent: false, // 导航头是否透明
      }
    },
   
    beforeRouteEnter (to, from, next) {
      next(vm => {
        goToBackPage = from.fullPath
      })
    },
    computed: {

    },
    watch: {

    },
    async mounted() {
      console.log(this.products)

    },
    
    methods: {

      async init() {
        if (!(this.product && this.product.product_id)) {
          this.jumpTo('/')
        }


      },
      // 跳转至注册页
      toRegist() {
        this.jumpTo('/login/regist')
      },
      /**
       * 年月日转周几
       * @params year
       * @params month
       * @params day
       */
      getWeek(year, month, day) {
        let date = `${year}/${month}/${day}`
        let week = new Date(date).getDay()
        switch (week) {
          case 0:
            return this.$t('weekend')
            break;
          case 1:
            return this.$t('monday')
            break;
          case 2:
            return this.$t('tuesday')
            break;
          case 3:
            return this.$t('wednesday')
            break;
          case 4:
            return this.$t('thursday')
            break;
          case 5:
            return this.$t('friday')
            break;
          case 6:
            return this.$t('saturday')
            break;
          default:
            // console.log(`${week} is not found`)
            break;
        }
      },
      onCopy(e) {
        this.$toast(this.$t('shareComp.copySuccess'))
      },
      // 复制失败
      onError(e) {
        this.$toast(this.$t('shareComp.copyFail'))
      },
      onHeaderLeft() {
        this.$router.push('/tour/list')
      },
      onimgbox() {
        this.$router.push('/tour/imgshow?tourId='+this.tourId)
      },
      // 返回首页
      onHomePage() {
        this.jumpTo('/')
      },
      jumpTo(path) {
        this.$router.push({
          path
        })
      },
      toatt(attackId) {
        this.$router.push({
          path: '/article/detail',
          query: {
            'attackId':attackId
          }
        });
      },
      onClickLeft() {
        this.$router.push({
          path: '/tour/list'
        });
      },
      totour(id) {
        this.$router.push({
          path: '/tour/detail',
          query: {
            'tourId':id
          }
        });
      },
      toattlist() {
        this.$router.push({
          path: '/article/list',
        });
      },
      toprolist() {
        this.$router.push({
          path: '/product/list',
        });
      },
      productTypeValue(val) {
        const type = [
          {type: 3,title: this.$t('tours.exquisiteGroup')},
          {type: 1,title: this.$t('tours.localGroup')},
          {type: 2,title: this.$t('tours.localPlay')},
          {type: 4,title: this.$t('tours.tickets')},
          {type: 5,title: this.$t('tours.aDayTrip')},
          {type: 6,title: this.$t('tours.connectionService')},
          {type: 7,title: this.$t('tours.cruise')},
        ]
        let target = type.find(item => {
          return item.type === val
        })
        return target.title
      },
      toproobj(id) {
        console.log(id)
        this.$router.push({
          path: '/product/detail',
          query: {
            'productId':id
          }
        });
      },
    },
  }

</script>
<style>
  .middle {
    -webkit-animation: a 16s linear infinite!important;
    animation: a 16s linear infinite!important;
  }
  .elsecom{
    background-color: rgba(255,255,255,1)!important;
    color: rgba(29,29,29,1)!important;
  }
 .elsecom>.van-nav-bar__left>.van-icon-arrow-left{
   color: rgba(29,29,29,1) !important;
 }
  body{
    overflow: scroll!important;
    position: relative!important;
  }
  .middle span{
    position: relative!important;
    top: -12px!important;
    color: #9E9E9E;
    font-size: 28px;
    border-bottom: 10px;
  }
  .marquee-box{
    padding-left: 0 !important;
  }
  .marquee-content{
    height: 100%;
  }
  .marquee-content p{
    width: 100%;
    height: 100%;
  }
  .marquee-content .text1{
    position: relative!important;
    top: -12px!important;
    color: #9E9E9E;
    font-size: 28px;
    border-bottom: 10px;
    width: 100% ;
    overflow: hidden ;
    text-overflow: ellipsis ;
    white-space: nowrap ;
  }
  .marquee-content .text2{
    position: relative!important;
    top: -12px!important;
    color: #9E9E9E;
    font-size: 28px;
    border-bottom: 10px;
    width: 100% ;
    overflow: hidden ;
    text-overflow: ellipsis ;
    white-space: nowrap ;
  }
</style>

<style lang="scss" scoped>
  .tour-page{
    background-color:#f3f3f3 ;
    padding-bottom: 52px;
    overflow-x: hidden;
  }
  .tour-head{
    width: 750px;
    height: 640px;
    /* margin-top: -92px; */
    padding-top: 92px;
    background-color: #aaa;
    img{
      width: 750px;
      height: 640px;
    }
    div{
      position: absolute;
      width: 100%;
      margin-top: 160px;
      top: 0;
      p:nth-child(1){
        text-align: center;
        font-size:52px;
        font-weight:bold;
        line-height:74px;
        color:rgba(255,255,255,1);
      }
      p:nth-child(2){
        font-size:24px;
        font-weight:400;
        text-align: center;
        line-height:34px;
        color:rgba(158,158,158,1);
        opacity:1;
      }
    }

  }
  .box-con{
    padding: 32px;
    .tour-jianjie{
      width: 100%;
      margin-top: -220px;
      z-index: 111;
      position: relative;
      .p0{
        height: 68px;
        padding: 10px 0;
        span{
          float: right;
          display: inline-block;
          height: 50px;
          line-height: 50px;
          font-size: 28px;
          color: #fff;
          padding-left: 10px;
          img{
            width: 48px;
            height: auto;
            float: left;
          }
        }
      }
      div{
        width:100%;
        box-sizing: border-box;
        /* padding: 24px; */
        padding: 24px 24px 24px 12px;
        background-color: #fff;
        border-radius:12px;
        
        .p1{
          color:rgba(29,29,29,1);
          font-size: 44px;
          font-weight:bold;
          line-height: 60px;
          opacity:1;
        }
        .p2{
          font-size: 24px;
          .span1{
            
            height:34px;
            font-size:24px;
            font-weight:bold;
            line-height:34px;
            color:rgba(255,190,13,1);
            opacity:1;
            img{
              width: 20px;     
              height:20px;      
            }
          }
          .span2{
            line-height: 34px;
            font-size: 24px;
            color: #5e5e5e;
            
          }
        }
        .p3{
          font-size: 28px;
          margin-top: 26px;
          overflow: hidden;
          line-height: 30px;                                                                                                                                                                          
           img{width: 28px;height: 28px;vertical-align: middle}
         /*  padding-bottom: 1px ;
          display: inline-block; */
          .span1{
           /* float: left; */
           display: inline-block;
           vertical-align:top;
           margin-top: 6px;
            img{width: 28px;height: 28px;}
          }
          .span2{
            display: inline-block;
            height: 60px;
            line-height: 60px;
            color: #cecece;
            margin-left: 5px;
            width: 602px;
            vertical-align: middle;
            font-size:28px; 
            position: relative;
            border-top: 2px solid #cecece !important;
            div{
            padding-top: 12px;
            padding-bottom: 8px;
            height: 54px;
            .marquee-content{
              p{
                width: 100% !important;
                
              }
              

            }
            }
            /* div{
              padding-top: 8px;
            padding-bottom: 10px;
            p{
              width: 100%;
              .text1{
               width: 100% !important;
               overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
             }
            }
             
            } */
            /* padding-bottom: 24px; */
            img{width: 28px;height: 28px;position: absolute;right: 0;top: 8px}
          }
          .span21{
            display: inline-block;
            line-height: 40px;
            height: 40px;
            margin-left: 5px;
            font-weight:400;
            color: #9E9E9E;
            font-size:28px;
            width: 590px;
            position: relative;
            border-top: 2px solid #cecece !important;
            padding-top: 10px;
            .span4{
              position: absolute;
              right: -5px;
              
              font-size:24px;
              font-weight:bold;
              line-height:34px;
              color:rgba(29,29,29,1);
              opacity:1;
              font-style: normal;
            }
          }
          .span3{

          }
          /* .span4{
            font-size:24px;
            font-weight:bold;
            color:rgba(29,29,29,1);
            float: right;
            line-height: 72px;
            font-style: normal;
          } */
        }
        .p3 .noBorderTop{
          border-top: 0 !important;
        }
        .p3.noTop{
          margin-top: 0px;
        }
      }
    }
    .tourtitle{
      width: 100%;
      padding: 16px 0;
      margin-top: 30px !important;
      height: 82px;
      .span1{
        display: inline-block;
        line-height: 50px;
        color: #1d1d1d;
        font-weight: bolder;
        font-size: 36px;
        float: left;
      }
      .span2{
        display: inline-block;
        line-height: 50px;
        color:#9E9E9E;
        font-size: 28px;
        float: left;
        margin-left:15px;
      }
      .span3{
        display: inline-block;
        line-height: 50px;
        color:#4DC02A;
        font-size: 24px;
        float: right;
        img{
          width:28px;
          height: 28px;
          position: relative;
          top: 5.5px;
        }
      }
    }
    .tour-gonglve{
      width: 100%;
      height: 280px;
        .gonglvebox{
          width: 1060px;
          height: 280px;
          overflow:auto;
          .gonglve-item{
            width:334px;
            border-radius: 8px;
            height:280px;
            margin-right: 16px;
            overflow: hidden;
            background-color: #fff;
            float: left;
            .imgbox{
              width:334px;
              height: 188px;
              img{
                width:334px;
                height: 188px;
              }
            }
            .p1{
              color: #1D1D1D;
              font-size:28px;
              padding-left: 16px;
              padding-top: 5px;
              line-height: 40px;
              overflow:hidden; //超出的文本隐藏
              text-overflow:ellipsis; //溢出用省略号显示
              white-space:nowrap; //溢出不换行
            }
            .p2{
              color: #9E9E9E;
              font-size:24px;
              padding-left: 16px;
              line-height: 34px;
            }
          }
        }

    }
    .tour-menpiao{
      width: 100%;
      background-color: #fff;
      border-radius: 12px;
      padding:0 16px 16px 16px;
      .menpiao-item{
        padding: 20px 16px 16px 16px;
        border-bottom:1px solid rgba(206,206,206,1);
        i{
          font-style: normal;
        }
        .ziyin{
          /* width:56px; */
          display: inline-block;
          height:32px;
          background:rgba(255,190,13,1);
          opacity:1;
          border-radius:8px;
          line-height: 32px;
          font-size: 20px;
          color: #fff;
          text-align: center;
          /* margin-right: 10px; */
          padding: 0 4px;
          vertical-align: middle;
        }
        .tejia{
          width:58px;
          display: inline-block;
          height:32px;
          background:#FF3434;
          opacity:1;
          border-radius:8px;
          font-size: 20px;
          line-height: 32px;
          margin-right: 10px;
          color: #fff;
          padding: 0 4px;
          text-align: center;
          vertical-align: middle;
        }
        .youhui{
          height:32px;
          opacity:1;
          border-radius:8px;
          line-height: 32px;
          text-align: center;
          margin-right: 10px;
          border: 1px solid #FF3434;
          vertical-align: middle;
          background:rgba(255,255,255,1);
          border:2px solid rgba(255,52,52,1);
          font-size:20px;
          color: #FF3434;
          padding: 0 4px;
        }
        .buybtn{
          width:72px;
          height:34px;
          display: inline-block;
          color: #fff;
          text-align: center;
          line-height: 34px;
          background:rgba(255,52,52,1);
          border:2px solid rgba(255,52,52,1);
          opacity:1;
          font-size: 24px;
          position: relative;
          top: 5px;
          border-radius:24px;
          float: right;
        }
        .p1{
         /*  display: inline-block; */
         
          width: 100%;
          overflow: hidden;
          .span1{
            font-size:28px;
            font-weight:bold;
            width: 480px;
            /* display: inline-block; */
            float: left;
            color:rgba(29,29,29,1);
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
          }
          .span2{
            font-size:28px;
            /* display: inline-block; */
            float: left;
            color:#9E9E9E;
          }
          .span3{
            font-size:32px;
            font-weight:bold;
            /* line-height: 44px; */
            color:rgba(255,52,52,1);
            opacity:1;
            float: right;
            /* margin-top: 10px; */
          }
        }
        .p2{
          font-size:24px;
          line-height: 40px;
          height: 40px;
          width: 100%;
          margin-top: 10px;
        }
      }

    }
    .tour-xingcheng{
      width: 100%;
      .product-item{
        width:750px;
        height:320px ;
        padding-top: 10px;
        box-sizing: border-box;
        .box-img{
          width: 220px;
          display: inline-block;
          height: 220px;
          border-radius:12px;
          overflow: hidden;
          position: absolute;
          background-color: #dedede;
          /* box-shadow:0px 0px 12px rgba(52,52,52,0.2); */
          img{
            height: 240px;
          }
        }
        .con{
          padding:14px 28px 20px 180px ;
          margin-top: 36px;
          width: 630px;
          height: 240px;
          box-sizing: border-box;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 28px rgba(52,52,52,0.2);
          border-radius: 12px;
          margin-left: 60px;
          font-size: 0;
          .ziyin{
            width:60px;
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
            margin: 0 10px;
          }
          .tejia{
            width:58px;
            display: inline-block;
            height:32px;
            background:#FF3434;
            opacity:1;
            border-radius:8px;
            font-size: 20px;
            line-height: 32px;
            color: #fff;
            text-align: center;
          }
          .youhui{
            height:32px;
            opacity:1;
            border-radius:8px;
            font-size: 20px;
            line-height: 32px;
            color:#FF3434;
            display: inline-block;
            text-align: center;
            border: 1px solid #FF3434;
          }
          .buybtn{
            width:72px;
            height:34px;
            display: inline-block;
            color: #fff;
            text-align: center;
            line-height: 34px;
            background:rgba(255,52,52,1);
            border:2px solid rgba(255,52,52,1);
            opacity:1;
            font-size: 24px;
            position: relative;
            top: 10px;
            border-radius:24px;
            float: right;
          }
          .p1{
            width: 428px;
            font-size: 28px;
            color:rgba(45,45,45,1);
            line-height: 38px;
            /* padding-left: 20px; */

            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box; //作为弹性伸缩盒子模型显示。
            -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
            -webkit-line-clamp:2; //显示的行

          }
          .p0{
            padding: 0 6px;
            font-size: 0;
            margin-top: 8px;
            span{
              /* height:36px; */
              /* line-height: 36px; */
              background:rgba(255,255,255,1);
              border:2px solid rgba(255,52,52,1);
              font-size:20px;
              color: #FF3434;
              display: inline-block;
              border-radius: 8px;
              margin-right: 10px;
              padding: 0 4px;
              
            }
          }
          .p2{
            width: 418px;
            height: 48px;
            font-size: 24px;
            color: #d4d4d4;
            line-height: 48px;
            overflow: hidden;
            margin-top: 10px;
            .span1{
              float: left;
              font-size:36px;
              font-weight:bold;
              line-height:44px;
              color:rgba(255,52,52,1);
              opacity:1;
              span{
                width: 140px;
              }
              i{
                font-style: normal;
                font-size: 20px;
                color:rgba(158,158,158,1);
                line-height:28px;
              }
            }
            .span2{
              float: right;
              /* margin-left: 12px; */
              line-height: 34px;
              font-size: 24px;
              color:#FFBE0D;
              height: 34px;
              margin-top: 4px;
              img{
                width: 34px;
                height: 34px;
                position: relative;
                top: 6px;
              }
            }
          }
        }
        .p3{
          width: 558px;
          height: 48px;
          font-size: 24px;
          color: #d4d4d4;
          margin-top: -48px;
          margin-left: 100px;
          .span1{
            font-size: 22px;
            line-height: 28px;
            display: inline-block;
            color: #9E9E9E;
          }
          .span2{
            float: right;
            line-height: 36px;
            display: inline-block;
            color: #9E9E9E;
          }


        }

      }
    }
    .tour-pinglun{
      width: 100%;
      padding: 20px 12px;
      background-color: #fff;
      .itemcom{
        width: 575px;
        display: inline-block;
        margin-left: 70px;
        border-bottom:1px solid #CECECE ;
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
        .imgb{
          width: 100%;
          height:138px;
          img{
            width:182px;
            height: 138px;
            float: left;
            margin-right: 5px;
          }
        }
        .icon{
          img{
            width: 48px;
            height: 48px;
          }
          .span1{
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
      .img2{
        width: 60px;
        height: 60px;
        display: inline-block;
        background-color: #f2f2f2;
        position: absolute;
        border-radius: 60px;
        float: left;
      }
    }
    .tour-local {
      width: 100%;
      .touritem{
        padding: 20px;
        box-sizing: border-box;
        width: 100%;
        height:168px ;
        border-radius: 12px;
        background-color: #fff;
        margin-bottom: 20px;
        .imgb2{
          width: 170px;
          height: 128px;
          float: left;
          background-color: #eee;
          margin-right: 15px;
        img{
            width: 170px;
            height: 128px
          };
        }
        .con{
          margin-left: 18px;
          .p1{
            font-size:36px;
            font-weight:bold;
            line-height:50px;
            color:rgba(29,29,29,1);
            overflow: hidden;
              .span0{
                width: 360px;
                overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              float: left;
              }
            .span1{
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
          .p2{
            font-size:24px;
            font-weight:400;
            line-height:50px;
            color:#aaa;
            opacity:1;
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
          }
          .p3{
            font-size:24px;
            font-weight:500;
            line-height:36px;
            color:rgba(158,158,158,1);
          }
        }

      }
    }
  }
  .spice-icon{
    display: inline-block;
    font-size: 20px;
    color: #fff;
    background-color: red;
    padding:8px 20px;
    border-radius: 10px;
  }
  .spcie-box{
    position:absolute;
    margin-left: -10px;
    margin-top: 10px;
    height: 120px;
    width: 200px;
  }
  .spcie-else{
    position:absolute;
    width: 240px;
    margin-top: 170px;

  }
  .spcie-else .vi{
    float: right;
    display: inline-block;
    margin-right: 25px;
    margin-bottom: 25px;
  }
  .spcie-else .tuan{
    display: inline-block;
    font-size: 20px;
    color: #fff;
    background-color: rgba(0,0,0,.3);
    padding:8px 20px;
    border-radius: 10px;
  }
  .spcie-else .vi>img{
    width: 40px!important;
    height: 40px!important;
    position: relative;
  }

  </style>
