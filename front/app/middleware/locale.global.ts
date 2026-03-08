const LOCALES = ['en', 'es', 'fr'] as const

function toCode(param: string | undefined): string {
  if (!param) return 'en'
  const lower = String(param).toLowerCase()
  if (LOCALES.includes(lower as any)) return lower
  if (lower === 'english') return 'en'
  if (lower === 'spanish' || lower === 'español') return 'es'
  if (lower === 'french' || lower === 'français') return 'fr'
  return 'en'
}

export default defineNuxtRouteMiddleware((to) => {
  if (to.path === '/') {
    return navigateTo('/en', { replace: true })
  }
  const seg = to.path.replace(/^\/+/, '').split('/')[0]
  const code = (seg && LOCALES.includes(seg as any)) ? seg : toCode(seg || (to.params.lang as string))
  useState<string>('locale-from-path', () => 'en').value = code
  const rest = to.path.replace(/^\/[^/]+/, '') || ''
  if (seg !== code) {
    return navigateTo(rest ? `/${code}/${rest}` : `/${code}`, { replace: true })
  }
})
