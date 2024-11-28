// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  vite: {
    resolve: {
      alias: {
        '.prisma/client/index-browser': './node_modules/.prisma/client/index-browser.js',
      },
    },
  },
  modules: [
    "@prisma/nuxt",
    "@vesp/nuxt-fontawesome",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-auth-utils",
    "shadcn-nuxt",
    "@nuxtjs/cloudinary",
    "nuxt-lodash"
  ],
  build: {
    transpile: [
      "@fortawesome/free-brands-svg-icons",
      "@fortawesome/free-regular-svg-icons",
      "@fortawesome/free-solid-svg-icons",
      '@hapi/hoek',
      '@sideway/formula',
      '@sideway/pinpoint',
      '@hapi/topo',
      '@sideway/address',
    ],
  },
  cloudinary:{
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    nuxtSessionPassword: process.env.NUXT_SESSION_PASSWORD,
    cloudKey: process.env.NUXT_CLOUT_API_KEY,
    cloudSecret: process.env.NUXT_CLOUT_SECRET_KEY
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
    head: {
      link: [
        {
          rel: "icon",
          type: "image/png",
          href: "/logo/logo.png",
        }
      ]
    }
  },
});
