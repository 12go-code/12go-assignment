<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-indigo-950">
    <AppHeader />
    <div class="max-w-4xl mx-auto px-4 sm:px-6 py-16 flex flex-col items-center justify-center">
      <h1 class="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {{ strings?.welcome ?? 'Welcome' }}
      </h1>
      <p class="text-gray-500 dark:text-gray-400 mb-8">
        {{ strings?.goToOperators ?? 'Go to operators list' }}
      </p>
      <UButton
        :to="`/${localeCode}/operators`"
        size="lg"
        color="primary"
        icon="i-lucide-arrow-right"
        trailing
      >
        {{ strings?.operators ?? 'Operators' }}
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAppLocale } from '~/composables/useAppLocale'

const { localeCode, strings } = useAppLocale()
</script>
