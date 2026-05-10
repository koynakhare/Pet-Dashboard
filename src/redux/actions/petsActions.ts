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

// Static snapshot of the Eulerity pets payload. Used as an offline fallback so
// the gallery still renders if the request fails (e.g. CORS, network, proxy down).
const FALLBACK_PETS_PAYLOAD: PetApiDto[] = [
  { title: 'Tim & Jim', description: 'The best buds that anyone could have', url: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?format=tiny' },
  { title: 'Barky Spears', description: 'Woof! I did it again', url: 'https://images.pexels.com/photos/2607544/pexels-photo-2607544.jpeg?format=tiny' },
  { title: 'Pickles', description: 'Judging you for dropping the ball', url: 'https://images.pexels.com/photos/1851164/pexels-photo-1851164.jpeg?format=tiny' },
  { title: 'Woody', description: 'Lost the laser pointer a while ago but still trying to play along', url: 'https://images.pexels.com/photos/1741205/pexels-photo-1741205.jpeg?format=tiny' },
  { title: 'Mathis', description: 'Beautiful, but not easily fooled by your ploys to distract her from her upcoming meal.', url: 'https://images.pexels.com/photos/290204/pexels-photo-290204.jpeg?format=tiny' },
  { title: 'Bucky', description: 'Here to remind you that not all heros wear caps...some are just Dachshunds', url: 'https://images.pexels.com/photos/895259/pexels-photo-895259.jpeg?format=tiny' },
  { title: 'Montana', description: 'Got her eyes on that prize...peanut butter', url: 'https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?format=tiny' },
  { title: 'Smol', description: 'His name is Smol because he is just that...smol', url: 'https://images.pexels.com/photos/53966/rabbit-palm-hand-snatch-53966.jpeg?format=tiny' },
  { title: 'Frito', description: "Bathtime isn't his favprote but he's tolerant.", url: 'https://images.pexels.com/photos/485294/pexels-photo-485294.jpeg?format=tiny' },
  { title: 'Benny', description: 'Strong genetic predispositon for mailmen suspicion.', url: 'https://images.pexels.com/photos/1619690/pexels-photo-1619690.jpeg?format=tiny' },
  { title: 'Len', description: 'Strengths: sitting on command for treats. Weaknesses: Fear of thunder.', url: 'https://images.pexels.com/photos/2664417/pexels-photo-2664417.jpeg?format=tiny' },
  { title: 'Sasha', description: "She's beauty... she's grace... she might attack your face...", url: 'https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?format=tiny' },
  { title: 'Dottie', description: 'Just always having too good a time...you can take her anywhere...wags her tail with unparalleled force.', url: 'https://images.pexels.com/photos/1591939/pexels-photo-1591939.jpeg?format=tiny' },
  { title: 'Moose', description: 'Loves: walks down the street and belly rubs. Hates: whenever the door bell rings.', url: 'https://images.pexels.com/photos/1390784/pexels-photo-1390784.jpeg?format=tiny' },
  { title: 'Duchess', description: 'Tolerates being held. Consistently gets the zooms between 2 to 3 am.', url: 'https://images.pexels.com/photos/1383397/pexels-photo-1383397.jpeg?format=tiny' },
  { title: 'Hagrid', description: "Don't let his size intimidate you. The sweetest bug around.", url: 'https://images.pexels.com/photos/1521304/pexels-photo-1521304.jpeg?format=tiny' },
  { title: 'Midnight', description: 'Talented at Hide & Seek. Excellent hunter.', url: 'https://images.pexels.com/photos/37337/cat-silhouette-cats-silhouette-cat-s-eyes.jpg?format=tiny' },
  { title: 'Marten', description: 'Senior Bun. Loves Cilantro.', url: 'https://images.pexels.com/photos/326012/pexels-photo-326012.jpeg?format=tiny' },
  { title: 'Sandy', description: 'Often found on warm rocks.', url: 'https://images.pexels.com/photos/407037/gecko-reptile-terrarium-lizard-407037.jpeg?format=tiny' },
  { title: 'Rupert', description: 'Endurance athlete with occasional sprints to the retrieve the daily feed.', url: 'https://images.pexels.com/photos/886210/pexels-photo-886210.jpeg?format=tiny' },
  { title: 'Polly', description: 'Excellent imitator. Dislikes being patronized with crackers.', url: 'https://images.pexels.com/photos/56733/pexels-photo-56733.jpeg?format=tiny' },
]

function buildPetsFromRows(rows: unknown[]): Pet[] {
  return rows
    .filter((entry): entry is PetApiDto => typeof entry === 'object' && entry !== null)
    .map((entry, index) => mapPetToViewModel(entry, index))
}

export const fetchPets = createGenericAsyncThunk<Pet[], void, RootState>(
  'pets/fetchAll',
  async () => {
    try {
      const json = await getRequest<unknown>(API_ENDPOINTS.PETS)
      const rows = Array.isArray(json) ? json : (get(json, 'data', []) as unknown[])
      return buildPetsFromRows(rows)
    } catch (error) {
      console.error('[fetchPets] Falling back to bundled pets payload:', error)
      return buildPetsFromRows(FALLBACK_PETS_PAYLOAD)
    }
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
