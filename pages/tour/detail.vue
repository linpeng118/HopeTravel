<template>
 <div class="tour-page">
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
         <span><img src="../../assets/imgs/tour/video.png" alt="">{{product.video_total}}</span>
         <span><img src="../../assets/imgs/tour/img.png" alt="">{{product.image_total}}</span>
       </p>
       <div v-if="product">
         <p class="p1">{{product.name}}</p>
         <p class="p2">
           <span class="span1">
            <img src="../../assets/imgs/tour/star.png" alt="">{{product.score||5.0}}分
           </span>
           <span class="span2" v-if="product.comment_total">（{{product.comment_total}}{{$t('tour.comm')}}）</span>
         </p>
         <p class="p3">
           <span class="span1"><img src="../../assets/imgs/tour/add.png" alt=""></span>
           <span class="span2"> <img src="../../assets/imgs/tour/right2.png" alt="">{{product.address}}

           </span>
         </p>
         <p class="p3">
           <span class="span1"><img src="../../assets/imgs/tour/time.png" alt=""></span>
           <span class="span2">{{$t('tour.yingye')}}：{{product.opening_hours}}</span>
         </p>
         <p class="p3">
           <span class="span1"><img src="../../assets/imgs/tour/play.png" alt=""></span>
           <span class="span21">{{$t('tour.playtime')}}：{{product.play_days>0?product.play_days+'天':''}} {{product.play_hours>0?product.play_hours+'小时':''}}
           <i class="span4">{{product.price}}/起 <a href="#piaopiao" style="color: red">&nbsp;&nbsp;{{$t('tour.byatt')}}</a></i>
           </span>
         </p>
       </div>
     </div>
     <!--攻略-->
     <div class="tourtitle" v-if="attack&&attack.list&&attack.list.length>0">
       <span class="span1">玩法攻略</span>
       <span class="span2">（{{attack.total}}篇）</span>
       <span class="span3" @click="toattlist()">查看更多<img src="../../assets/imgs/tour/right.png" alt=""></span>
     </div>
     <div class="tour-gonglve" v-if="attack&&attack.list&&attack.list.length>0">
       <div class="gonglvebox">
         <div class="gonglve-item" v-for="(item,ind) in attack.list" :key="ind" v-if="ind<3" @click="toatt(item.article_id)" >
           <div class="imgbox"><img :src="item.cover" alt=""></div>
           <p class="p1">{{item.name}}</p>
           <p class="p2">{{item.days!=''?item.days+'天行程':''}}{{item.tour_num!=''?item.tour_num+'个景区':''}}</p>
         </div>
       </div>
     </div>
     <!--门票-->
     <div class="tourtitle" v-if="tickets&&tickets.list&&tickets.list.length>0" id="piaopiao" >
       <span class="span1">{{$t('tour.tour-atr')}}</span>
       <span class="span2">（{{tickets.total}}项）</span>
       <span class="span3" @click="toprolist()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
     </div>
     <div class="tour-menpiao" v-if="tickets&&tickets.list&&tickets.list.length>0">
       <div class="menpiao-item" v-for="(item,ind) in tickets.list" :key="ind">
         <p class="p1"><i class="ziyin" v-if="item.self_support">{{$t('selfSupport')}}</i>
           <span class="span1">{{item.name}}</span>
           <span class="span2">（需要身份证）</span>
           <span class="span3">{{item.default_price}}</span>
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
       <span class="span3" @click="toprolist()">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
     </div>
     <div class="tour-xingcheng" v-if="products&&products.list.length">
       <div class="product-item" target="_blank" v-for="(item,ind) in products.list" :key="ind" @click="toproobj(item.product_id)">
         <div class="box-img">
           <img :src="item.image" alt="">
           <span class="spcie-box">
             <i class="spice-icon" v-for="(item3,ind3) in item.special_icons" :key="ind3">{{item3.title}}</i>
           </span>
           <span class="spcie-else">
             <i class="vi" v-if="item.is_video"><img src="../../assets/imgs/tour/video2.png" alt=""></i>
           </span>
         </div>
         <div class="con">
           <div class="p1" ><i class="ziyin" v-if="item.self_support">{{$t('selfSupport')}}</i>{{item.name}}</div>
           <div class="p0">
             <span v-for="(item2,ind2) in item.coupons" :key="ind2" v-if="ind2<2">{{item2}}</span>
           </div>
           <p class="p2">
             <span class="span1">
                {{item.special_price ? item.special_price: item.default_price}}
                <i>起&nbsp;</i>
                <i v-if="item.special_price" style="text-decoration:line-through">{{item.default_price}}</i>
             </span>
             <span class="span2"><img src="../../assets/imgs/tour/star.png" alt="">{{item.comment_score}}分</span>
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
       <span class="span3">{{$t('tour.lookmore')}}<img src="../../assets/imgs/tour/right.png" alt=""></span>
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
            {{item.name}}
             <span class="span1"><img src="../../assets/imgs/tour/add.png" alt="">{{item.distance}}</span>
           </p>
           <p class="p2">{{item.brief||$t('tour.no-con1')}}</p>
           <p class="p3">门票：{{item.ticket_price||$t('tour.no-con2')}}</p>
         </div>
       </div>
     </div>
   </div>


 </div>
</template>

