// https://nuxt.com/docs/api/configuration/nuxt-config
import { fileURLToPath } from 'node:url'
import { join, dirname } from 'node:path'

const currentDir = dirname(fileURLToPath(import.meta.url))

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  srcDir: 'app',
  pages: true,
  modules: ['@nuxt/ui'],
  css: [join(currentDir, 'app/assets/css/main.css')],
  runtimeConfig: {
    productApiUrl: process.env.NUXT_PRODUCT_API_URL || 'http://localhost:8001',
    seoApiUrl: process.env.NUXT_SEO_API_URL || 'http://localhost:8000',
  },
})
