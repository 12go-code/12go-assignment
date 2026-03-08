<template>
  <header class="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 sticky top-0 z-10">
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
      <nav class="flex items-center gap-4">
        <NuxtLink
          :to="localePath('/')"
          class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
        >
          {{ strings?.home ?? 'Home' }}
        </NuxtLink>
        <NuxtLink
          :to="localePath('/operators')"
          class="text-gray-600 dark:text-gray-400 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
        >
          {{ strings?.operators ?? 'Operators' }}
        </NuxtLink>
      </nav>
      <nav class="flex items-center gap-2" aria-label="Language">
        <NuxtLink
          v-for="loc in ['en', 'es', 'fr']"
          :key="loc"
          :to="localePath(pathSuffix, loc)"
          class="inline-flex items-center justify-center min-w-[44px] min-h-[44px] px-4 text-base font-semibold rounded-lg border-2 transition-colors"
          :class="currentLocale === loc
            ? 'bg-indigo-600 text-white border-indigo-600'
            : 'bg-gray-200 text-gray-800 border-gray-300 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600'"
        >
          {{ loc.toUpperCase() }}
        </NuxtLink>
      </nav>
    </div>
  </header>
</template>

<script setup lang="ts">
import { useAppLocale } from '~/composables/useAppLocale'
import type { Locale } from '~/composables/useAppLocale'

const route = useRoute()
const { localeCode, strings } = useAppLocale()

const currentLocale = computed(() => localeCode.value ?? 'en')

function localePath(suffix: string, forceLang?: Locale) {
  const code = forceLang ?? currentLocale.value
  const path = (suffix || '').replace(/^\/+/, '')
  return path ? `/${code}/${path}` : `/${code}`
}

const pathSuffix = computed(() => {
  const path = (route.fullPath || route.path || '').split('?')[0] || ''
  return path.replace(/^\/[^/]+/, '') || ''
})
</script>
