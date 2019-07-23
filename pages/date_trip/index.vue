<template>
  <section class="section0">
    <section>
      <header-date :title="$t('dateTripPage.title')"></header-date>
    </section>
    <section class="section1">
      <!--日历head-->
      <ul class="trip-head">
        <div class="swiper-container"
          v-swiper:mySwiper="swiperOption">
          <div class="swiper-wrapper">
            <template v-for="(item,ind) in pricedate">
              <li @click="setMonth(item.month,ind)"
                :key="ind"
                class="trip-head-con  swiper-slide"
                :class="item.month==activeMonth?'active-head-con':''">{{item.month}}{{$t('month')}}
              </li>
            </template>
          </div>
        </div>
      </ul>
      <date-trip :dateprice="datedata"
        :checkdayx="checkday+''"
        @setcheckday="setcheckday"></date-trip>
      <!--日历foot-->
      <p class="trip-tip">
        <span v-show="showsday!=''">{{showsday}}{{$t('dateTripPage.startOff')}} - {{showeday}}{{$t('dateTripPage.back')}}</span>
        <span>{{$t('dateTripPage.atLeast')}}{{product.min_num_guest}}{{$t('dateTripPage.inGroup')}}</span>
      </p>
    </section>
    <!--选择房间-->
    <section v-if="product.product_entity_type==1&&product.self_support==0">
      <ul class="checkroom">
        <template v-for="(item,ind) in rooms">
          <li :key="ind"
            class="checkitem"
            v-if="product.max_num_guest">
            <p class="checkitem_title">{{$t('room')}} {{ind+1}}
              <span v-if="item.add"
                @click="roomdel(ind)">{{$t('delete')}}</span>
            </p>
            <div class="checkitem_con">
              <span>{{$t('adult')}}</span>
              <span>
                <van-stepper integer
                  v-model="item.adult" class="notzero"
                  :min="1"
                  :max="product.max_num_guest-item.child" />
              </span>
            </div>
            <div v-if="product.is_kids"
              class="checkitem_con">
              <span>{{$t('child')}} <i v-if="product.max_child_age!=-1">&nbsp;0-{{product.max_child_age}}{{$t('yearsOld')}}</i></span>
              <span>
                <van-stepper integer
                  :min="0"
                  v-model="item.child"
                  :max="product.max_num_guest-item.adult"
                  v-if="item.child>0" class="notzero"
                />
                 <van-stepper integer
                              :min="0"
                              v-model="item.child"
                              class="else"
                              :max="product.max_num_guest-item.adult" v-else/>
              </span>
            </div>

            <van-checkbox class="checkitem-btn"
              v-if="product.is_single_pu&&item.adult==1&&item.child==0"
              v-model="item.pair"><span style="color:#399EF6;">{{$t('dateTripPage.acceptSingleRoom')}}</span></van-checkbox>
          </li>
        </template>
        <div class="addroom-btn"
          @click="roomadd()">
          <van-icon name="add-o" />
          {{$t('dateTripPage.addRoom')}}
        </div>
      </ul>
    </section>
    <!--选择人数-->
    <section v-else>
      <div class="checkperson">
        <li class="checkitem">
          <div class="checkitem_con">
            <span>{{$t('adult')}}</span>
            <span>
              <van-stepper v-model="total_adult"
                integer
                :min="1" class="notzero" />
            </span>
          </div>
          <div v-if="product.is_kids"
            class="checkitem_con">
            <span>{{$t('child')}} <i v-if="product.max_child_age!=-1">&nbsp;0-{{product.max_child_age}}{{$t('yearsOld')}}</i></span>
            <span>
               <van-stepper v-if="total_kids>0" integer :min="0" v-model="total_kids" class="notzero" />
               <van-stepper v-else integer :min="0" v-model="total_kids" class="else"/>
            </span>
          </div>
        </li>
      </div>
    </section>
    <!--footer-->
    <section>
      <confirm-foot></confirm-foot>
    </section>
  </section>
</template>

