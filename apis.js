import ky from 'ky-universal'

export const apis = {}
export const tasks = []

function createAPI(baseURL) {
  return ky.create({
    prefixUrl: baseURL,
    timeout: 30000,
    credentials: 'include',
    hooks: {
      beforeRequest: [
        req => {
          tasks.push(1)
        }
      ],
      afterResponse: [
        (req, options, res) => {
          tasks.pop()
        }
      ]
    }
  })
}

export async function loading(promise) {
  tasks.push(0)
  const returnValue = await promise()
  tasks.pop()

  return returnValue
}

export default function ({ $config }) {
  if (process.client) {
    apis.audioApi = createAPI($config.API_BASE_URL)
  }
}
