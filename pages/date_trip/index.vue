<template>
  <section class="section0">
    <section>
      <header-date :title="'下单'" ></header-date>
    </section>
    <section class="section1" >
      <!--日历head-->
      <ul class="trip-head">
        <template v-for="(item,ind) in pricedate">
          <li @click="setMonth(item.month,ind)" :key="ind" class="trip-head-con"
              :class="item.month==activeMonth?'active-head-con':''">{{item.month}}月
          </li>
        </template>
      </ul>
      <date-trip :dateprice="datedata" @setcheckday="setcheckday"></date-trip>
      <!--日历foot-->
      <p class="trip-tip">
        <span v-show="showsday!=''">{{showsday}}出发 - {{showeday}}返回</span>
        <span>最少{{product.min_num_guest}}人成团</span>
      </p>
    </section>
    <!--选择房间-->
    <section v-if="product.product_entity_type==1&&product.self_support==0">
      <ul class="checkroom">
        <template v-for="(item,ind) in rooms">
          <li :key="ind" class="checkitem" v-if="product.max_num_guest">
            <p class="checkitem_title">房间 {{ind}}
              <span v-if="item.add" @click="roomdel(ind)">删除</span>
            </p>
            <div class="checkitem_con">
              <span>成人</span>
              <span>
              <van-stepper
                integer
                v-model="item.adult"
                :min="1"
                :max="product.max_num_guest-item.child"
              />
            </span>
            </div>
            <div v-if="product.is_kids" class="checkitem_con">
              <span>儿童 <i v-if="product.max_child_age!=-1">&nbsp;0-{{product.max_child_age}}周岁</i></span>
              <span>
              <van-stepper
                integer
                :min="0"
                v-model="item.child"
                :max="product.max_num_guest-item.adult"
              />
            </span>
            </div>
            <van-checkbox class="checkitem-btn" v-if="product.is_single_pu&&item.adult==1&&item.child==0" v-model="item.pair"><span
              style="color:#399EF6;">接受单人配房</span></van-checkbox>
          </li>
        </template>
        <div class="addroom-btn" @click="roomadd()">
          <van-icon name="plus"/>
          添加房间
        </div>
      </ul>
    </section>
    <!--选择人数-->
    <section v-else>
      <div class="checkperson">
        <li class="checkitem">
          <div class="checkitem_con">
            <span>成人</span>
            <span>
              <van-stepper
                v-model="total_adult"
                integer
                :min="1"
              />
            </span>
          </div>
          <div v-if="product.is_kids" class="checkitem_con">
            <span>儿童 <i v-if="product.max_child_age!=-1">&nbsp;0-{{product.max_child_age}}周岁</i></span>
            <span>
              <van-stepper
                integer
                :min="0"
                v-model="total_kids"
              />
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
  import dateTrip from './dateTrip'
  import ConfirmFoot from '@/components/confirm_foot/foot.vue'
  import headerDate from '@/components/header/dateTrap.vue'
  import {getdateTrip} from '@/api/date_trip'
  export default {
    components: {
      dateTrip, ConfirmFoot , headerDate
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
      }
    },
    computed: {
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
      //产品
      product(){
        return this.$store.state.product.reservePro;
      }
    },
    watch: {
      'rooms': {
        handler: function (val, oldval) {   //特别注意，不能用箭头函数，箭头函数，this指向全局
          if (this.product.product_entity_type == 1 && this.product.self_support == 0 ) {
            let countchind = 0;
            let countadult = 0;
            for (let i = 0; i < val.length; i++) {
              countadult += val[i].adult;
              countchind += val[i].child;
            }
            if ((countadult + countchind) >= this.product.min_num_guest) {
              this.$store.commit("countprice", {
                room_total: val.length,//房间总数
                room_attributes: val,//房间数据,
                adult: countadult,
                child: countchind
              });
            }
            else {
              this.$store.commit("countprice", {
                room_total: 0,//房间总数
                room_attributes: [],//房间数据,
                adult: 0,
                child: 0

              });
              this.$dialog.alert({
                message: '总人数不足最少成团人数，请添加'
              });

            }

          }
        },
        deep: true
      },
      'total_adult'(val,oldval) {
        if (this.product.product_entity_type == 1 && this.product.self_support == 0) {
        } else if(oldval!=0) {

          let countperson = val + this.total_kids;
          if (countperson >= this.product.min_num_guest) {
            this.$store.commit("countprice", {
              room_total: 1,//房间总数
              room_attributes: [{
                adult: val,
                child: this.total_kids,
                pair: false,
              }],//房间数据,

              adult: val,
              child: this.total_kids

            });
          }
          else {
            this.$store.commit("countprice", {
              room_total: 0,//房间总数
              room_attributes: [],//房间数据,

              adult: 0,
              child: 0

            });
            this.$dialog.alert({
              message: '总人数不足最少成团人数，请添加2'
            });
          }
        }
      },
      'total_kids'(val) {
        if (this.product.product_entity_type == 1 && this.product.self_support == 0) {
        } else {
          let countperson = this.total_adult + val;
          if (countperson >= this.product.min_num_guest) {
            this.$store.commit("countprice", {
              room_total: 1,//房间总数
              room_attributes: [{
                adult: this.total_adult,
                child: val,
                pair: false,
              }],//房间数据,
              adult: this.total_adult,
              child: val
            });
          }
          else {
            this.$store.commit("countprice", {
              room_total: 0,//房间总数
              room_attributes: [],//房间数据,
              adult: 0,
              child: 0

            });
            this.$dialog.alert({
              message: '总人数不足最少成团人数，请添加'
            });
          }
        }
      },
    },
    created() {

    },
    mounted() {
      // //进来清空一次之前的价格日历vuex，之后可能要考虑返回的情况
      // this.$store.dispatch("emptyprice");
      //获得价格日历数据
      if(this.product.product_id){
        this.getpricedate(this.product.product_id);
      }

    },

    methods: {
      //获得价格日历数据
      async getpricedate(id) {
        let {data, code} = await getdateTrip(id)
        if(code === 0) {
          this.pricedate = data;
          //初始化选择第一条给子组件的数据和第一个月份数据
          this.datedata = this.pricedate[0];
          this.activeMonth = this.pricedate[0].month;
          //初始化生成房间
          this.roomint();
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
        let sday1 = new Date(parseInt(this.datedata.years) + '-' + parseInt(this.datedata.month) + '-' + parseInt(this.checkday));
        console.log(sday1)
        let day1en = sday1.getTime() + (this.product.duration_days) * 24 * 60 * 60 * 1000;
        let eday1 = new Date(day1en);
        let sday2 = (sday1.getMonth() + 1) + '月' + (sday1.getDate()) + '日';
        let eday2 = (eday1.getMonth() + 1) + '月' + (eday1.getDate()) + '日';
        this.showsday = sday2;
        this.showeday = eday2;
        var tha = this;
        this.$store.commit("countprice", {
          product_id: tha.product.product_id,//产品id
          departure_date: sday1,//出发日期
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
            } else {
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
        }
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
      //计算价格熟悉参数重置


    }
  }

</script>

<style scoped>
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
    color: #191919
  }

  .active-head-con {
    border-bottom: 4px solid #399EF6 !important;
  }

  .trip-tip {
    font-size: 20px;
    height: 50px;
    line-height: 50px;
    width: 100%;
    display: inline-block;
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
    color: #FB6865;
  }

  .section0 {
    background-color: #f3f3f3;
  }

  .section1 {
    background-color: #fff;
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
  }

  .checkroom, .checkperson {
    padding: 0 32px;
    padding-bottom: 180px;
  }

  .checkitem {
    width: 686px;
    padding: 20px;
    box-sizing: border-box;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 12px rgba(0, 0, 0, 0.1);
    opacity: 1;
    border-radius: 8px;
    margin-top: 20px;
  }

  .addroom-btn {
    width: 240px;
    height: 60px;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.16);
    opacity: 1;
    border-radius: 8px;
    text-align: center;
    color: #191919;
    line-height: 60px;
    font-size: 24px;
    margin-left: 255px;
    margin-top: 30px;
  }

  .checkitem_title {
    font-size: 30px;
    height: 70px;
    line-height: 70px;
    color: #191919;
    border-bottom: 3px solid #e4e4e4;
  }

  .checkitem_title span {
    color: #399EF6;
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
    color: #191919;
    font-size: 28px;
    line-height: 80px;

  }

  .checkitem_con span:nth-child(1) i {
    color: #b2b2b2;
    font-size: 22px;
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
