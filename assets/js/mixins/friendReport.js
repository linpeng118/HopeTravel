import {mapMutations,mapGetters} from 'vuex'
import {getFriendReport} from '@/api/sale_union'
export const friendReport = {
  mounted(){
    if(JSON.stringify(this.friendReport) === '{}'){
      this.friendInit()
    }
  },
  computed: {
    ...mapGetters([
      'friendReport'
    ])
  },
  methods: {
    async friendInit() {
      let {code,data} = await getFriendReport()
      let _obj = {}
      if(code === 0) {
        _obj= data
      }
      this.changeFriendReport(_obj)
    },
    ...mapMutations({
      changeFriendReport: 'saleUnion/changeFriendReport',
    })
  }
}
