import Faker from 'faker/locale/pt_BR'

export const state = () => ({
  processes: []
})

export const mutations = {
  setProcesses (state, data) {
    state.processes = data
  }
}

export const actions = {
  async getProcesses ({ commit }) {
    try {
      const resp = await this.$axios.$get('/processes')
      commit('setProcesses', resp.map(r => ({
        ...r,
        fase: Faker.random.arrayElement(['Conhecimento', 'Recursal', 'Execução']),
        state: Faker.random.arrayElement(['MG', 'SP', 'RJ', 'RS', 'SC', 'BA']),
        createdAt: new Date(r.createdAt).toLocaleDateString(),
        publishedAt: new Date(r.publishedAt).toLocaleDateString(),
        finishedAt: new Date(r.finishedAt).toLocaleDateString()
      })))
    } catch (error) {
      return Promise.reject(error)
    }
  }
}