<script>
  import {mapState, mapGetters} from 'vuex'
  import dateTrip from '@/components/confirm_foot/dateTrip'
  import ConfirmFoot from '@/components/confirm_foot/foot.vue'
  import headerDate from '@/components/header/dateTrap.vue'
  import {getdateTrip} from '@/api/date_trip'

  export default {
    components: {
      dateTrip, ConfirmFoot, headerDate
    },
    data() {
      return {
        //价格日历数据
        pricedate: [

        ],
        //选中的月份
        activeMonth: 0,
        //选中的日期
        checkday: '',
        //子日历组件的数据
        datedata: {},
        showsday: '',
        roomintnum: 0,
        showeday: '',
        //房间信息
        rooms: [
          {
            adult: 1,
            child: 0,
            pair: false,
            add: false
          }
        ],
        //选择人数时参数
        total_kids: 0,
        total_adult: 0,
        firstyear: this.$route.query.year || '',
        firstmonth: this.$route.query.month || '',
        firstday: this.$route.query.day | '',
        swiperOption: {
          slidesPerView: 'auto',
          slidesOffsetBefore: 16,
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper
          on: {
            slideChange() {
              // console.log('onSlideChangeEnd', this);
            },
            tap(e) {

            }
          }
        },
        product: {}
      }
    },
    computed: {
      ...mapState({
        vxReservePro: state => state.product.reservePro
      }),
      // 获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
      // 产品
      // product(){
      //   return this.reservePro;
      // },
      // ...mapState([
      //   'product/reservePro'
      // ])
    },
    watch: {
      'rooms': {
        handler: function (val, oldval) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          let countchind = 0;
          let countadult = 0;
          let objval = [];
          let this_=this;
          for (let i = 0; i < val.length; i++) {
            countadult += val[i].adult;
            countchind += val[i].child;
            let objarrx = {adult: val[i].adult, child: val[i].child, pair: val[i].pair == true ? 'Y' : 'N', };
            objval.push(objarrx)
          }
          if (this.product.product_entity_type == 1 && this.product.self_support == 0 && this.roomintnum == 1) {

            if ((countadult + countchind) >= this.product.min_num_guest) {
              this.$store.commit("countprice", {
                room_total: objval.length,//房间总数
                room_attributes: objval,//房间数据,
                adult: countadult,
                child: countchind
              });
            }
            else if (this.product.product_id) {
              this.$store.commit("countprice", {
                room_total: 0,//房间总数
                room_attributes: [],//房间数据,
                adult: 0,
                child: 0

              });
              this.$dialog.alert({
                message: this_.$t('dateTripPage.notEnoughPeople')
              });

            }

          }
          else {
            this.$store.commit("countprice", {
              room_total: objval.length,//房间总数
              room_attributes: objval,//房间数据,
              adult: countadult,
              child: countchind
            });
          }
        },
        deep: true
      },
      'total_adult'(val, oldval) {
        let this_=this;
        if (this.roomintnum == 1) {
          if (this.product.product_entity_type == 1 && this.product.self_support == 0) {}
          else {
            let countperson = val + this.total_kids;
            if (countperson >= this.product.min_num_guest) {
              this.$store.commit("countprice", {
                room_total: 1,//房间总数
                room_attributes: [{
                  adult: val,
                  child: this.total_kids,
                  pair: 'N',
                }],//房间数据,
                adult: val,
                child: this.total_kids

              });
            }
            else if (this.product.product_id) {
              this.$store.commit("countprice", {
                room_total: 0,//房间总数
                room_attributes: [],//房间数据,
                adult: 0,
                child: 0

              });
              this.$dialog.alert({
                message: this_.$t('dateTripPage.notEnoughPeople')
              });
            }
          }
        }
      },
      'total_kids'(val) {
        let this_=this;
        if (this.roomintnum == 1) {
          if (this.product.product_entity_type == 1 && this.product.self_support == 0) {
          } else {
            let countperson = this.total_adult + val;
            if (countperson >= this.product.min_num_guest) {
              this.$store.commit("countprice", {
                room_total: 1,//房间总数
                room_attributes: [{
                  adult: this.total_adult,
                  child: val,
                  pair: 'N',
                }],//房间数据,
                adult: this.total_adult,
                child: val
              });
            } else if (this.product.product_id) {
              this.$store.commit("countprice", {
                room_total: 0,//房间总数
                room_attributes: [],//房间数据,
                adult: 0,
                child: 0
              });
              this.$dialog.alert({
                message: this_.$t('dateTripPage.notEnoughPeople')
              });
            }
          }
        }
      }
    },
    mounted() {
      setTimeout(() => {
        this.product = JSON.parse(JSON.stringify(this.vxReservePro))
        //进来清空一次之前的价格日历vuex，之后可能要考虑返回的情况
        this.$store.dispatch("emptyprice");
        //获得价格日历数据
        if (this.product.product_id) {
          this.getpricedate(this.product.product_id);
        }
        else {
          this.$router.go(-1);
        }
      }, 20)
    },
    methods: {
      //获得价格日历数据
      async getpricedate(id) {
        let {data, code} = await getdateTrip(id)
        if (code === 0) {
          this.pricedate = data;
          //初始化选择第一条给子组件的数据和第一个月份数据
          var this_ = this;
          //初始化生成房间
          this.roomint();
          if (this.firstyear != '' && this.firstmonth != '' && this.firstday != '') {
            for (let i = 0; i < this_.pricedate.length; i++) {
              if (this_.pricedate[i].years == this_.firstyear && this_.pricedate[i].month == this_.firstmonth) {
                this_.datedata = this_.pricedate[i];
                this_.activeMonth = this_.firstmonth;
                this_.checkday = this_.firstday + '';
              }
            }
            if (this.activeMonth == '') {
              this.datedata = this.pricedate[0];
              this.activeMonth = this.pricedate[0].month;
            }
          }
          else {
            this.datedata = this.pricedate[0];
            this.activeMonth = this.pricedate[0].month;
          }
        } else {

        }
      },
      setMonth(val, ind) {
        this.activeMonth = val;
        this.datedata = this.pricedate[ind];
        this.checkday = '';
        this.showsday = '';
        this.showeday = '';
        this.$store.commit("countprice", {
          departure_date: '',//出发日期
        });
      },
      //监听选择出发日期
      setcheckday(val) {
        this.checkday = val;
        let sday1 = new Date(parseInt(this.datedata.years) + '/' + parseInt(this.datedata.month) + '/' + parseInt(this.checkday));
        let day1en = sday1.getTime() + (this.product.duration_days - 1) * 24 * 60 * 60 * 1000;
        let eday1 = new Date(day1en);
        let sday2 = (sday1.getMonth() + 1) + '月' + (sday1.getDate()) + '日';
        let eday2 = (eday1.getMonth() + 1) + '月' + (eday1.getDate()) + '日';
        this.showsday = sday2;
        this.showeday = eday2;
        var tha = this;
        // console.log(this.roomintnum)
        this.$store.commit("countprice", {
          product_id: tha.product.product_id,//产品id
          departure_date: parseInt(this.datedata.years) + '-' + parseInt(this.datedata.month) + '-' + parseInt(this.checkday),//出发日期
        });
      },
      //设置默认房间数和每个房间住的人数
      roomint() {
        if (this.product.product_entity_type == 1 && this.product.self_support == 0) {
          let proroom = [];
          for (let i = 0; i < Math.ceil(this.product.min_num_guest / this.product.max_num_guest); i++) {
            let objroom = {};
            if (i != Math.ceil(this.product.min_num_guest / this.product.max_num_guest) - 1) {
              objroom = {
                adult: this.product.max_num_guest,
                child: 0,
                pair: false,
                add: false
              }
            }
            else if (this.product.min_num_guest == this.product.max_num_guest) {
              objroom = {
                adult: this.product.min_num_guest,
                child: 0,
                pair: false,
                add: false
              }
            }
            else {
              objroom = {
                adult: this.product.min_num_guest % this.product.max_num_guest,
                child: 0,
                pair: false,
                add: false
              }
            }
            proroom.push(objroom)
          }
          this.rooms = proroom;
        }
        else {
          this.total_adult = this.product.min_num_guest;
          this.rooms = [{
            adult: this.product.min_num_guest,
            child: 0,
            pair: false,
            add: false
          }]
        }
        this.roomintnum = 1;
      },
      //添加房间
      roomadd() {
        this.rooms.push(
          {
            adult: 1,
            child: 0,
            pair: false,
            add: true
          }
        )
      },
      roomdel(ind) {
        this.rooms.splice(ind, 1)
      },


    }
  }
