export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const base = config.productApiUrl ?? 'http://localhost:8001'
  const url = `${base.replace(/\/$/, '')}/operator`
  try {
    const data = await $fetch<Array<{ id: number; name: string }>>(url)
    return data
  } catch (err) {
    throw createError({
      statusCode: 502,
      statusMessage: 'Product API unavailable',
      data: { url },
    })
  }
})
