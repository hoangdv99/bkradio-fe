import pathify from 'vuex-pathify'

export const plugins = [pathify.plugin]

export const getters = {
  isAuthenticated(state) {
    return state.auth.loggedIn
  },
  getUserInfo(state) {
    return state.auth.user
  },
}
