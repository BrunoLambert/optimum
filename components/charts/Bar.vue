<template>
  <v-layout row wrap px-2>
    <v-flex xs12 md8>
      <Chart :options="barData" />
    </v-flex>
    <v-flex xs12 md4>
      <b>
        <h3 class="primary--text">Filtros</h3>
      </b>
      <v-checkbox v-model="filters" :value="true" label="Ativo" />
      <v-checkbox v-model="filters" :value="false" label="Encerrados" />
    </v-flex>
    <v-flex xs12 mt-4>
      <process-table :processes="dataForTable" />
    </v-flex>
  </v-layout>
</template>

<script>
import { Chart } from 'highcharts-vue'
import ProcessTable from '~/components/tables/ProcessTable'
export default {
  components: {
    Chart,
    ProcessTable
  },
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    filters: []
  }),
  computed: {
    dataFiltered () {
      return this.data.map((dat, index) => ({
        name: dat.name,
        y: this.useFilters(dat.data)
      }))
    },
    dataForTable () {
      // eslint-disable-next-line
      let processesArray = [];
      this.dataFiltered.forEach((data) => {
        processesArray = [...processesArray, ...data.y]
      })
      return processesArray
    },
    dataFormatted () {
      return this.dataFiltered.map(data => ({
        ...data,
        y: data.y.length
      }))
    },
    barData () {
      return {
        title: {
          text: 'Processos classificados por estado'
        },
        xAxis: {
          categories: this.dataFiltered.map(d => d.name),
          title: {
            text: 'Estados'
          }
        },
        yAxis: {
          title: {
            text: 'Processos'
          }
        },
        legend: false,
        series: [
          {
            name: 'Quantidade de processos',
            data: this.dataFormatted // sample data
          }
        ],
        chart: {
          type: 'bar'
        }
      }
    }
  },
  methods: {
    useFilters (stateData = []) {
      if (this.filters.length > 0) {
        return stateData.filter(dat => this.filters.includes(dat.active))
      } else {
        return stateData
      }
    }
  }
}
</script>

<style scoped>
.pie-table {
  max-width: 100%;
}
</style>
