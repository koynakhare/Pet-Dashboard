import type { Pet } from '@/features/pets/petsTypes'
import { extractErrorMessage } from '@/utils/errors/errorUtils'
import { saveAs } from 'file-saver'
import JSZip from 'jszip'
import kebabCase from 'lodash/kebabCase'

export type PetDownloadRowStatus = 'pending' | 'downloading' | 'success' | 'error'

export type PetDownloadRowModel = {
  pet: Pet
  index: number
  status: PetDownloadRowStatus
  errorMessage?: string
}

export type PetDownloadPhase = 'fetching' | 'zipping' | 'complete' | 'aborted' | 'failed'

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

export async function fetchImageBlob(url: string, signal?: AbortSignal): Promise<Blob> {
  const response = await fetch(url, signal === undefined ? {} : { signal })
  if (!response.ok) {
    throw new Error(`Could not fetch image (${response.status})`)
  }
  return response.blob()
}

export async function downloadSinglePetImage(
  pet: Pet,
  index = 1,
  signal?: AbortSignal,
): Promise<void> {
  const blob = await fetchImageBlob(pet.url, signal)
  const ext = extensionFromMime(blob)
  const name = `${sanitizeBaseName(pet.title, pet.id, index)}.${ext}`
  saveAs(blob, name)
}

export function createInitialDownloadRows(pets: Pet[]): PetDownloadRowModel[] {
  return pets.map((pet, index) => ({ pet, index, status: 'pending' as const }))
}

export async function executeTrackedPetDownload(
  pets: Pet[],
  options: {
    signal: AbortSignal
    onPatchRow: (
      index: number,
      patch: Partial<Pick<PetDownloadRowModel, 'status' | 'errorMessage'>>,
    ) => void
    onPhase: (phase: PetDownloadPhase) => void
  },
): Promise<void> {
  const { signal, onPatchRow, onPhase } = options

  if (pets.length === 0) {
    throw new Error('No pets selected')
  }

  onPhase('fetching')

  if (pets.length === 1 && !signal.aborted) {
    const pet = pets[0]
    if (!pet) {
      throw new Error('No pets selected')
    }
    onPatchRow(0, { status: 'downloading' })
    try {
      await downloadSinglePetImage(pet, 1, signal)
      onPatchRow(0, { status: 'success' })
      onPhase('complete')
      return
    } catch (err) {
      if (signal.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
        onPhase('aborted')
        onPatchRow(0, {
          status: 'error',
          errorMessage: 'Cancelled',
        })
        throw new DOMException('Aborted', 'AbortError')
      }
      onPatchRow(0, {
        status: 'error',
        errorMessage: extractErrorMessage(err),
      })
      onPhase('failed')
      throw err
    }
  }

  const fetched = await Promise.all(
    pets.map((pet, index) =>
      (async (): Promise<{ pet: Pet; blob: Blob } | null> => {
        if (signal.aborted) {
          onPatchRow(index, { status: 'error', errorMessage: 'Cancelled' })
          return null
        }
        onPatchRow(index, { status: 'downloading' })
        try {
          const blob = await fetchImageBlob(pet.url, signal)
          onPatchRow(index, { status: 'success' })
          return { pet, blob }
        } catch (err) {
          if (signal.aborted || (err instanceof DOMException && err.name === 'AbortError')) {
            onPatchRow(index, { status: 'error', errorMessage: 'Cancelled' })
            return null
          }
          onPatchRow(index, {
            status: 'error',
            errorMessage: extractErrorMessage(err),
          })
          return null
        }
      })(),
    ),
  )

  if (signal.aborted) {
    onPhase('aborted')
    throw new DOMException('Aborted', 'AbortError')
  }

  const okRows = fetched.filter((row): row is { pet: Pet; blob: Blob } => row !== null)

  if (okRows.length === 0) {
    onPhase('failed')
    throw new Error('All image downloads failed')
  }

  onPhase('zipping')
  const zip = new JSZip()
  const folder = zip.folder('pet-gallery')
  if (!folder) {
    throw new Error('Could not create archive folder')
  }

  okRows.forEach((row, zi) => {
    const ext = extensionFromMime(row.blob)
    const fileName = `${sanitizeBaseName(row.pet.title, row.pet.id, zi + 1)}.${ext}`
    folder.file(fileName, row.blob)
  })

  if (signal.aborted) {
    onPhase('aborted')
    throw new DOMException('Aborted', 'AbortError')
  }

  const archive = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })
  const stamp = new Date().toISOString().slice(0, 10)
  saveAs(archive, `pet-gallery-${stamp}.zip`)

  if (signal.aborted) {
    onPhase('aborted')
    throw new DOMException('Aborted', 'AbortError')
  }

  onPhase('complete')
}

export async function downloadPetsQuick(pets: Pet[]): Promise<{ saved: number; failed: number }> {
  if (pets.length === 0) {
    return { saved: 0, failed: 0 }
  }
  if (pets.length === 1) {
    const pet = pets[0]
    if (!pet) {
      return { saved: 0, failed: 1 }
    }
    await downloadSinglePetImage(pet, 1)
    return { saved: 1, failed: 0 }
  }

  const settled = await Promise.allSettled(pets.map((pet) => fetchImageBlob(pet.url)))
  const blobs: { pet: Pet; blob: Blob }[] = []
  let failed = 0
  settled.forEach((result, index) => {
    const pet = pets[index]
    if (!pet) {
      return
    }
    if (result.status === 'fulfilled') {
      blobs.push({ pet, blob: result.value })
    } else {
      failed += 1
    }
  })

  if (blobs.length === 0) {
    throw new Error('Could not download any images')
  }

  if (blobs.length === 1) {
    const only = blobs[0]
    if (only) {
      const ext = extensionFromMime(only.blob)
      const name = `${sanitizeBaseName(only.pet.title, only.pet.id, 1)}.${ext}`
      saveAs(only.blob, name)
    }
    return { saved: 1, failed }
  }

  const zip = new JSZip()
  const folder = zip.folder('pet-gallery')
  if (!folder) {
    throw new Error('Could not create archive folder')
  }
  blobs.forEach((row, zi) => {
    const ext = extensionFromMime(row.blob)
    const fileName = `${sanitizeBaseName(row.pet.title, row.pet.id, zi + 1)}.${ext}`
    folder.file(fileName, row.blob)
  })

  const archive = await zip.generateAsync({
    type: 'blob',
    compression: 'DEFLATE',
    compressionOptions: { level: 6 },
  })
  const stamp = new Date().toISOString().slice(0, 10)
  saveAs(archive, `pet-gallery-${blobs.length}-items-${stamp}.zip`)
  return { saved: blobs.length, failed }
}
