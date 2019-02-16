// ~/plugins/vuex-persist.js
import VuexPersistence from 'vuex-persist'

export default ({store}) => {
  console.log('1234567')
  return new VuexPersistence({
    /* your options */
  }).plugin(store);
}
