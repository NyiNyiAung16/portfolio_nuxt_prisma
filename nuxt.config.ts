// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: false },
  vite: {
    resolve: {
      alias: {
        ".prisma/client/index-browser":
          "./node_modules/.prisma/client/index-browser.js",
      },
    },
  },
  typescript: {
    typeCheck: true
  },
  modules: [
    "@prisma/nuxt",
    "@pinia/nuxt",
    "@nuxtjs/tailwindcss",
    "nuxt-auth-utils",
    "shadcn-nuxt",
    "@nuxtjs/cloudinary",
    "nuxt-lodash",
  ],
  build: {
    transpile: [
      "@hapi/hoek",
      "@sideway/formula",
      "@sideway/pinpoint",
      "@hapi/topo",
      "@sideway/address",
    ],
  },
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
  },
  runtimeConfig: {
    jwtSecret: process.env.JWT_SECRET,
    databaseUrl: process.env.DATABASE_URL,
    nuxtSessionPassword: process.env.NUXT_SESSION_PASSWORD,
    cloudKey: process.env.NUXT_CLOUT_API_KEY,
    cloudSecret: process.env.NUXT_CLOUT_SECRET_KEY,
  },

  imports: {
    autoImport: true,
  },

  shadcn: {
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
        },
      ],
    },
  },
  css: ["swiper/swiper-bundle.css"],
  vue: {
    compilerOptions: {
      isCustomElement: (tag) => tag.startsWith("swiper-"),
    },
  },
});
