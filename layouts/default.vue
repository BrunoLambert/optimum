<template>
  <v-app>
    <Navbar />
    <loader />
    <nuxt />
  </v-app>
</template>

<script>
import Navbar from '~/components/common/Navbar.vue'
import Loader from '~/components/common/Loader.vue'
export default {
  components: {
    Navbar,
    Loader
  }
}
</script>
