import { get, dispatch, sync, commit } from 'vuex-pathify'

export const createNamespacedHelpers = (moduleName) => {
  return {
    $get: (path) => get(generatePath(moduleName, path)),
    $sync: (path, prop) => sync(generatePath(moduleName, path), prop),
    $commit: (path, payload) => commit(generatePath(moduleName, path), payload),
    $dispatch: async (path, payload) => {
      try {
        return await dispatch(generatePath(moduleName, path), payload)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    },
  }
}

const generatePath = (moduleName, path) => {
  if (path.startsWith('/')) {
    return path.substring(1)
  } else {
    return `${moduleName}/${path}`
  }
}
