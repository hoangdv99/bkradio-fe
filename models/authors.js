import { apis } from "~/apis"

export default class Authors {
  constructor(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value
    })
  }

  static async getAuthors() {
    return await apis.audioApi.get('authors').json()
  }

  static async create(author) {
    return await apis.audioApi.post('authors', { json: author })
  }
}
