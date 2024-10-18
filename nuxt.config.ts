// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@prisma/nuxt",
    "@vesp/nuxt-fontawesome",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-auth-utils",
    "shadcn-nuxt",
    "nuxt-file-storage",
  ],
  build: {
    transpile: [
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-solid-svg-icons",
    ],
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    nuxtSessionPassword: process.env.NUXT_SESSION_PASSWORD,
  },
  fontawesome: {
    icons: {
      solid: [
        "trash",
        "arrow-right",
        "xmark",
        "arrow-up",
        "arrow-down",
        "comment",
        "pen",
        "house-chimney",
        "magnifying-glass",
        "bars",
        "spinner",
        "right-to-bracket",
      ],
      regular: ["user", "moon", "sun"],
    },
  },

  imports: {
    autoImport: true,
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: "",
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: "./components/ui",
  },
  app: {
    pageTransition: { name: "page", mode: "out-in" },
  },
});
