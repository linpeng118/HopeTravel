<template>
  <div class="default-all-footer">
    <a :href="imageInfo.link_url">
      <img :src="imageInfo.image_url" alt="" class="bg-img">
    </a>
  </div>
</template>

<script>
  export default {
    components: {},
    props:{
      imageInfo:{
        type: Object,
        default: null
      }
    },
    data() {
      return {
      }
    },
    computed: {},
    mounted() {},
    methods: {},
  }
</script>

<style lang="scss" scoped>
  .default-all-footer {
    .bg-img {
      width: 100%;
    }
  }
</style>
