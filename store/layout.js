import { make } from 'vuex-pathify'

export const state = () => ({
  showSidebar: false,
  breadcrumbs: [],
  snackbar: {},
  device: {},
})

export const mutations = {
  ...make.mutations(state),
}

export const actions = {
  setSnackbar({ commit }, snackbar) {
    commit('SET_SNACKBAR', snackbar)
    setTimeout(() => {
      commit('SET_SNACKBAR', {})
    }, 3000)
  },
  setDevice({ commit }, value) {
    commit('SET_DEVICE', value)
  },
}
