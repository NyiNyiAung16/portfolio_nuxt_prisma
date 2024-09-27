import path from 'path'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: [
    "@prisma/nuxt",
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    'nuxt-auth-utils',
  ],
  fontawesome: {
    icons: {
      solid: ['trash','arrow-right','xmark']
    }
  },

  imports:{
    autoImport: true
  }
})