export const state = () => ({
  active: false
})

export const mutations = {
  turnOn (state) {
    state.active = true
  },
  turnOff (state) {
    state.active = false
  }
}
