<template>
  <div class="container containerxxx">
    <div class="nav-bar">
      <van-nav-bar title="我的优惠券" left-arrow @click-left="onClickLeft"/>
    </div>
    <div class="tab" v-if="concover==3">
      <van-tabs @click="onClick" v-model="active">
        <van-tab v-for="(title,indw) in orderTile" :key="title.id" :title="title.title+'('+leng[indw]+')'" class="layout">
          <loading v-if="firstEnter"></loading>
          <div class="no-data" v-if="!firstEnter && !conList.length">暂无数据</div>
          <!-- 产品 -->
          <template v-if="conList.length">
            <div v-for="(item,index) in conList" :key="index">
              <div class="cup-item">
                <div class="cupleft" :class="status=='unuse'?'':'cupover'">
                  <p class="p1">{{item.minus_label}}</p>
                  <p class="p2">{{item.full_label}}</p>
                </div>
                <div class="cupcon">
                  <p class="p1">{{item.title}}</p>
                  <p class="p2">{{item.date_label}}</p>
                  <p class="p2">{{item.period_label}}</p>
                  <p class="p2" @click="item.show=(item.show=='0')?'1':'0'">使用说明
                    <van-icon v-if="item.show=='0'" name="arrow-down" />
                    <van-icon v-if="item.show=='1'" name="arrow-up" />
                  </p>
                </div>
                <div class="cupright">
                  <span v-if="status==='unuse'"></span>
                  <span class="btn2" v-else-if="status==='used'">已经使用</span>
                  <span class="btn2" v-else>已过期</span>
                </div>
              </div>
              <div class="cup-else" v-show="item.show==='1'">
                <p v-for="(x,ind) in item.rules" :key="ind">{{ind+1}}.{{x}}</p>
              </div>
            </div>
          </template>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>
<script>
  import Loading from '@/components/loading/list'
  import {getcouponList} from '@/api/coupon'
  export default {
    name: "",
    components: {
      Loading
    },
    data() {
      return {
        active: 0,
        type: this.$route.query.type,
        conList: [],
        firstEnter: true,
        status:'unuse',
        leng:[0,0,0],
        concover:0
      }
    },
    created() {
      this.getLength();
      this.getLength1();
      this.getLength2();
      this.orderTile = [
        {type: 'unuse', title: '未使用', id: 0},
        {type: 'used', title: '使用记录', id: 1},
        {type: 'expired', title: '已过期', id: 2},
      ]
    },
    mounted(){
      let _obj = {
        'unuse': 0,
        'used': 1,
        'expired': 2,
      }
      this.active = _obj[this.status]

    },
    methods: {
      onClickLeft() {
        this.$router.push({
          path: '/personal',
        })
      },
      async getCouData() {
        this.conList=[];
        let {code, data} = await getcouponList(this.status)
        if (code === 0) {
          this.firstEnter = false;
          if(data.length){
            this.conList = data.map(v => {
              this.$set(v, 'show', '0')
              return v
            })
          }
          else{
            this.conList = [];
          }

        }


      },
      async getLength() {
        this.conList=[];
        let this_=this;
        let {code, data} = await getcouponList('unuse')
        if (code == 0) {
          this_.firstEnter = false;
          if(data&&data.length){
            this_.leng[0] = data.length;
            this_.conList = data.map(v => {
              this_.$set(v, 'show', '0')
              return v
            })
          }
          else{
            this_.conList = [];
          }
        }
        this.concover+=1

      },
      async getLength1() {
        let this_=this;
        let {code, data} = await getcouponList('used')
        if (code == 0) {
          if(data&&data.length){
            this_.leng[1] = data.length;
          }
          else{
            this_.leng[1] = 0;
          }
        }
        this.concover+=1
      },
      async getLength2() {
        let this_=this;
        let {code, data} = await getcouponList('expired')
        if (code == 0) {
          if(data&&data.length){
            this_.leng[2] = data.length;
          }
          else{
            this_.leng[2] = 0;
          }
        }
        this.concover+=1
      },
      onClick(index) {
        this.firstEnter = true;
        let _arr = ['unuse', 'used','expired'];
        this.status=_arr[index];
        this.getCouData()
      },
    },

  };
</script>
<style lang="scss" scoped>
  .container {
    .tab {
      background-color: #fff;
      .layout {
        padding: 24px;

      }
      .cup-item{
        width:670px;
        height:140px;
        margin-top: 30px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 12px rgba(65,63,63,0.16);
        opacity:1;
        border-radius:8px;
        margin-left:10px;

        .cupleft{
          padding-top: 20px;
          float: left;
          border-radius:8px 0 0 8px;
          width:228px;
          height: 140px;
          text-align: center;
          background-image:url('../../assets/imgs/color.png');
          background-repeat: no-repeat;
          background-position: 0;
          background-size: 228px 140px;
          .p1{
            font-size:40px;
            font-weight:bold;
            line-height:52px;
            color:rgba(255,255,255,1);
          }
          .p2{
            font-size:24px;
            font-weight:400;
            line-height:32px;
            color:rgba(255,255,255,1);
          }

        }
        .cupcon{
          float: left;
          width:280px;
          height: 140px;
          text-align: left;
          padding-top: 22px;
          padding-left: 20px;
          .p1{
            font-size:24px;
            font-weight:bold;
            line-height:36px;
            color:#707070;
          }
          .p2{
            font-size:20px;
            line-height:28px;
            color:#707070;
          }
        }
        .cupright{
          float: left;
          width:120px;
          height: 140px;
          text-align: center;
          padding-top: 50px;
          .btn1{
            width:140px;
            height:40px;
            background:linear-gradient(180deg,rgba(27,141,255,1) 0%,rgba(53,201,255,1) 100%);
            opacity:1;
            border-radius:40px;
            display: block;
            font-size:24px;
            line-height:40px;
            color:rgba(255,255,255,1);
          }
          .btn2{
            width:140px;
            display: block;
            height:40px;
            border:2px solid rgba(194,194,194,1);
            border-radius:40px;
            font-size:24px;
            line-height:40px;
            color:rgba(194,194,194,1);
          }
        }
        .cupover{
          background-image:url('../../assets/imgs/notcolor.png')!important;
          background-repeat: no-repeat;
          background-position: 0;
          background-size: 228px 140px;
        }
      }
      .cup-else{
        width:670px;
        background:rgba(255,255,255,1);
        box-shadow:0px 2px 12px rgba(80,75,75,0.16);
        opacity:1;
        border-radius:0 0 8px 8px;
        margin-left: 10px;
        padding: 20px;
        p{
          font-size:20px;
          font-weight:400;
          line-height:36px;
          color:rgba(159,159,159,1);
        }
      }
      .no-data {
        position: fixed;
        top: 180px;
        left: 0;
        bottom: 0;
        right: 0;
        padding-top: 50px;
        text-align: center;
        color: #aaa;
        font-size: 28px;
      }
    }
  }

</style>
