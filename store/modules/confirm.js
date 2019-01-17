const mut = {
  countprice:'countprice',
};

export default {
  state: {
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
