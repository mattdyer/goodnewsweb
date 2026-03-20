import type { NextRequest } from 'next/server'
import { uploadFile } from '@/lib/paperclip-client'
import { NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 })
    }
    const owner = (formData.get('owner') as string) ?? ''
    const meta = await uploadFile(file, owner)
    return NextResponse.json(meta, { status: 201 })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}