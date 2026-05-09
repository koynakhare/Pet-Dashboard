import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import kebabCase from 'lodash/kebabCase'
import type { Pet } from '@/features/pets/petsTypes'

export type DownloadProgressHandler = (done: number, total: number, fileLabel: string) => void

function sanitizeBaseName(title: string, id: number, index: number): string {
  const slug = kebabCase(title)
  const safe = (slug.length > 0 ? slug : `pet-${id}`).replace(/[^a-z0-9-]/gi, '-')
  return `${safe}-${id}-${index}`.slice(0, 96)
}

export function extensionFromMime(blob: Blob): string {
  const t = blob.type.toLowerCase()
  if (t.includes('png')) return 'png'
  if (t.includes('jpeg') || t.includes('jpg')) return 'jpg'
  if (t.includes('webp')) return 'webp'
  if (t.includes('gif')) return 'gif'
  if (t.includes('svg')) return 'svg'
  return 'jpg'
}

export async function fetchImageBlob(url: string): Promise<Blob> {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`Could not fetch image (${response.status})`)
  }
  return response.blob()
}

export async function downloadSinglePetImage(pet: Pet, index = 1): Promise<void> {
  const blob = await fetchImageBlob(pet.url)
  const ext = extensionFromMime(blob)
  const name = `${sanitizeBaseName(pet.title, pet.id, index)}.${ext}`
  saveAs(blob, name)
}

export async function downloadPetsAsZip(
  pets: Pet[],
  onProgress?: DownloadProgressHandler,
): Promise<void> {
  const zip = new JSZip()
  const folder = zip.folder('pet-gallery')
  if (!folder) {
    throw new Error('Could not create archive folder')
  }

  let index = 0
  for (const pet of pets) {
    index += 1
    const blob = await fetchImageBlob(pet.url)
    const ext = extensionFromMime(blob)
    const fileName = `${sanitizeBaseName(pet.title, pet.id, index)}.${ext}`
    onProgress?.(index, pets.length, fileName)
    folder.file(fileName, blob)
  }

  const archive = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })

  const stamp = new Date().toISOString().slice(0, 10)
  saveAs(archive, `pet-gallery-${stamp}.zip`)
}

/**
 * Single file when one pet; ZIP when multiple (professional batch export).
 */
export async function downloadSelectedPetImages(
  pets: Pet[],
  onProgress?: DownloadProgressHandler,
): Promise<void> {
  if (pets.length === 0) {
    throw new Error('No pets selected')
  }
  if (pets.length === 1) {
    await downloadSinglePetImage(pets[0], 1)
    return
  }
  await downloadPetsAsZip(pets, onProgress)
}
