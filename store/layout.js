import { make } from 'vuex-pathify'

export const state = () => ({
  showSidebar: false,
})

export const mutations = {
  ...make.mutations(state),
}