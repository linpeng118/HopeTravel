<!--订单和行程的页脚组件-->
<template>
  <section>
    <div class="confirm-foot">
      <span class="confirm-price" v-if="showbtn">
        <i>{{pricelist.total_price}}</i>
        <i v-if="showpops" @click="showpops=false">明细
          <van-icon name="arrow-down"/>
        </i>
         <i v-else @click="showpops=true">明细
            <van-icon name="arrow-up"/>
        </i>
      </span>
      <span class="confirm-price" v-else>
        <i style="color: #bbb">0.00</i>
        <i style="color: #bbb">请选择相关信息</i>
      </span>
      <nuxt-link v-if="thisrouter=='date_trip'" class="confirm-next-btn" :class="showbtn?'showbtn':''" tag="span"
                 to="/confirm_order">下一步
      </nuxt-link>
      <span v-else class="confirm-next-btn" :class="showbtn?'showbtn':''">下一步</span>

      <span class="contact-service">
        <i> <van-icon name="service-o" color="#399EF6" size="1.5em"/></i>
        <i>联系客服</i>
      </span>
    </div>

    <van-popup v-model="showpops" class="setbottom" position="bottom" :overlay="true">
      <paylist :payData="pricelist" @closepops="closepops"></paylist>
    </van-popup>

  </section>
</template>

<script>

  import paylist from './paylist'
  import {countprice} from '@/api/confirm_order'

  export default {
    components: {
      paylist
    },

    data() {
      return {
        //价格明细列表
        pricelist: [],
        showbtn: false,
        showpops: false,
        thisrouter: '',//当前路由

      }
    },
    computed: {
      //获取计算价格参数
      get_vuex_countprice() {
        return this.$store.state.confirm.countprice;
      },
    },
    watch: {
      //监听计算价格参数
      get_vuex_countprice() {
        if (this.get_vuex_countprice.departure_date != '' && this.get_vuex_countprice.room_total != 0) {
          this.getpricelist(this.get_vuex_countprice)
          this.showbtn = true;
        } else {
          this.showbtn = false;
        }

      },
    },
    mounted() {
      this.$store.dispatch("initprice");

      this.checkrouter();//判断当前位置

    },
    methods: {
      // 获取价格明细
      async getpricelist(objdata) {
        let {data, code} = await countprice(objdata)
        if (code === 0) {
          console.log(data)
        }
        else {
        }
        this.pricelist= {
            "total_price":"$2,634.00",
            "base_price":"$2,634.00",
            "total_price_early_arrival_hotel":"$0.00",
            "total_price_late_leave_hotel":"$0.00",
            "total_price_cny":"￥18,358.98",
            "total_price_eur":"€2,341.63",
            "total_price_gbp":"£2,049.25",
            "discount":"￥1.16",
            "discount_usd":"$0.17",
            "discount_cny":"￥1.16",
            "attributes_selected":{
              "total_price":"￥2,233.10",
              "items":[
                {
                  "name":"奥兰多十三大主题乐园或三大特色一日游任选其一（第一天）",
                  "price":"￥3,329.10",
                  "prefix":"+"
                },
                {
                  "name":"瀑布酒店升级",
                  "price":"￥1,096.00",
                  "prefix":"-"
                }
              ]
            },
            "price":2634,
            "nm":{
              "name":"2人减10",
              "prefix":"-",
              "price":"￥10.00"
            },
            "dfc":{
              "name":"单房差",
              "prefix":"+",
              "price":"￥23.21"
            },
            "transfer":[
              {
                "product_departure_id":510,
                "time":"8:30-22:30",
                "product_id":307,
                "region":"",
                "address":"洛杉矶",
                "full_address":"洛杉矶国际机场LAX"
              }
            ],
            "attributes":[
              {
                "id":7,
                "title":"[西峡谷/南峡谷/羚羊彩穴/自由活动]",
                "items":[
                  {
                    "id":11,
                    "title":"羚羊彩穴(团上必付$115/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":35,
                    "title":"自由活动($30/人)",
                    "price":"￥0.00",
                    "prefix":"+"

                  }
                ]
              },
              {

                "id":8,
                "title":"[西峡谷/南峡谷]",
                "items":[
                  {
                    "id":11,
                    "title":"羚羊彩穴(团上必付$115/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":35,
                    "title":"自由活动($30/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":13,
                    "title":"南峡谷(团上必付$90/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":12,
                    "title":"西峡谷(团上必付$90/人)",
                    "price":"￥0.00",
                    "prefix":"+"

                  }
                ]
              },
              {

                "id":9,
                "title":"南加主题项目任选一",
                "items":[
                  {
                    "id":11,
                    "title":"羚羊彩穴(团上必付$115/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":35,
                    "title":"自由活动($30/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":13,
                    "title":"南峡谷(团上必付$90/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":12,
                    "title":"西峡谷(团上必付$90/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":17,
                    "title":"圣地亚哥市区游(团上必付门票$50/人, 含圣地亚哥军港船票, 中途岛航空母舰门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":18,
                    "title":"圣地亚哥海洋世界(团上必付门票$65/人, 含海洋世界门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":15,
                    "title":"圣地亚哥海景火车游(团上必付门票$60/人, 含海景火车票)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":19,
                    "title":"好莱坞环球影城((团上必付门票$85/人, 含环球影城门票)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":14,
                    "title":"棕榈泉购物(团上必付门票：无)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":16,
                    "title":"洛杉矶市区游(团上必付门票$50/人, 含好莱坞明星豪宅车票，加州科学中心门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":20,
                    "title":"迪士尼乐园(团上必付门票$90/人,含迪士尼乐园门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":36,
                    "title":"迪士尼冒险乐园(团上必付门票$90/人,含冒险乐园门票)",
                    "price":"￥0.00",
                    "prefix":"+"

                  }
                ]
              },
              {

                "id":10,
                "title":"南加主题项目十选一",
                "items":[
                  {
                    "id":11,
                    "title":"羚羊彩穴(团上必付$115/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":35,
                    "title":"自由活动($30/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":13,
                    "title":"南峡谷(团上必付$90/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":12,
                    "title":"西峡谷(团上必付$90/人)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":17,
                    "title":"圣地亚哥市区游(团上必付门票$50/人, 含圣地亚哥军港船票, 中途岛航空母舰门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":18,
                    "title":"圣地亚哥海洋世界(团上必付门票$65/人, 含海洋世界门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":15,
                    "title":"圣地亚哥海景火车游(团上必付门票$60/人, 含海景火车票)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":19,
                    "title":"好莱坞环球影城((团上必付门票$85/人, 含环球影城门票)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":14,
                    "title":"棕榈泉购物(团上必付门票：无)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":16,
                    "title":"洛杉矶市区游(团上必付门票$50/人, 含好莱坞明星豪宅车票，加州科学中心门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":20,
                    "title":"迪士尼乐园(团上必付门票$90/人,含迪士尼乐园门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":36,
                    "title":"迪士尼冒险乐园(团上必付门票$90/人,含冒险乐园门票)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":24,
                    "title":"圣地亚哥市区游(团上必付门票$50/人, 含圣地亚哥军港船票, 中途岛航空母舰门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":25,
                    "title":"圣地亚哥海洋世界(团上必付门票$65/人, 含海洋世界门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":22,
                    "title":"圣塔芭芭拉海景火车游(团上必付门票$50/人, 含海景火车票)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":26,
                    "title":"好莱坞环球影城((团上必付门票$80/人, 含环球影城门票) ",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":21,
                    "title":"棕榈泉购物(团上必付门票：无)",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":23,
                    "title":"洛杉矶市区游(团上必付门票$50/人, 含好莱坞明星豪宅车票，奋进号航天飞机门票）",
                    "price":"￥0.00",
                    "prefix":"+"
                  },
                  {
                    "id":27,
                    "title":"迪士尼乐园或冒险乐园(团上必付门票$85/人,含迪士尼乐园门票或冒险乐园门票）",
                    "price":"￥0.00",
                    "prefix":"+"

                  }
                ]
              }
            ],
            "attributes_override":[
              {
                "id":52,
                "title":"瀑布酒店升级",
                "items":[
                  {
                    "id":393,
                    "title":"升级酒店到Quality Inn At The Falls或同級",
                    "price":"￥411.00",
                    "prefix":"-"
                  },
                  {
                    "id":394,
                    "title":"不升级",
                    "price":"￥246.60",
                    "prefix":"+"
                  },
                  {
                    "id":395,
                    "title":"升级到Doubletree by Hilton Niagara Falls/Sheraton at the Niagara Falls或同级",
                    "price":"￥369.90",
                    "prefix":"+"

                  }
                ]
              }
            ],

            "points":{
              "discount":"￥1.16",
              "point":17,
              "total_point":5000
            }
      };
        this.$store.commit("pricelist", this.pricelist);
        this.pricelist.adult=this.get_vuex_countprice.adult;
        this.pricelist.child=this.get_vuex_countprice.child

      },
      closepops(data) {
        this.showpops = false;
      },//关闭弹层
      //判断当前页面位置
      checkrouter() {
        if ($nuxt.$route.path == '/confirm_order') {
          this.thisrouter = 'confirm_order'
        } else {
          this.thisrouter = 'date_trip'
        }
        console.log(this.thisrouter)
      },

    }
  }

