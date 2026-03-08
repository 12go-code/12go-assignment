export interface OperatorPagePayload {
  operatorName: string
  meta: { title: string; description: string }
  seoText: string
  stats: { salesCount: number; rating: number; routesCount: number }
}