</script>
<style scoped>
  body{
    overflow: scroll!important;
  }
  .trip-head {
    width: 100%;
    height: 108px;
    padding: 0 25px;
  }
  .trip-head-con {
    text-align: center;
    font-size: 28px;
    line-height: 104px;
    display: inline-block;
    float: left;
    width: 116.5px;
    box-sizing: border-box;
    border-bottom: 4px solid #fff;
    color: #191919;
  }
  .active-head-con {
    border-bottom: 4px solid #399ef6 !important;
    color: #399ef6!important;
  }
  .trip-tip {
    font-size: 24px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: inline-block;
    color: #131313;
    padding: 0 25px;
  }
  .trip-tip span:nth-child(1) {
    float: left;
    display: inline-block;
    width: 50%;
    text-align: left;
    color: #434343;
  }
  .trip-tip span:nth-child(2) {
    float: right;
    display: inline-block;
    width: 40%;
    text-align: right;
    color: #ff0000;
  }
  .section0 {
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    background-color: #f3f3f3;
  }
  .section1 {
    background-color: #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  }
  .checkroom,
  .checkperson {
    padding: 0 32px;
    padding-bottom: 180px;
  }
  .checkitem {
    width: 686px;
    padding: 0 20px 20px 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 8px;
    margin-top: 20px;
  }
  .addroom-btn {
    width:464px;
    height:76px;
    background:rgba(57,158,246,1);
    opacity:1;
    border-radius:12px;
    text-align: center;
    line-height: 76px;
    font-size: 32px;
    margin-left: 113px;
    margin-top: 30px;
    color: #fff;
  }
  .checkitem_title {
    font-size: 30px;
    height:90px;
    line-height: 90px;
    color: #191919;
    border-bottom: 3px solid #e4e4e4;
  }
  .checkitem_title span {
    color: #FB605D;
    float: right;
    font-size: 24px;
  }
  .checkitem_con {
    width: 100%;
    height: 80px;
  }
  .checkitem_con span:nth-child(1) {
    width: 40%;
    float: left;
    text-align: left;
    color: #3e3e3e;
    font-size: 28px;
    line-height: 80px;
  }
  .checkitem_con span:nth-child(1) i {
    color: #b2b2b2;
    font-size: 22px;
    font-style: normal;
  }
  .checkitem_con span:nth-child(2) {
    width: 60%;
    margin-top: 15px;
    float: right;
    text-align: right;
  }
  .checkitem-btn {
    font-size: 24px;
    width: 100%;
    text-align: left;
    height: 60px;
    line-height: 60px;
  }
</style>
