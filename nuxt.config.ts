// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@prisma/nuxt",'@vesp/nuxt-fontawesome'],
  fontawesome: {
    icons: {
      solid: ['trash','arrow-right']
    }
  }
})