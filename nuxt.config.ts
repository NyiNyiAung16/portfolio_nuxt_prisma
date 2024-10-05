// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: [
    "@prisma/nuxt",
    '@vesp/nuxt-fontawesome',
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    'nuxt-auth-utils',
    'shadcn-nuxt',
    'nuxt-file-storage',
  ],
  fontawesome: {
    icons: {
      solid: ['trash','arrow-right','xmark','arrow-up','arrow-down','comment','pen','house-chimney','magnifying-glass']
    }
  },

  imports:{
    autoImport: true
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }
})