import Cookies from 'vue-cookies'

export const state = () => ({
  isLogged: false,
  user: {}
})

export const mutations = {
  setUser (state, user) {
    state.user = user
    state.isLogged = true
    Cookies.set('userId', user.id) // It should be a token
  },
  logout (state) {
    state.isLogged = false
    state.user = {}
    Cookies.remove('userId')
    this.$router.push('/')
  }
}

export const actions = {
  async autoLogin ({ commit }, userId) {
    try {
      const resp = await this.$axios.$get(`/users/${userId}`)
      if (resp.id) {
        commit('setUser', resp)
        if (this.$router.app.$route.path === '/') { this.$router.push('/inicio') }
      }
    } catch (error) {
      return Promise.reject(error)
    }
  },
  async tryLogin ({ commit }, { email = '', password = '' }) {
    try {
      const resp = await this.$axios.$get(`users`)
      if (resp.length > 0) {
        const user = resp.find(r => (r.email === email && r.password === password)) // Validation should be in backend
        if (user && user.id) {
          commit('setUser', user)
          return Promise.resolve(true)
        } else {
          return Promise.reject(new Error('Usuário ou senha incorretas'))
        }
      }
    } catch (error) {
      return Promise.reject(new Error('Usuário ou senha incorretas'))
    }
  }
}
