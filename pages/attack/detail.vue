<template>
  <div ref="homeatt">
    <div class="banner">
    <a v-if="!isApp" class="return" @click="goBack" href="javascript:;"></a>
    <a v-if="!isApp" class="right" @click="goBack" href="javascript:;"></a>
    <img v-if="objdata&&objdata.cover" :src="objdata.cover" alt="">
  </div>
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
  export default {

    name: "attack-detail",
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
        shownav:false,

      };
    },
    mounted() {
      this.getpro()
      this.getisfav()
      window.addEventListener('scroll', this.menu)
    },
    methods: {
      goBack() {
        window.history.go(-1);
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
  };
</script>
<style>
  .attack-item img{
    max-width: 686px;
    height: auto;
  }

</style>
<style lang="scss" scoped>
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
    background-color: rgba(0,0,0,0);
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
          color: #d9d9d9;
        }
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
      margin-top: 43px;
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
