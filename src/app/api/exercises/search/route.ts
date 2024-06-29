import { NextRequest, NextResponse } from 'next/server'

import fetchApi from '@/tools/fetchApi'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)

  const query = searchParams.get('query')
  const exercises = await fetchApi(`v1/exercises/search`, { query })

  return NextResponse.json({ exercises })
}
