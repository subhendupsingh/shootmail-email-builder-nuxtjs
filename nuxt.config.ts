// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  css: [
    // Include Shootmail CSS
    '@shootmail/email-builder/dist/shootmail.css'
  ],
  // Configure build
  build: {
    transpile: ['@shootmail/email-builder']
  },
  typescript: {
    typeCheck: true,
    strict: true
  }
})
