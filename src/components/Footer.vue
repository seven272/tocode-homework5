<template>
    <footer class="footer">
      <div class="container">
        <div class="navbar-content">
          <ul class="navbar-list">
            <li class="navbar-item" v-for="(link, ind) in links" :key="ind">
              <router-link class="navbar-link" :to="link.url">{{ link.title }}</router-link>
            </li>
          </ul>
        </div>
      </div>
  </footer>
</template>

<script>
import { links } from '@/_config.js'
export default {
  name: 'Footer',
  data () {
    return {
      links: links
    }
  }

}
</script>

<style>

</style>
