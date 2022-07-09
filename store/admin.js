import { make } from 'vuex-pathify'
import Voices from '@/models/voices'
import Audios from '@/models/audios'
import { createNamespacedHelpers } from '~/util'
const { $dispatch } = createNamespacedHelpers('layout')

export const state = () => ({
  authors: [],
  voices: [],
  topics: [],
  audios: [],
  perPage: 10,
  page: 1,
  lastPage: 0
})

export const mutations = {
  ...make.mutations(state),
}

export const getters = {
  ...make.getters(state)
}

export const actions = {
  async createNewAudio({ commit, dispatch }, audio) {
    try {
      const newAudio = await Audios.create(audio)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Thêm audio mới thành công',
        color: 'success'
      })
      dispatch('getAudios')
      return newAudio
    } catch (error) {
      $dispatch('setSnackbar', {
        showing: true,
        text: error.message,
        color: 'error'
      })
    }
  },
  async getAudios({ commit, state }) {
    const { audios, pagination } = await Audios.getAudios({
      page: state.page,
      perPage: state.perPage,
      allViewMode: true,
    })
    commit('SET_AUDIOS', audios)
    commit('SET_LAST_PAGE', pagination.lastPage)
  },
  async getVoices({ commit }) {
    const voices = await Voices.getVoices()
    commit('SET_VOICES', voices)
  },
  async createNewVoice({ commit, dispatch }, voice) {
    try {
      await Voices.create(voice)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Thêm mới giọng đọc thành công',
        color: 'success'
      })
      dispatch('getVoices')
    } catch (error) {
      $dispatch('setSnackbar', {
        showing: true,
        text: error.response.status === 409 ? 'Giọng đọc đã tồn tại' : 'Có lỗi xảy ra',
        color: 'error'
      })
    }
  },
  async getTopics({ commit }) {
    const topics = await Audios.getTopics()
    commit('SET_TOPICS', topics)
  },
  async pageChange({ commit, state }, value) {
    commit('SET_PAGE', value)
    const { audios } = await Audios.getAudios({
      page: state.page,
      perPage: state.perPage
    })
    commit('SET_AUDIOS', audios)
  },
  async search({ commit }, keyword) {
    const { audios } = await Audios.getAudios({
      searchKeyword: keyword
    })
    commit('SET_AUDIOS', audios)
  },
  async deleteAudio({ commit, dispatch }, id) {
    try {
      await Audios.deleteAudio(id)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Xóa audio thành công',
        color: 'success'
      })
      dispatch('getAudios')
    } catch(err) {
      $dispatch('setSnackbar', {
        showing: true,
        text: err.message,
        color: 'error'
      })
    }
  },
  async convertPdfFile({ commit, dispatch }, payload) {
    try {
      const newAudio = await Audios.convertPdfFile(payload)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Thêm audio mới thành công',
        color: 'success'
      })
      dispatch('getAudios')
      return newAudio
    } catch (error) {
      $dispatch('setSnackbar', {
        showing: true,
        text: error.message,
        color: 'error'
      })
    }
  }
}
