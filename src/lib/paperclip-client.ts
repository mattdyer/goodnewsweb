const PAPERCLIP_URL = process.env.PAPERCLIP_URL || 'http://localhost:3001'

export interface AttachmentMeta {
  id: string
  filename: string
  size: number
  mimeType: string
  path: string
  url: string
  owner?: string
  createdAt: string
}

export async function uploadFile(file: File, owner = ''): Promise<AttachmentMeta> {
  const formData = new FormData()
  formData.append('file', file)
  if (owner) formData.append('owner', owner)

  const res = await fetch(`${PAPERCLIP_URL}/api/paperclip/upload`, {
    method: 'POST',
    body: formData,
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: 'Upload failed' }))
    throw new Error(err.error || 'Upload failed')
  }

  return res.json()
}

export async function listAttachments(owner = ''): Promise<AttachmentMeta[]> {
  const url = owner 
    ? `${PAPERCLIP_URL}/api/paperclip/list?owner=${encodeURIComponent(owner)}`
    : `${PAPERCLIP_URL}/api/paperclip/list`
  const res = await fetch(url)
  if (!res.ok) throw new Error('Failed to list attachments')
  return res.json()
}

export async function getAttachment(id: string): Promise<AttachmentMeta | null> {
  const res = await fetch(`${PAPERCLIP_URL}/api/paperclip/${id}`)
  if (res.status === 404) return null
  if (!res.ok) throw new Error('Failed to get attachment')
  return res.json()
}

export async function deleteAttachment(id: string): Promise<boolean> {
  const res = await fetch(`${PAPERCLIP_URL}/api/paperclip/${id}`, {
    method: 'DELETE',
  })
  return res.ok
}