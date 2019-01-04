<template>
  <section class="container">
    <div>
      <logo/>
      <h1 class="title">
        nuxt
      </h1>
      <h2 class="subtitle">
        My best Nuxt.js project
      </h2>
      <div class="links">
        <a
          href="https://nuxtjs.org/"
          target="_blank"
          class="button--green">Documentation</a>
        <a
          href="https://github.com/nuxt/nuxt.js"
          target="_blank"
          class="button--grey">GitHub</a>
      </div>
    </div>
  </section>
</template>

<script>
import Logo from '~/components/Logo.vue'
import {getData} from '../api/test'
import {mapMutations} from 'vuex'
export default {
  components: {
    Logo
  },
  data () {
    return {
      ss: 'sssss'
    }
  },
  mounted () {
    getData().then(res => {
      console.log(res)
      window.localStorage.setItem('token', 'token111111111')
      this.updateToken('token111111111')
    })
  },
  methods: {
    ...mapMutations([
      'updateToken'
    ])
  }
}
</script>

<style>

.container {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}

</style>
