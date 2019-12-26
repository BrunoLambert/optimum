<template>
  <v-layout row wrap my-5>
    <v-flex xs12 mb-5>
      <b>
        <h3 class="primary--text">Processos tabelados</h3>
      </b>
    </v-flex>
    <v-flex xs12>
      <v-data-table
        :headers="tableHeaders"
        :items="processes"
        class="elevation-1 pie-table"
        no-data-text="Nehnum processo carregado ainda..."
      >
        <template v-slot:item.active="{ item }">
          <v-icon v-if="item.active" color="success">
            thumb_up
          </v-icon>
          <v-icon v-else color="error">
            thumb_down
          </v-icon>
        </template>
        <template v-slot:item.value="{ item }">
          {{ item.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }) }}
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  props: {
    processes: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
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
      },
      {
        text: 'Estado',
        value: 'state',
        sortable: false
      }
    ]
  })
}
</script>

<style scoped>
</style>
