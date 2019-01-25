<template>
  <section class="search-area">
    <div class="search-item" v-for="list in lists" :key="list.product_id">
      <img :src="list.image" alt="">
      <div class="desc">
        <p>{{list.name}}</p>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'searchResult',
  props: {
    lists: {
      type: Array,
      default: null
    }
  }
}
</script>

<style type="text/scss" lang="scss" scoped>
  .search-area{
    padding: 16px 16px 0 0;
    .search-item{
      display: flex;
      align-items: center;
      border-bottom:1px solid #E4E4E4;
      padding: 20px 0 ;
      img{
        width:78px;
        height:66px;
        border-radius:8px;
        margin-right:20px;
        background-color: #eee;
      }
      .desc{
        flex: 1;
        font-size:24px;
      }
    }
  }
</style>
