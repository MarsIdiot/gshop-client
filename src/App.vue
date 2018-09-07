<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
  import  FooterGuide from './components/FooterGuide/FooterGuide.vue'

  export default {
    name: 'App',
    mounted(){
      this.$store.dispatch("getAddress")
      this.$store.dispatch("getCategorys")
      this.$store.dispatch("getShops")
      this.$store.dispatch("getUserInfoLogin")
    },
    components:{
      FooterGuide
    }
  }
</script>

<style lang="stylus" ref="stylesheet/stylus">
  .app
    width 100%
    height 100%
    background #f5f5f5
    position relative
</style>
