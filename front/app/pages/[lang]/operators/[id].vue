<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
    <AppHeader />
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-8">
      <div v-if="pending" class="flex flex-col items-center justify-center py-20 gap-4">
        <UIcon name="i-lucide-loader-2" class="size-10 animate-spin text-primary-500" />
        <p class="text-gray-500 dark:text-gray-400">{{ strings?.loading ?? 'Loading...' }}</p>
      </div>

      <div v-else-if="error" class="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 p-6 text-center">
        <UIcon name="i-lucide-alert-circle" class="size-12 text-red-500 mx-auto mb-3" />
        <p class="text-red-700 dark:text-red-300 font-medium">{{ strings?.loadError ?? 'Failed to load operator' }}</p>
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ error.message }}</p>
        <UButton :to="`/${localeCode}/operators`" variant="ghost" class="mt-4">
          ← {{ strings?.operators ?? 'Operators' }}
        </UButton>
      </div>

      <template v-else-if="operator">
        <div class="mb-6">
          <UButton :to="`/${localeCode}/operators`" variant="ghost" size="sm" class="mb-4">
            ← {{ strings?.operators ?? 'Operators' }}
          </UButton>
          <h1 class="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            {{ operator.operatorName }}
          </h1>
        </div>

        <!-- Meta (title/description are set via useHead; optional display block) -->
        <section v-if="operator.meta.title || operator.meta.description" class="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800/50 p-4 sm:p-5 shadow-sm mb-6">
          <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Meta</h2>
          <p class="text-gray-900 dark:text-white font-medium">{{ operator.meta.title }}</p>
          <p v-if="operator.meta.description" class="mt-1 text-sm text-gray-600 dark:text-gray-300">{{ operator.meta.description }}</p>
        </section>

        <!-- SEO text -->
        <section v-if="operator.seoText" class="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800/50 p-4 sm:p-5 shadow-sm mb-6">
          <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">SEO text</h2>
          <div class="prose prose-gray dark:prose-invert max-w-none text-gray-700 dark:text-gray-300" v-html="operator.seoText" />
        </section>

        <!-- Stats -->
        <section class="rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800/50 p-4 sm:p-5 shadow-sm">
          <h2 class="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">Operator info</h2>
          <dl class="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div class="flex flex-col">
              <dt class="text-xs font-medium text-gray-500 dark:text-gray-400">Sales</dt>
              <dd class="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{{ operator.stats.salesCount.toLocaleString() }}</dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-xs font-medium text-gray-500 dark:text-gray-400">Rating</dt>
              <dd class="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{{ operator.stats.rating.toFixed(1) }}</dd>
            </div>
            <div class="flex flex-col">
              <dt class="text-xs font-medium text-gray-500 dark:text-gray-400">Routes</dt>
              <dd class="mt-1 text-xl font-semibold text-gray-900 dark:text-white">{{ operator.stats.routesCount.toLocaleString() }}</dd>
            </div>
          </dl>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { OperatorPagePayload } from '~/types/operator'
import { useAppLocale } from '~/composables/useAppLocale'

const route = useRoute()
const { localeCode, strings } = useAppLocale()
const id = computed(() => Number(route.params.id))

const apiUrl = computed(() => `/api/operators/${id.value}?lang=${localeCode.value}`)
const { data, pending, error } = await useFetch<OperatorPagePayload>(apiUrl, { key: `operator-${id.value}-${localeCode.value}` })

const operator = computed(() => data.value ?? null)

useHead(computed(() => ({
  title: operator.value?.meta?.title ?? undefined,
  meta: [
    { name: 'description', content: operator.value?.meta?.description ?? '' },
  ],
})))
</script>
