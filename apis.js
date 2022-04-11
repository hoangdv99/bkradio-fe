import ky from 'ky-universal'

export const apis = {}
export const tasks = []

function createAPI({ $auth, redirect, $config }) {
  return ky.create({
    prefixUrl: $config.API_BASE_URL,
    timeout: 30000,
    credentials: 'include',
    hooks: {
      beforeRequest: [
        req => {
          req.headers.set(
            'x-access-token',
            `${$auth.strategy.token.get() || ''}`
          )
        },
      ],
      afterResponse: [
        async (req, options, res) => {
          if (res.status === 401) {
            await $auth.logout()
            redirect('/auth/login')
          }
          if (!res.ok) {
            const body = await res.json()
            const error = {
              message: body.message || body || '',
              statusCode: res.status
            }
            throw error
          }
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

export default function (context) {
  if (process.client) {
    apis.audioApi = createAPI(context)
  }
}
