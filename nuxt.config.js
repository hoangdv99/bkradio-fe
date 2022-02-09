export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'BK Radio',
    htmlAttrs: {
      lang: 'en',
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [
      {
        rel: 'dns-prefetch',
        href: '//fonts.googleapis.com',
      }
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '@/assets/scss/app.scss',
    '@fortawesome/fontawesome-svg-core/styles.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/fontawesome.js',
    '~/plugins/layout-content.js',
    { src: '~/plugins/vue-plyr', mode: 'client' },
    { src: '~/plugins/vue-star-rating', mode: 'client' },
    '~/apis'
  ],

  publicRuntimeConfig: {
    NODE_ENV: process.env.NODE_ENV,
    API_BASE_URL: process.env.API_BASE_URL,
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    '@nuxtjs/vuetify',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/auth',
  ],

  auth: {
    strategies: {
      local: {
        scheme: "refresh",
        token: {
          property: "token",
          global: true,
          required: true,
          type: "Bearer"
        },
        user: {
          property: "user",
          autoFetch: true
        },
        refreshToken: {
          property: "refresh_token",
          data: "refresh_token",
        },
        endpoints: {
          login: { url: "/auth/login", method: "post" },
          refresh: { url: "/auth/refresh-token", method: "post" },
          logout: false, //  we don't have an endpoint for our logout in our API and we just remove the token from localstorage
          user: { url: "/auth/user", method: "get" }
        }
      }
    }
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},

  server: {
    port: process.env.PORT
  },
}
