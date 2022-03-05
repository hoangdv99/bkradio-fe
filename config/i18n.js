const i18n = {
  locales: [
    { code: 'vi', file: 'vi-VI.js' },
    { code: 'en', file: 'en-US.js' },
  ],
  detectBrowserLanguage: false,
  defaultLocale: 'vi',
  lazy: true,
  langDir: 'locales/',
  vuex: {
    syncLocale: true,
  },
  strategy: 'no_prefix',
  vueI18n: {
    silentTranslationWarn: true,
  },
}

export default i18n
