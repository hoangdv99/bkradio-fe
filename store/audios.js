import { make } from 'vuex-pathify'
import Authors from '@/models/authors'
import Voices from '@/models/voices'
import Audios from '@/models/audios'
import { createNamespacedHelpers } from '~/util'
const { $dispatch } = createNamespacedHelpers('layout')

export const state = () => ({
  authors: [],
  voices: [],
  audios: [],
})

export const mutations = {
  ...make.mutations(state),
  ADD_AUDIO(state, audio) {
    state.audios.push(audio)
  },
  SET_AUDIOS(state, audios) {
    state.audios = audios
  },
  ADD_VOICE(state, voice) {
    state.voices.push(voice)
  },
  ADD_AUTHOR(state, author) {
    state.authors.push(author)
  },
  SET_VOICES(state, voices) {
    state.voices = voices
  },
  SET_AUTHORS(state, authors) {
    state.authors = authors
  }
}

export const actions = {
  async createNewAudio({ commit }, audio) {
    try {
      await Audios.create(audio)
      commit('ADD_AUDIO', audio)
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
  async getAuthors({ commit }) {
    const authors = await Authors.getAuthors()
    commit('SET_AUTHORS', authors)
  },
  async createNewAuthor({ commit }, author) {
    try {
      await Authors.create(author)
      commit('ADD_AUTHOR', author)
      $dispatch('setSnackbar', {
        showing: true,
        text: 'Thêm mới tác giả thành công',
        color: 'success'
      })
    } catch (error) {
      $dispatch('setSnackbar', {
        showing: true,
        text: error.response.status === 409 ? 'Tác giả đã tồn tại' : 'Có lỗi xảy ra',
        color: 'error'
      })
    }
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
  }
}
