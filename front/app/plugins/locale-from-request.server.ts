export default defineNuxtPlugin(() => {
  try {
    const url = useRequestURL()
    const path = (url?.pathname || '').replace(/^\/+/, '').split('/')[0]
    const code = path && ['en', 'es', 'fr'].includes(path) ? path : 'en'
    const state = useState<string>('locale-from-path', () => 'en')
    state.value = code
  } catch {
    const state = useState<string>('locale-from-path', () => 'en')
    state.value = 'en'
  }
})
