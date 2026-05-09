const STORAGE_KEY = 'pet-gallery:selected-pet-ids'

function readRaw(): unknown {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? 'null')
  } catch {
    return null
  }
}

export function loadStoredPetSelection(): number[] {
  const raw = readRaw()
  if (!Array.isArray(raw)) {
    return []
  }
  return raw.filter((id): id is number => typeof id === 'number' && Number.isFinite(id))
}

export function saveStoredPetSelection(ids: number[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ids))
  } catch {
    /* ignore quota / private mode */
  }
}
