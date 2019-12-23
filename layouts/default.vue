<template>
  <v-app>
    <Navbar />
    <nuxt />
    <div class="mb-8" />
    <v-footer fixed app>
      <span>&copy; 2019</span>
    </v-footer>
  </v-app>
</template>

<script>
import Navbar from '~/components/common/Navbar.vue'
export default {
  components: {
    Navbar
  }
}
</script>
