const mut = {
  countprice:'countprice',
  pricelist:'pricelist',
  product:'product'
};

export default {
  state: {
      product:{
        "product_id":141,
        "default_price":"$238",
        "code":"US119",
        "product_entity_type":1,
        "product_type":1,
        "max_num_guest":4,
        "min_num_guest":9,
        "max_child_age":2,
        "sales":3,
        "self_support":1,
        "name":"(5天)【华盛顿出发美东豪华游】<纽约+费城+康宁玻璃中心+华盛顿特区+尼亚加拉大瀑布+波士顿>",
        "small_description":"★ 畅游名城：纽约，费城，华盛顿，尼加拉瓜大瀑布，波士顿。 ★ 震撼体验：多种角度欣赏尼亚加拉瀑布的风采，体验视觉与听觉的双震撼； ★ 独特文化：虽一眼看完的景物，却可以让人深深感受到背后的历史渊源，费城独立厅带你感受人们对民主和自由的向往； ★ 特色风味：波士顿当地龙虾卷+特制面包里的新英格兰蛤蜊巧达浓汤； ",
        "icons_show":[
          "限时",
          "满减"
        ],
        "icons_tour":[
          {
            "title":"买二送一",
            "content":"是指三人共同享用一个酒店标准间的价格，不提供加床"
          },
          {
            "title":"买二送二",
            "content":"是指四人共同享用一个酒店标准间的价格，不提供加床"
          },
          {
            "title":"畅销行程",
            "content":""
          },
          {
            "title":"低价保证",
            "content":""
          },
          {
            "title":"即时确认",
            "content":"该产品下单即可确认出行"
          }
        ],
        "images":[
          "http://www.24.tourscool.net/images/product/5b6176857cfd5_600_338.jpg",
          "http://www.24.tourscool.net/images/product/5b6176857d077_600_338.png",
          "http://www.24.tourscool.net/images/product/5b6176857d228_600_338.jpg",
          "http://www.24.tourscool.net/images/product/5b6176857d2a7_600_338.jpg"
        ],
        "departure_city":"华盛顿",
        "end_city":"纽约",
        "special_price":"",
        "feature_images":[
          "http://www.24.tourscool.net/images/product/5ba9aede9f341_600_338.jpg",
          "http://www.24.tourscool.net/images/product/5ba9aede9ed93_600_338.jpg"
        ],
        "is_kids":true,
        "is_single_pu":true,
        "is_favorite":false,
        "duration_days":5
      },//产品详情
      countprice: {
      product_id: '',//产品id
      departure_date: '',//出发日期
      room_total: 0,//房间总数
      room_attributes: [],//房间数据,
      product_departure: '',//出发地点，接驳服务
      attributes:[],//行程/升级选择对象
      is_point: false,//是否使用积分
      adult:0,
      child:0,
    },
      pricelist: {}//价格明细列表和一些确认订单页面选项值
  },

  mutations: {
    //更新计算价格模块信息
    [mut.countprice](state, ob) {
      var old = {};
      for (var ish in ob) {
        old[ish] = state[mut.countprice][ish]
      };
      state[mut.countprice] = {...state[mut.countprice], ...ob };
      localStorage.setItem('countprice', JSON.stringify(state[mut.countprice]))
    },
    //更新价格明细列表
    [mut.pricelist](state, ob) {
      var old = {};
      for (var ish in ob) {
        old[ish] = state[mut.pricelist][ish]
      };
      state[mut.pricelist] = {...state[mut.pricelist], ...ob };
      localStorage.setItem('pricelist', JSON.stringify(state[mut.pricelist]))
    },
    //产品详情
    [mut.product](state, ob) {
      var old = {};
      for (var ish in ob) {
        old[ish] = state[mut.product][ish]
      };
      state[mut.product] = {...state[mut.product], ...ob };
      localStorage.setItem('product', JSON.stringify(state[mut.product]))
    },
    //重置计算价格模块初始值
    emptyprice(state) {
      state[mut.countprice]={
        product_id: '',//产品id
        departure_date: '',//出发日期
        room_total: 0,//房间总数
        room_attributes: [],//房间数据,
        product_departure: '',//出发地点，接驳服务
        attributes:[],//行程/升级选择对象
        is_point: false,//是否使用积分
        adult:0,
        child:0,
      }
      localStorage.setItem('countprice', JSON.stringify(state[mut.countprice]))
    },
    //
    initprice(state) {
      state[mut.countprice]=localStorage.getItem('countprice') ? JSON.parse(localStorage.getItem('countprice')) : {
        product_id: '',//产品id
        departure_date: '',//出发日期
        room_total: 0,//房间总数
        room_attributes: [],//房间数据,
        product_departure: '',//出发地点，接驳服务
        attributes:[],//行程/升级选择对象
        is_point: false,//是否使用积分
        adult:0,
        child:0,
      },
      console.log('成功执行init')
    },
  },
  actions: {
    emptyprice({commit}) {
      commit('emptyprice')
    },
    initprice({commit}) {
      commit('initprice')
    }
  },
}
