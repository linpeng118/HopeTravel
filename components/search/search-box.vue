<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input class="box" :placeholder="placeholder" v-model="query" ref="query" />
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>
<script>
  import { debounce } from 'common/js/util'
  export default {
    props: {
      placeholder: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        query: ''
      }
    },
    created() {
      this.$watch('query', debounce((newValue) => {
        this.$emit('query', newValue)
      }, 200))
    },
    methods: {
      clear() {
        this.query = ''
      },
      setQuery(query) {
        this.query = query
      },
      blur() {
        this.$refs.query.blur()
      }
    },
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">

  .search-box
    display: flex
    align-items: center
    box-sizing: border-box
    width: 100%
    padding: 0 6px
    height: 40px
    border-radius: 6px
    .icon-search
      font-size: 24px
    .box
      flex: 1
      margin: 0 5px
      line-height: 18px
      outline: 0
      &::placeholder
        color: red
    .icon-dismiss
      font-size: 16px
      color: red
</style>
