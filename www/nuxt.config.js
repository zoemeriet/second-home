const strapiBaseUri = process.env.API_URL || "http://localhost:1337";

export default {
  env: {
    strapiBaseUri
  },
  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: "second-home-front",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" }
    ],
    link: [
      { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
      {
        rel: "stylesheet",
        href:
          "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,600;1,400&display=swap"
      }
    ]
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: [],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/buefy
    "nuxt-buefy",
    "@nuxtjs/style-resources",
    "@nuxtjs/strapi"
  ],

  // Configurations for Strapi
  strapi: {
    entities: ["products", "categories", "colors", "materials", "styles"],
    url: strapiBaseUri
  },

  // Style Resources
  styleResources: {
    scss: [__dirname + "/assets/scss/main.scss"]
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {}
};
