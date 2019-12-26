<template>
  <v-layout row wrap class="full-layout primary">
    <v-flex xs12 md8 xl4 class="layout-flex">
      <img src="/Judgemi.png" alt="Judgemi" height="50px" class="mb-5">
      <v-card>
        <v-card-title primary-title class="primary--text">
          Login
        </v-card-title>
        <v-card-text>
          <v-alert :value="!!error" type="error" class="mb-5">
            {{ error }}
          </v-alert>
          <v-text-field v-model="login.email" label="E-mail" name="email" />
          <v-text-field v-model="login.password" label="Senha" name="password" type="password" />
          <v-btn
            @click="tryLogin"
            :loading="loading"
            :disabled="loading"
            color="primary"
            block
            depressed
          >
            Entrar
          </v-btn>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  layout: 'login',
  head: {
    title: 'Login - Judgemi'
  },
  data: () => ({
    login: {
      email: '',
      password: ''
    },
    error: null,
    loading: false
  }),
  methods: {
    async tryLogin () {
      this.loading = true
      try {
        await this.$store.dispatch('auth/tryLogin', this.login)
        this.$router.push('/inicio')
      } catch (err) {
        this.error = err.message
      }
      this.loading = false
    }
  }
}
</script>

<style scoped>
.full-layout {
  max-height: 100vh;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.layout-flex {
  text-align: center;
}
</style>
