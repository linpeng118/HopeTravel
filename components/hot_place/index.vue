<template>
    <div class="hot-place">
        <div class="hot-item" v-for="(list, index) in lists" :key="index" @click="selectDetail(list)">
            <img :src="list.image || list.image_url" alt="">
            <div class="title">{{list.content || list.name || list.title}}</div>
            <div class="desc" v-if="isDesc">{{list.subTitle}}</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hot_place',
        props: {
            lists: {
                type: Array,
                default: null
            },
            isDesc: {
                type: Boolean,
                default: true
            }
        },
        methods: {
            selectDetail(detail) {
                let {
                    category,
                    product_type,
                    span_city,
                    start_city
                } = detail
                let data = {
                    category,
                    product_type,
                    span_city,
                    start_city
                }
                this.$emit('selectDetail', data, detail)
            }
        }
    }

</script>

<style type="text/scss" lang="scss" scoped>
    .hot-place{
    display: flex;
    display: -webkit-flex;
    text-align: center;
    flex-wrap:wrap;
    -webkit-flex-wrap:wrap;
    justify-content: space-between;
    -webkit-justify-content: space-between;
    .hot-item{
      margin-bottom: 20px;
      width:160px;
    }
    .title{
      font-size: 20px;
      color: #000000;
      height: 32px;
      overflow: hidden;
    }
    .desc{
      font-size: 20px;
      color: #BEBEBE;
      height: 32px;
      overflow: hidden;
    }
    img{
      width:160px;
      height:120px;
      border-radius:6px;
    }
  }
</style>
