<template>
  <v-layout row wrap justify-center class="normal-layout">
    <v-flex xs12 md8>
      <h2>Bem vindo, {{ user.name }}!</h2>
      <v-tabs v-model="tab" color="primary" slider-color="primary" class="mt-5">
        <v-tab v-for="tab in tabs" :key="tab">
          {{ tab }}
        </v-tab>
        <v-tab-item :value="0" class="py-5">
          <pie-chart :data="pieChartData" />
        </v-tab-item>
        <v-tab-item :value="1" class="py-5">
          uno
        </v-tab-item>
        <v-tab-item :value="2" class="py-5">
          dos
        </v-tab-item>
      </v-tabs>
    </v-flex>
  </v-layout>
</template>

<script>
import PieChart from '~/components/charts/Pie.vue'
export default {
  components: {
    PieChart
  },
  data: () => ({
    tab: 0,
    tabs: [
      'Ativos e encerrados',
      'Estatística por estado',
      'Estatística por fase'
    ]
  }),
  computed: {
    user () {
      return this.$store.state.auth.user
    },
    processes () {
      return this.$store.state.process.processes
    },
    pieChartData () {
      const actives = this.processes.filter(p => p.active)
      const inactives = this.processes.filter(p => !p.active)
      return { actives, inactives }
    }
  }
}
</script>

<style scoped>
</style>
