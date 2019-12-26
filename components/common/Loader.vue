<template>
  <v-dialog v-model="active" fullscreen persistent transition="dialog-transition">
    <v-card class="loading-container">
      <div class="animation-container">
        <v-progress-circular color="secondary" size="150" width="15" indeterminate class="loader" />
      </div>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  computed: {
    active () {
      return this.$store.state.loader.active
    }
  }
}
</script>

<style scoped>
.loading-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
}
.animation-container {
  position: relative;
}
</style>
