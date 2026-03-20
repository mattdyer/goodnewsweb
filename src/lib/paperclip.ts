import fs from 'fs'
import path from 'path'

// Lightweight, local-storage paperclip-like helper for Next.js apps.
// - Stores uploads under public/uploads so they are statically served
// - Keeps a simple JSON metadata store at public/uploads/attachments.json
// - Exposes saveFile and list methods used by API routes

type AttachmentMeta = {
  id: string
  filename: string
  size: number
  mimeType: string
  path: string
  url: string
  owner?: string
  createdAt: string
}

export class Paperclip {
  static get uploadsDir() {
    return path.resolve(process.cwd(), 'public', 'uploads')
  }

  static get metaPath() {
    return path.resolve(process.cwd(), 'public', 'uploads', 'attachments.json')
  }

  static async ensure() {
    await fs.promises.mkdir(this.uploadsDir, { recursive: true })
    try {
      await fs.promises.access(this.metaPath, fs.constants.F_OK)
    } catch {
      await fs.promises.writeFile(this.metaPath, JSON.stringify([], null, 2))
    }
  }

  static makeId() {
    // Simple, reasonably unique id helper
    return (
      Date.now().toString(36) + Math.random().toString(36).slice(2, 8)
    )
  }

  static async saveFile(file: File, owner = ''): Promise<AttachmentMeta> {
    await this.ensure()
    const id = this.makeId()
    const originalName = (file as any).name || 'attachment'
    const destName = `${Date.now()}_${id}_${originalName}`
    const destPath = path.join(this.uploadsDir, destName)

    // Read file data from FormData File object
    const arrBuf = await (file as any).arrayBuffer()
    const buffer = Buffer.from(arrBuf)
    await fs.promises.writeFile(destPath, buffer)

    const meta: AttachmentMeta = {
      id,
      filename: originalName,
      size: (file as any).size ?? buffer.length,
      mimeType: (file as any).type ?? 'application/octet-stream',
      path: `/uploads/${destName}`,
      url: `/uploads/${destName}`,
      owner,
      createdAt: new Date().toISOString(),
    }

    await this.appendMeta(meta)
    return meta
  }

  static async appendMeta(meta: AttachmentMeta) {
    const arr = await this.readMeta()
    arr.push(meta)
    await fs.promises.writeFile(this.metaPath, JSON.stringify(arr, null, 2))
  }

  static async readMeta(): Promise<AttachmentMeta[]> {
    try {
      const raw = await fs.promises.readFile(this.metaPath, 'utf-8')
      return JSON.parse(raw) as AttachmentMeta[]
    } catch {
      return []
    }
  }

  static async list(owner = ''): Promise<AttachmentMeta[]> {
    const meta = await this.readMeta()
    if (!owner) return meta
    return meta.filter((m) => m.owner === owner)
  }

  static async get(id: string): Promise<AttachmentMeta | null> {
    const meta = await this.readMeta()
    return meta.find((m) => m.id === id) ?? null
  }

  static async delete(id: string): Promise<boolean> {
    const meta = await this.readMeta()
    const idx = meta.findIndex((m) => m.id === id)
    if (idx === -1) return false
    const [item] = meta.splice(idx, 1)
    await fs.promises.unlink(path.resolve(process.cwd(), 'public', item.path))
    await fs.promises.writeFile(this.metaPath, JSON.stringify(meta, null, 2))
    return true
  }
}

export type { AttachmentMeta }
