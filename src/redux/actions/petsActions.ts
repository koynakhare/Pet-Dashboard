import { createGenericAsyncThunk } from '@/redux/helper'
import type { RootState } from '@/redux/rootReducer'
import { getRequest } from '@/services/api/httpClient'
import { API_ENDPOINTS } from '@/utils/constants/apiEndpoints'
import type { Pet, PetApiDto } from '@/features/pets/petsTypes'
import get from 'lodash/get'
import { mockEstimatedSizeMb } from '@/features/pets/utils/mockEstimatedSizeMb'

function createStableId(input: string, index: number): number {
  let hash = 0
  for (let i = 0; i < input.length; i += 1) {
    hash = (hash << 5) - hash + input.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash) + index + 1
}

function mapPetToViewModel(dto: PetApiDto, index: number): Pet {
  const title = String(get(dto, 'title', `Pet ${index + 1}`))
  const urlValue = String(get(dto, 'url', ''))
  const url =
    urlValue.length > 0
      ? urlValue
      : `data:image/svg+xml;utf8,${encodeURIComponent(
          '<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800"><rect width="100%" height="100%" fill="#e2e8f0"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#475569" font-size="42">Pet Image</text></svg>',
        )}`
  const description = String(get(dto, 'description', 'Modern curated pet gallery image'))
  const createdAt = String(
    get(dto, 'createdAt', new Date(Date.now() - index * 86_400_000).toISOString()),
  )
  const tagsRaw = get(dto, 'tags', [])
  const tags =
    Array.isArray(tagsRaw) && tagsRaw.every((tag): tag is string => typeof tag === 'string')
      ? tagsRaw
      : ['pet', 'gallery', index % 2 === 0 ? 'featured' : 'editorial']

  const id = createStableId(`${title}-${url}`, index)
  const estimatedSizeMb = mockEstimatedSizeMb(id)
  const fileSizeKb = Math.max(1, Math.round(estimatedSizeMb * 1024))

  return {
    id,
    title,
    url,
    description,
    createdAt,
    estimatedSizeMb,
    fileSizeKb,
    tags,
    favorite: false,
  }
}

export const fetchPets = createGenericAsyncThunk<Pet[], void, RootState>(
  'pets/fetchAll',
  async () => {
    const json = await getRequest<unknown>(API_ENDPOINTS.PETS)
    const rows = Array.isArray(json)
      ? json
      : (get(json, 'data', []) as unknown[])
    return rows
      .filter((entry): entry is PetApiDto => typeof entry === 'object' && entry !== null)
      .map((entry, index) => mapPetToViewModel(entry, index))
  },
  {
    condition: (_arg, api) => {
      const { pets } = api.getState()
      if (pets.loading) {
        return false
      }
      if (pets.hasFetched) {
        return false
      }
      return true
    },
  },
)
