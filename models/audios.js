import { apis } from "~/apis"

export default class Audios {
  constructor(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value
    })
  }

  static async getHomeAudios() {
    return await apis.audioApi.get('home').json()
  }

  static async create(audio) {
    return await apis.audioApi.post('audios', { json: audio }).json()
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

  static async updateRating(audioId, userId, rating) {
    return await apis.audioApi.patch(`audios/${audioId}`, {
      json: {
        audioId,
        userId,
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

  static async saveHistory(audioId, userId, time, audioLength, listeningLinkId) {
    return await apis.audioApi.post('history', {
      json: {
        audioId,
        userId,
        time,
        audioLength,
        listeningLinkId
      }
    })
  }

  static async getLastViewedAudios(userId) {
    return await apis.audioApi.get(`history?userId=${userId}`).json()
  }

  static async getRecommendAudios(userId) {
    return await apis.recommender.get(`predict?user_id=${userId}`).json()
  }

  static async convertPdfFile(payload) {
    const { pdf, author, description, thumbnailUrl, title, userId, voiceIds, topicIds } = payload
    const formData = new FormData()
    formData.append('files', pdf)
    formData.append('voiceIds', voiceIds)
    formData.append('author', author)
    formData.append('description', description)
    formData.append('title', title)
    formData.append('thumbnailUrl', thumbnailUrl)
    formData.append('userId', userId)
    formData.append('topicIds', topicIds)
    return await apis.audioApi.post(`audios/convert`, {
      body: formData
    }).json()
  }
}
