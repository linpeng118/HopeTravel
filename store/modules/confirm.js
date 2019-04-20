const mut = {
  countprice:'countprice',
  pricelist:'pricelist',
  product:'product'
};

export default {
  state: {
      product:{
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
      coupon_cus_id:'',
      savename:'',
      saveemail:'',
      savephone:'',
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
      // if(localStorage){
      //   localStorage.setItem('countprice', JSON.stringify(state[mut.countprice]))
      // }

    },
    //更新价格明细列表
    [mut.pricelist](state, ob) {
      var old = {};
      for (var ish in ob) {
        old[ish] = state[mut.pricelist][ish]
      };
      state[mut.pricelist] = {...state[mut.pricelist], ...ob };
      // if(localStorage){
      //   localStorage.setItem('pricelist', JSON.stringify(state[mut.pricelist]))
      // }

    },
    //产品详情
    [mut.product](state, ob) {
      var old = {};
      for (var ish in ob) {
        old[ish] = state[mut.product][ish]
      };
      state[mut.product] = {...state[mut.product], ...ob };
      // if(localStorage){
      //   localStorage.setItem('product', JSON.stringify(state[mut.product]))
      // }

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
        coupon_cus_id:''
      }
      sessionStorage.setItem('countprice', JSON.stringify(state[mut.countprice]))
    },
    //
    initprice(state) {
      state[mut.countprice]=sessionStorage.getItem('countprice') ? JSON.parse(sessionStorage.getItem('countprice')) : {
        product_id: '',//产品id
        departure_date: '',//出发日期
        room_total: 0,//房间总数
        room_attributes: [],//房间数据,
        product_departure: '',//出发地点，接驳服务
        attributes:[],//行程/升级选择对象
        is_point: false,//是否使用积分
        adult:0,
        child:0,
        coupon_cus_id:''
      }
      // console.log('成功执行init')
    },
    initpricelist(state) {
      state[mut.countprice]=sessionStorage.getItem('pricelist') ? JSON.parse(sessionStorage.getItem('pricelist')) : {}
        // console.log('成功执行init')
    },
    initproduct(state) {
      state[mut.countprice]=sessionStorage.getItem('product') ? JSON.parse(sessionStorage.getItem('product')) : {
      }
        // console.log('成功执行init')
    },
  },
  actions: {
    emptyprice({commit}) {
      commit('emptyprice')
    },
    initprice({commit}) {
      commit('initprice')
    },
    initpricelist({commit}) {
      commit('initpricelist')
    },
    initproduct({commit}) {
      commit('initproduct')
    }
  },
}
