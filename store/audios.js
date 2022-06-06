import { make } from 'vuex-pathify'
import Voices from '@/models/voices'
import Audios from '@/models/audios'
import { createNamespacedHelpers, camelize } from '~/util'
const { $dispatch } = createNamespacedHelpers('layout')

export const state = () => ({
  authors: [],
  voices: [],
  audios: [],
  topics: [],
  recommendAudios: [],
})

export const mutations = {
  ...make.mutations(state),
}

export const getters = {
  ...make.getters(state)
}

export const actions = {
  async createNewAudio({ commit }, audio) {
    try {
      const newAudio = await Audios.create(audio)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Thêm audio mới thành công',
        color: 'success'
      })
      return newAudio
    } catch (error) {
      $dispatch('setSnackbar', {
        showing: true,
        text: error.message,
        color: 'error'
      })
    }
  },
  async getAudios({ commit }) {
    const audios = await Audios.getAudios()
    commit('SET_AUDIOS', audios)
  },
  async getVoices({ commit }) {
    const voices = await Voices.getVoices()
    commit('SET_VOICES', voices)
  },
  async createNewVoice({ commit }, voice) {
    try {
      await Voices.create(voice)
      commit('ADD_VOICE', voice)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Thêm mới giọng đọc thành công',
        color: 'success'
      })
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
  async getRecommendAudios({ commit }, userId) {
    const audios = await Audios.getRecommendAudios(userId)
    const filteredAudios = audios.filter(audio => audio !== null)
    commit('SET_RECOMMEND_AUDIOS', filteredAudios.map(audio => camelize(audio)))
  }
}
