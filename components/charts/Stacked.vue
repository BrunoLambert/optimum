<template>
  <v-layout row wrap px-2>
    <v-flex xs12 md8>
      <Chart :options="barData" />
    </v-flex>
    <v-flex xs12 md4 pl-5>
      <b>
        <h3 class="primary--text">Filtros (selecione duas datas)</h3>
      </b>
      <div class="secondary--text font-weight-bold my-4">
        {{ displayData }}
      </div>
      <v-date-picker
        v-model="filters"
        range
        locale="pt-BR"
        min="2019-01-01"
        max="2019-31-12"
        class="mt-3"
        no-title
      />
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
    filters: [],
    months: [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro'
    ]
  }),
  computed: {
    displayData () {
      return `De ${this.filters[0] ? this.filters[0].split('-').reverse().join('/') : '01/01/2019'} até ${this.filters[1] ? this.filters[1].split('-').reverse().join('/') : '31/12/2019'}`
    },
    filteredData () {
      if (this.filters.length === 2) {
        const startDate = new Date(this.filters[0])
        const endDate = new Date(this.filters[1])

        return this.data.map((dat) => {
          return dat.filter((process) => {
            const processDate = new Date(process.createdAt)
            return processDate >= startDate && processDate <= endDate
          })
        })
      } else {
        return this.data
      }
    },
    cleanData () {
      return this.filteredData.filter(dat => dat.length > 0)
    },
    activeMonths () {
      let months = []
      this.filteredData.forEach((dat, index) => {
        if (dat.length > 0) {
          months = [...months, this.months[index]]
        }
      })
      return months
    },
    knowingFase () {
      return {
        name: 'Conhecimento',
        data: this.cleanData.map((dat) => {
          return dat.filter(p => p.fase === 'Conhecimento').length
        })
      }
    },
    resourceFase () {
      return {
        name: 'Recursal',
        data: this.cleanData.map((dat) => {
          return dat.filter(p => p.fase === 'Recursal').length
        })
      }
    },
    runningFase () {
      return {
        name: 'Execução',
        data: this.cleanData.map((dat) => {
          return dat.filter(p => p.fase === 'Execução').length
        })
      }
    },
    dataForTable () {
      let data = []
      this.cleanData.forEach((dat) => {
        data = [...data, ...dat]
      })
      return data
    },
    barData () {
      return {
        title: {
          text: 'Processos classificados por fase em relação aos mêses de 2019'
        },
        xAxis: {
          categories: this.activeMonths,
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
        series: [this.knowingFase, this.resourceFase, this.runningFase],
        chart: {
          type: 'bar'
        },
        plotOptions: {
          series: {
            stacking: 'normal'
          }
        }
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
