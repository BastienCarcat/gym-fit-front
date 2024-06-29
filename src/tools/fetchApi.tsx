import { QueryParams } from '@/types/home/QueryParams'

export default async function fetchApi(url: string, queryParams?: QueryParams) {
  try {
    const baseUrl = process.env.GYM_FIT_BASE_URL

    if (!baseUrl) {
      throw new Error('No base URL provided')
    }

    const response = await fetch(
      `${baseUrl}/${url}?${new URLSearchParams(queryParams as Record<string, string>).toString()}`,
      {
        headers: {
          'X-API-KEY': process.env.GYM_FIT_API_KEY || ''
        }
      }
    )

    return await response.json()
  } catch (error: any) {
    throw error
  }
}
