import type { NextRequest } from 'next/server'
import { Paperclip } from '@/lib/paperclip'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const url = new URL(req.url)
  const owner = url.searchParams.get('owner') ?? ''
  const items = await Paperclip.list(owner)
  return NextResponse.json(items)
}
