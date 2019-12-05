import {mapMutations,mapGetters} from 'vuex'
import {getProfile} from '@/api/profile'
export const profileInfo = {
  async mounted(){
    if(JSON.stringify(this.profile) === '{}'){
      this.profileInit()
    }
  },
  computed: {
    ...mapGetters([
      'profile'
    ])
  },
  methods: {
    async profileInit() {
      let {code,data} = await getProfile()
      let _obj = {}
      if(code === 0) {
        _obj= data
      }
      this.changeSetProfile(_obj)
    },
    ...mapMutations({
      changeSetProfile: 'profile/setProfile',
    })
  }
}
