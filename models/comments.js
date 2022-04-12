import { apis } from "~/apis"

export default class Audios {
  constructor(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value
    })
  }

  static async saveComment(body) {
    return await apis.audioApi.post('comments', { json: body })
  }

  static async getComments(searchParams) {
    return await apis.audioApi.get('comments', { searchParams }).json()
  }

  static async like({ commentId, userId, action }) {
    return await apis.audioApi.patch('comments', {
      json: {
        commentId,
        userId,
        action
      }
    })
  }
}
