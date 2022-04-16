import { i18n } from './config'

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
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/layout-content.js',
    '~/plugins/vuetify.js',
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
    '@nuxtjs/style-resources',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth-next',
    ['nuxt-i18n', i18n],
  ],

  auth: {
    strategies: {
      local: {
        // scheme: "refresh",
        token: {
          property: "accessToken",
          required: true,
          name: 'x-access-token',
          type: false
        },
        user: {
          property: "user",
          autoFetch: true,
        },
        endpoints: {
          login: { url: "/auth/signin", method: "post" },
          logout: false,
          user: { url: "/auth/me", method: "get" }
        }
      }
    },
    plugins: ['~/apis.js']
  },

  styleResources: {
    scss: [
      '~/assets/scss/util/*.scss',
    ],
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    transpile: [({ isLegacy }) => isLegacy && 'vuetify/lib']
  },

  axios: {
    baseURL: process.env.API_BASE_URL
  },

  server: {
    port: process.env.PORT
  },
}
