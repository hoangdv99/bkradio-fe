import { apis } from "~/apis"

export default class Voices {
  constructor(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value
    })
  }

  static async getVoices() {
    return await apis.audioApi.get('voices').json()
  }

  static async create(voice) {
    return await apis.audioApi.post('voices', { json: voice })
  }
}
