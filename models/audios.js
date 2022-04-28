import ky from "ky-universal"
import { apis } from "~/apis"

export default class Audios {
  constructor(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value
    })
  }

  static async getS3PresignedUrl({ fileName, fileType }) {
    return await apis.audioApi.get(`sign-s3?fileName=${fileName}&fileType=${fileType}`).json()
  }

  static async uploadToS3(signedUrl, file) {
    return await ky.put(signedUrl, {
      body: file
    })
  }

  static async getHomeAudios() {
    return await apis.audioApi.get('home').json()
  }

  static async create(audio) {
    return await apis.audioApi.post('audios', { json: audio })
  }

  static async getAudios(searchParams) {
    return await apis.audioApi.get(`audios`, { searchParams }).json()
  }

  static async getTopics() {
    return await apis.audioApi.get('topics').json()
  }

  static async getAudio(id) {
    return await apis.audioApi.get(`audios/${id}`).json()
  }

  static async getAudioBySlug(slug) {
    return await apis.audioApi.get(`audios/slug/${slug}`).json()
  }

  static async updateAudio(audio) {
    return await apis.audioApi.put(`audios/${audio.id}`, { json: audio })
  }

  static async deleteAudio(id) {
    return await apis.audioApi.delete(`audios/${id}`)
  }

  static async updateRating(audioId, rating) {
    return await apis.audioApi.patch(`audios/${audioId}`, {
      json: {
        audioId,
        rating
      }
    })
  }

  static async updateView(audioId) {
    return await apis.audioApi.patch(`audios/${audioId}/view`, {
      json: {
        audioId
      }
    })
  }

  static async getTrendingAudios(period) {
    return await apis.audioApi.get(`audios/trending?period=${period}`).json()
  }

  static async saveHistory(audioId, userId, time, audioLength) {
    return await apis.audioApi.post('history', {
      json: {
        audioId,
        userId,
        time,
        audioLength
      }
    })
  }

  static async getLastViewedAudios(userId) {
    return await apis.audioApi.get(`history?userId=${userId}`).json()
  }
}
