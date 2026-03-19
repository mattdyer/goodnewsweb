import type { NextRequest } from 'next/server'
import { listAttachments } from '@/lib/paperclip-client'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const owner = url.searchParams.get('owner') ?? ''
    const items = await listAttachments(owner)
    return NextResponse.json(items)
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}