interface ProductOperator {
  id: number
  name: string
  sales: number
  routes: number
  rating: number
}

interface SeoMeta {
  title?: string | null
  description?: string | null
  text?: string | null
}

interface OperatorPagePayload {
  operatorName: string
  meta: { title: string; description: string }
  seoText: string
  stats: { salesCount: number; rating: number; routesCount: number }
}

export default defineEventHandler(async (event): Promise<OperatorPagePayload> => {
  const idParam = getRouterParam(event, 'id')
  if (!idParam) {
    throw createError({ statusCode: 400, statusMessage: 'Missing operator id' })
  }

  const id = Number(idParam)
  if (!Number.isFinite(id)) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid operator id' })
  }

  const query = getQuery(event)
  const lang = (query.lang as string) || 'en'

  const config = useRuntimeConfig()
  const productBase = config.productApiUrl
  const seoBase = config.seoApiUrl

  let productData: ProductOperator
  try {
    productData = await $fetch<ProductOperator>(`${productBase}/operator/${id}`)
  } catch (err: unknown) {
    const status = (err as { statusCode?: number })?.statusCode
    if (status === 404) {
      throw createError({ statusCode: 404, statusMessage: 'Operator not found' })
    }
    throw createError({
      statusCode: 502,
      statusMessage: 'Product API unavailable',
      data: { url: `${productBase}/operator/${id}` },
    })
  }

  let meta: SeoMeta = {}
  meta = await $fetch<SeoMeta>(`${seoBase}/meta/operator/${productData.id}/${lang}`)

  const payload: OperatorPagePayload = {
    operatorName: productData.name,
    meta: {
      title: meta.title ?? `${productData.name} — Operator`,
      description: meta.description ?? '',
    },
    seoText: meta.text ?? '',
    stats: {
      salesCount: productData.sales,
      rating: productData.rating,
      routesCount: productData.routes,
    },
  }

  return payload
})
