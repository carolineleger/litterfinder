import tailwindcss from "@tailwindcss/vite";
export default defineNuxtConfig({
  css: ["~/assets/css/main.css",  "~/assets/css/main.scss"],
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_ANON_KEY,
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
  },
  plugins: ['~/plugins/fontawesome.js',"~/plugins/vuetify.ts", '~/plugins/pinia.js',],

  compatibilityDate: "2025-02-07"
});