<script>

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
    async asyncData({$axios, query, store, req}) {
      let tourId,
        product, attack,
        tickets,
        products,
        comments,
        nearby
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
          product = data.tour_detail; // 产品信息
          attack = data.attack_article;
          tickets = data.tickets;
          products = data.products;
          comments = data.comments;
          nearby = data.nearby_tour
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
        this.$router.push(goToBackPage)
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
      totour(id) {
        this.$router.push({
          path: '/totour/detail',
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


<style lang="scss" scoped>
  .tour-page{
    background-color:#f3f3f3 ;
    padding-bottom: 52px;
    overflow-x: hidden;
  }
  .tour-head{
    width: 750px;
    height: 640px;
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
        line-height:40px;
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
        padding: 24px;
        background-color: #fff;
        border-radius:12px;
        .p1{
          color: #1D1D1D;
          font-size: 44px;
          line-height: 60px;
        }
        .p2{
          .span1{
            line-height: 34px;
            font-size: 24px;
            color:#FFBE0D;
            img{
              width: 20px;
            }
          }
          .span2{
            line-height: 34px;
            font-size: 24px;
            color: #5e5e5e;
          }
        }
        .p3{
          padding-bottom: 1px ;
          display: inline-block;
          .span1{
           float: left;
            img{width: 28px;height: 28px}
          }
          .span2{
            display: inline-block;
            line-height: 71px;
            color: #cecece;
            margin-left: 5px;
            font-size:28px;
            border-bottom: 1px solid #cecece;
            width: 550px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            padding-bottom: 10px;
            img{width: 28px;height: 28px;float: right;position: relative;top: 0.37rem;}
          }
          .span21{
            display: inline-block;
            line-height: 72px;
            margin-left: 5px;
            color: #cecece;
            font-size:28px;
            width: 590px;
          }
          .span3{

          }
          .span4{
            font-size:24px;
            font-weight:bold;
            color:rgba(29,29,29,1);
            float: right;
            line-height: 72px;
            font-style: normal;
          }
        }
      }
    }
    .tourtitle{
      width: 100%;
      padding: 16px 0;
      margin-top: 34px;
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
      height: 238px;
      background-color: #fff;
      border-radius: 12px;
      padding:0 16px 16px 16px;
      .menpiao-item{
        padding: 0 16px 16px 16px;
        border-bottom:1px solid rgba(206,206,206,1);
        i{
          font-style: normal;
        }
        .ziyin{
          width:58px;
          display: inline-block;
          height:32px;
          background:rgba(255,190,13,1);
          opacity:1;
          border-radius:8px;
          line-height: 32px;
          font-size: 20px;
          color: #fff;
          text-align: center;
          margin-right: 10px;
          padding: 0 8px;
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
          padding: 0 8px;
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
          padding: 0 8px;
          text-align: center;
          margin-right: 10px;
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
          display: inline-block;
          .span1{
            font-size:28px;
            font-weight:bold;
            width: 250px;
            display: inline-block;
            color:rgba(29,29,29,1);
            overflow:hidden; //超出的文本隐藏
            text-overflow:ellipsis; //溢出用省略号显示
            white-space:nowrap; //溢出不换行
          }
          .span2{
            font-size:28px;
            line-height:40px;
            display: inline-block;
            color:#9E9E9E;
          }
          .span3{
            font-size:32px;
            font-weight:bold;
            line-height:44px;
            color:rgba(255,52,52,1);
            opacity:1;
            float: right;
            position: relative;
            top: 10px;
          }
        }
        .p2{
          font-size:24px;
          line-height: 40px;
          height: 40px;
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
          width: 240px;
          display: inline-block;
          height: 240px;
          border-radius:12px;
          overflow: hidden;
          position: absolute;
          background-color: #dedede;
          box-shadow:0px 0px 12px rgba(52,52,52,0.2);
          img{
            height: 240px;
          }
        }
        .con{
          padding:20px 28px 20px 180px ;
          margin-top: 56px;
          width: 620px;
          height: 240px;
          box-sizing: border-box;
          background:rgba(255,255,255,1);
          box-shadow:0px 0px 28px rgba(52,52,52,0.2);
          border-radius: 12px;
          margin-left: 60px;
          .ziyin{
            width:58px;
            display: inline-block;
            height:32px;
            background:rgba(255,190,13,1);
            opacity:1;
            border-radius:8px;
            line-height: 32px;
            font-size: 20px;
            color: #fff;
            text-align: center;
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
            width: 418px;
            font-size: 28px!important;
            color: #2d2d2d;
            line-height: 36px;
            padding-left: 20px;

            overflow: hidden;
            text-overflow: ellipsis;
            display:-webkit-box; //作为弹性伸缩盒子模型显示。
            -webkit-box-orient:vertical; //设置伸缩盒子的子元素排列方式--从上到下垂直排列
            -webkit-line-clamp:2; //显示的行

          }
          .p0{
            padding-left: 20px;
            margin-top: -10px;
            span{
              height:36px;
              line-height: 36px;
              background:rgba(255,255,255,1);
              border:2px solid rgba(255,52,52,1);
              font-size:20px;
              color: #FF3434;
              display: inline-block;
              border-radius: 8px;
              margin-right: 10px;
              padding: 0 10px;;
            }
          }
          .p2{
            width: 418px;
            height: 48px;
            font-size: 24px;
            color: #d4d4d4;
            padding-left: 10px;
            line-height: 48px;
            .span1{
              font-size:36px;
              font-weight:bold;
              line-height:44px;
              color:rgba(255,52,52,1);
              opacity:1;
              i{
                font-style: normal;
                font-size: 20px;
                color:rgba(158,158,158,1);
                line-height:28px;
              }
            }
            .span2{
              float: right;
              margin-left: 12px;
              line-height: 34px;
              font-size: 24px;
              color:#FFBE0D;
              img{
                width: 34px;
                height: 34px;
                position: relative;
                top: 8px;
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
            line-height: 36px;
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
            .span1{
              font-size:24px;
              font-weight:400;
              line-height:34px;
              color:rgba(255,190,13,1);
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
    top:16px;
  }
  </style>
