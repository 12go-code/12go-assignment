const LOCALES = ['en', 'es', 'fr'] as const
export type Locale = (typeof LOCALES)[number]

/** Normalize any locale param to strict code en|es|fr for URLs */
function toLocaleCode(param: string | string[] | undefined): Locale {
  const s = Array.isArray(param) ? param[0] : param
  if (!s || typeof s !== 'string') return 'en'
  const lower = s.toLowerCase()
  if (LOCALES.includes(lower as Locale)) return lower as Locale
  if (lower === 'english') return 'en'
  if (lower === 'spanish' || lower === 'español') return 'es'
  if (lower === 'french' || lower === 'français') return 'fr'
  return 'en'
}

const messages: Record<Locale, Record<string, string>> = {
  en: {
    home: 'Home',
    operators: 'Operators',
    welcome: 'Welcome',
    goToOperators: 'Go to operators list',
    operatorsList: 'Operators list',
    operatorsSubtitle: 'List of operators with links to detail pages',
    loading: 'Loading operators...',
    loadError: 'Failed to load list',
    detailPage: 'Detail page →',
    noOperators: 'No operators yet',
    detailComingSoon: 'Detail page (coming soon)',
  },
  es: {
    home: 'Inicio',
    operators: 'Operadores',
    welcome: 'Bienvenido',
    goToOperators: 'Ir al listado de operadores',
    operatorsList: 'Listado de operadores',
    operatorsSubtitle: 'Lista de operadores con enlaces a páginas detalladas',
    loading: 'Cargando operadores...',
    loadError: 'Error al cargar la lista',
    detailPage: 'Página detallada →',
    noOperators: 'Aún no hay operadores',
    detailComingSoon: 'Página detallada (próximamente)',
  },
  fr: {
    home: 'Accueil',
    operators: 'Opérateurs',
    welcome: 'Bienvenue',
    goToOperators: 'Voir la liste des opérateurs',
    operatorsList: 'Liste des opérateurs',
    operatorsSubtitle: 'Liste des opérateurs avec liens vers les pages détaillées',
    loading: 'Chargement des opérateurs...',
    loadError: 'Échec du chargement de la liste',
    detailPage: 'Page détaillée →',
    noOperators: 'Aucun opérateur pour le moment',
    detailComingSoon: 'Page détaillée (bientôt)',
  },
}

/** First segment of path, normalized to en|es|fr only. */
function pathToLocale(path: string): Locale {
  const seg = (path || '').replace(/^\/+/, '').split('/')[0]
  return toLocaleCode(seg)
}

function getInitialLocale(): string {
  if (import.meta.server) {
    try {
      const url = useRequestURL()
      const seg = (url?.pathname || '').replace(/^\/+/, '').split('/')[0]
      if (seg && LOCALES.includes(seg as Locale)) return seg
    } catch {}
  }
  return 'en'
}

export function useAppLocale() {
  const route = useRoute()
  const localeFromState = useState<string>('locale-from-path', getInitialLocale)

  const lang = computed((): Locale => {
    try {
      const path = (route?.fullPath || route?.path || '').split('?')[0] || ''
      const fromPath = pathToLocale(path)
      if (fromPath !== 'en') return fromPath
      const state = localeFromState.value
      if (state && LOCALES.includes(state as Locale)) return state as Locale
      const fromParams = toLocaleCode(route?.params?.lang)
      return LOCALES.includes(fromParams) ? fromParams : 'en'
    } catch {
      return 'en'
    }
  })

  const strings = computed(() => {
    const code = lang.value
    const map = messages[code] || messages.en
    return { ...messages.en, ...map }
  })
  const t = (key: string) => (strings.value && strings.value[key]) ?? key
  const localeCode = computed((): Locale => {
    const L = lang.value
    return (LOCALES as readonly string[]).includes(L) ? (L as Locale) : 'en'
  })
  return { lang, localeCode, locales: LOCALES, strings, t }
}
