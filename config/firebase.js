const firebase = () => {
  return {
    config: {
      apiKey: process.env.FIRE_BASE_API_KEY,
      authDomain: process.env.FIRE_BASE_AUTH_DOMAIN,
      databaseURL: process.env.FIRE_BASE_DATABASE_URL,
      projectId: process.env.FIRE_BASE_PROJECT_ID,
      storageBucket: process.env.FIRE_BASE_STORAGE_BUCKET,
      messagingSenderId: process.env.FIRE_BASE_MESSAGING_SENDER_ID,
      appId: process.env.FIRE_BASE_APP_ID,
    },
    services: {
      storage: true,
    },
  }
}

export default firebase
