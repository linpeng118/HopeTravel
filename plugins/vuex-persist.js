// ~/plugins/vuex-persist.js
// import VuexPersistence from 'vuex-persist'
//
// export default ({store}) => {
//   // console.log('1234567')
//   return new VuexPersistence({
//     /* your options */
//   }).plugin(store);
// }

import createPersistedState from 'vuex-persistedstate'

export default ({store}) => {
  createPersistedState({
    /* your options */
    key: 'tourscool_vuex',
    reducer(val) {
      console.log(val)
      return {
        // 只储存state中的user
        profile: val.profile.profile
      }
    }
  })(store)
}
