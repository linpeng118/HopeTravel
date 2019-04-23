import {mapGetters} from 'vuex'
export const isAgent = {
  mounted(){
    console.log('我的2')
    if (!this.profile.is_agent) {
      this.$toast('您进错了页面')
      this.$router.push({
        path: '/personal'
      })
    }
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  }
}