</script>

<style scoped>
  .confirm-foot {
    width: 750px;
    height: 120px;
    background-color: #fff;
    position: fixed;
    box-sizing: border-box;
    padding: 20px 32px;
    left: 0;
    bottom: 0;
  }

  .confirm-next-btn {
    width: 308px;
    height: 80px;
    display: inline-block;
    background: #BBBBBB;
    opacity: 1;
    border-radius: 8px;
    color: #fff;
    text-align: center;
    font-size: 32px;
    line-height: 80px;
    float: right;
  }

  .confirm-price {
    height: 80px;
    display: inline-block;
    line-height: 20px;
    float: left;
    width: 240px;
    color: #FB605D;
  }

  .confirm-price > i:nth-child(1) {
    font-style: normal;
    display: inline-block;
    font-size: 32px;
    text-align: left;
    font-weight: bold;
    width: 100%;
    height: 30px;
  }

  .confirm-price > i:nth-child(2) {
    font-style: normal;
    display: inline-block;
    font-size: 24px;
    text-align: left;
    width: 100%;
    height: 20px;
  }

  .contact-service {
    width: 100px;
    height: 80px;
    display: inline-block;
    float: right;
    margin-right: 20px;
    font-size: 22px;
  }

  .contact-service i:nth-child(1) {
    width: 100px;
    height: 40px;
    display: inline-block;
    text-align: center;
    line-height: 40px;
  }

  .contact-service i:nth-child(2) {
    font-style: normal;
    width: 100px;
    color: #399EF6;
    font-size: 22px;
    display: inline-block;
    text-align: center;
    line-height: 40px;

  }

  .showbtn {
    background: rgba(251, 96, 93, 1) !important;
  }

  .setbottom {
    background: rgba(251, 96, 93, 0) !important;
  }


</style>
