import { apis } from "~/apis"

export default class Authentication {
  constructor(obj) {
    Object.entries(obj).forEach(([key, value]) => {
      this[key] = value
    })
  }

  static async signup(body) {
    return await apis.audioApi.post('auth/signup', { json: body }).json()
  }
}
