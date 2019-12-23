<template>
  <v-layout row wrap justify-center>
    <v-flex xs12 md8 xl6>
      <h2>Bem vindo, {{ user.name }}!</h2>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  computed: {
    user () {
      return this.$store.state.auth.user
    }
  }
}
</script>

<style scoped>
</style>
