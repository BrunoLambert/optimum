<template>
  <v-layout row wrap px-2>
    <v-flex xs12 md8>
      <Chart :options="pieData" />
    </v-flex>
    <v-flex xs12 md4>
      <b><h3 class="primary--text">Filtros</h3></b>
      <v-checkbox v-model="filters" label="Conhecimento" value="Conhecimento" />
      <v-checkbox v-model="filters" label="Recursal" value="Recursal" />
      <v-checkbox v-model="filters" label="Execução" value="Execução" />
    </v-flex>
    <v-flex xs12 mt-4>
      <process-table :processes="[...actives, ...inactives]" />
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
      type: Object,
      default: () => ({ actives: [], inactives: [] })
    }
  },
  data: () => ({
    filters: [],
    tableHeaders: [
      {
        text: 'ID',
        value: 'id',
        sortable: false
      },
      {
        text: 'Número',
        value: 'number',
        sortable: false
      },
      {
        text: 'Ativo',
        value: 'active',
        sortable: false
      },
      {
        text: 'Publicado em',
        value: 'publishedAt',
        sortable: false
      },
      {
        text: 'Encerramento',
        value: 'finishedAt',
        sortable: false
      },
      {
        text: 'Valor',
        value: 'value',
        sortable: false
      }
    ]
  }),
  computed: {
    actives () {
      return this.filters.length > 0
        ? this.data.actives.filter(act => this.filters.includes(act.fase))
        : this.data.actives
    },
    inactives () {
      return this.filters.length > 0
        ? this.data.inactives.filter(act => this.filters.includes(act.fase))
        : this.data.inactives
    },
    dataFiltered () {
      return [
        {
          name: 'Ativos',
          y: this.actives.length
        },
        {
          name: 'Encerrados',
          y: this.inactives.length
        }
      ]
    },
    pieData () {
      return {
        title: {
          text: 'Processos ativos e encerrados'
        },
        series: [{
          data: this.dataFiltered // sample data
        }],
        chart: {
          type: 'pie'
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
