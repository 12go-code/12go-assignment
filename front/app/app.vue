<template>
  <UApp>
    <NuxtRouteAnnouncer />
    <NuxtPage :key="pageKey" />
  </UApp>
</template>

<script setup lang="ts">
import { useAppLocale } from '~/composables/useAppLocale'

const { lang } = useAppLocale()
const pageKey = computed(() => String(lang.value))
</script>
