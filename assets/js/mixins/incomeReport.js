import {mapMutations,mapGetters} from 'vuex'
import {getSummaryReport} from '@/api/sale_union'
export const summaryReport = {
  async mounted(){
    if(JSON.stringify(this.incomeReport) === '{}'){
      this.incomeInit()
    }
  },
  computed: {
    ...mapGetters([
      'incomeReport'
    ])
  },
  methods: {
    async incomeInit() {
      let {code,data} = await getSummaryReport()
      let _obj = {}
      if(code === 0) {
        _obj= data
      }
      this.changeIncomeReport(_obj)
    },
    ...mapMutations({
      changeIncomeReport: 'saleUnion/changeIncomeReport',
    })
  }
}
