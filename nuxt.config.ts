// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { 
    enabled: false
   },
   modules: ['nuxt-icon'],
   css: [
    '@/assets/styles/global.scss'
   ],
   runtimeConfig: {
    public: {
      apiBaseUrl: 'https://www.thecocktaildb.com/api/json/v1/1'
    }
   }
})
