<template>
<div class="wrapper">
  <Header></Header>
  <div class="wrapper-content">
    <div class="container">
      <router-view></router-view>
    </div>
  </div>
  <Footer></Footer>
</div>

</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Footer
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">

</style>
