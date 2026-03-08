<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
    <AppHeader />
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-6">
      <div class="mb-6">
        <h1 class="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          {{ strings?.operatorsList ?? 'Operators list' }}
        </h1>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ strings?.operatorsSubtitle ?? 'List of operators with links to detail pages' }}
        </p>
      </div>

      <div v-if="pending" class="flex flex-col items-center justify-center py-20 gap-4">
        <UIcon name="i-lucide-loader-2" class="size-10 animate-spin text-primary-500" />
        <p class="text-gray-500 dark:text-gray-400">{{ strings?.loading ?? 'Loading operators...' }}</p>
      </div>

      <div v-else-if="error" class="rounded-2xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800/50 p-6 text-center">
        <UIcon name="i-lucide-alert-circle" class="size-12 text-red-500 mx-auto mb-3" />
        <p class="text-red-700 dark:text-red-300 font-medium">{{ strings?.loadError ?? 'Failed to load list' }}</p>
        <p class="mt-1 text-sm text-red-600 dark:text-red-400">{{ error.message }}</p>
      </div>

      <ul v-else-if="data?.length" class="grid gap-3 sm:gap-4">
        <li
          v-for="op in data"
          :key="op.id"
          class="group"
        >
          <NuxtLink
            :to="`/${localeCode}/operators/${op.id}`"
            class="flex items-center gap-4 rounded-2xl border border-gray-200/80 dark:border-gray-700/80 bg-white dark:bg-gray-800/50 p-4 sm:p-5 shadow-sm hover:shadow-md hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-200"
          >
            <span class="flex size-12 sm:size-14 shrink-0 items-center justify-center rounded-xl bg-primary-100 dark:bg-primary-900/40 text-primary-600 dark:text-primary-400 font-semibold text-lg group-hover:bg-primary-200 dark:group-hover:bg-primary-800/60 transition-colors">
              {{ op.name.charAt(0).toUpperCase() }}
            </span>
            <div class="min-w-0 flex-1">
              <span class="font-semibold text-gray-900 dark:text-white block truncate">
                {{ op.name }}
              </span>
              <span class="text-sm text-gray-500 dark:text-gray-400">
                {{ strings?.detailPage ?? 'Detail page →' }}
              </span>
            </div>
            <UIcon
              name="i-lucide-chevron-right"
              class="size-5 shrink-0 text-gray-400 group-hover:text-primary-500 group-hover:translate-x-0.5 transition-all"
            />
          </NuxtLink>
        </li>
      </ul>

      <div v-else class="rounded-2xl border border-dashed border-gray-300 dark:border-gray-600 bg-gray-50/50 dark:bg-gray-800/30 p-12 text-center">
        <UIcon name="i-lucide-users" class="size-14 text-gray-400 dark:text-gray-500 mx-auto mb-3" />
        <p class="text-gray-600 dark:text-gray-400">{{ strings?.noOperators ?? 'No operators yet' }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppLocale } from '~/composables/useAppLocale'

interface Operator {
  id: number
  name: string
}

const { localeCode, strings } = useAppLocale()
const { data, pending, error } = await useFetch<Operator[]>('/api/operators')
</script>
