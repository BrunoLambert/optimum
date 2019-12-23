<template>
  <v-app-bar color="black" max-height="75" class="app-bar mb-5">
    <v-toolbar-title>
      <h1 class="appbar-logo white--text">
        Juridis
      </h1>
    </v-toolbar-title>

    <div class="flex-grow-1" />

    <v-btn :to="{ name: 'inicio' }" icon exact class="white--text mx-2">
      <v-icon>home</v-icon>
    </v-btn>
    <v-btn @click="handleLogout" icon exact class="white--text mx-2">
      <v-icon>logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  data: () => ({}),
  methods: {
    handleLogout () {
      this.$store.commit('auth/logout')
    }
  }
}
</script>

<style scoped>
.app-bar .v-toolbar__content {
  height: 100%;
}
.appbar-logo {
  font-family: "Mansalva", cursive;
  font-weight: 400;
}
.menu-item {
  min-width: 200px;
}
</style>
