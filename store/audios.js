import { make } from 'vuex-pathify'
import Voices from '@/models/voices'
import Audios from '@/models/audios'
import { createNamespacedHelpers } from '~/util'
const { $dispatch } = createNamespacedHelpers('layout')

export const state = () => ({
  authors: [],
  voices: [],
  audios: [],
  topics: [],
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
      commit('ADD_AUDIO', newAudio)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Thêm audio mới thành công',
        color: 'success'
      })
    } catch (error) {
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Có lỗi xảy ra',
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
}
