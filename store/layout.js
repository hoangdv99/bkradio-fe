import { make } from 'vuex-pathify'

export const state = () => ({
  showSidebar: false,
  breadcrumbs: [],
})

export const mutations = {
  ...make.mutations(state),
}