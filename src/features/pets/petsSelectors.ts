import type { RootState } from '@/redux/rootReducer'
import { selectPetsSlice, selectSortedPets } from '@/redux/slices/petsSlice'
import { selectSelectionState } from '@/redux/slices/selectionSlice'
import { createSelector } from '@reduxjs/toolkit'
import filter from 'lodash/filter'
import get from 'lodash/get'

export const selectPets = createSelector(selectPetsSlice, (s) => s.items)

export const selectFavoritePets = createSelector(selectPets, (pets) =>
  filter(pets, (pet) => pet.favorite),
)

export const selectFavoriteAggregate = createSelector(selectFavoritePets, (pets) => {
  const totalMb = pets.reduce((sum, pet) => sum + pet.estimatedSizeMb, 0)
  const avgMbPerPet = pets.length > 0 ? totalMb / pets.length : 0
  return {
    count: pets.length,
    totalMb,
    avgMbPerPet,
  }
})

export const selectPetsLoading = createSelector(selectPetsSlice, (s) => s.loading)

export const selectPetsError = createSelector(selectPetsSlice, (s) => s.error)

export const selectPetCount = createSelector(selectPets, (pets) => pets.length)

export const selectPetsHasRequested = createSelector(selectPetsSlice, (s) => s.hasRequested)
export const selectPetsHasFetched = createSelector(selectPetsSlice, (s) => s.hasFetched)
export const selectPetsUsingFallbackData = createSelector(
  selectPetsSlice,
  (s) => s.usingFallbackData,
)
export const selectSelectedIds = createSelector(selectSelectionState, (s) => s.selectedIds)
export const selectSearchQuery = createSelector(selectPetsSlice, (s) => s.searchQuery)
export const selectSortBy = createSelector(selectPetsSlice, (s) => s.sortBy)
export const selectShowFavoritesOnly = createSelector(selectPetsSlice, (s) => s.showFavoritesOnly)

export const selectFilteredPets = createSelector(
  [selectPets, selectSearchQuery, selectSortBy, selectShowFavoritesOnly],
  (pets, query, sortBy, favoritesOnly) => {
    const sorted = selectSortedPets(pets, sortBy)
    const lowered = query.trim().toLowerCase()
    const filtered = filter(sorted, (pet) => {
      const title = String(get(pet, 'title', '')).toLowerCase()
      const description = String(get(pet, 'description', '')).toLowerCase()
      const matchesText =
        lowered.length === 0 || title.includes(lowered) || description.includes(lowered)
      const matchesFavorite = !favoritesOnly || pet.favorite
      return matchesText && matchesFavorite
    })
    return filtered
  },
)

export const selectSelectedCount = createSelector(selectSelectedIds, (ids) => ids.length)

export const selectEstimatedSelectedSizeKb = createSelector(
  [selectPets, selectSelectedIds],
  (pets, ids) =>
    pets.filter((pet) => ids.includes(pet.id)).reduce((total, pet) => total + pet.fileSizeKb, 0),
)

export const selectEstimatedSelectedSizeMb = createSelector(
  [selectPets, selectSelectedIds],
  (pets, ids) =>
    pets
      .filter((pet) => ids.includes(pet.id))
      .reduce((total, pet) => total + pet.estimatedSizeMb, 0),
)

export const selectSelectedPets = createSelector([selectPets, selectSelectedIds], (pets, ids) =>
  pets.filter((pet) => ids.includes(pet.id)),
)

export const selectPetsWithThumbnails = createSelector(selectFilteredPets, (pets) =>
  pets.map((p) => ({
    id: p.id,
    title: p.title,
    thumb: p.url,
  })),
)

export const selectPetById = createSelector(
  [selectPets, (_state: RootState, petId: number) => petId],
  (pets, petId) => pets.find((p) => p.id === petId),
)

export type PetsListItem = ReturnType<typeof selectPetsWithThumbnails>[number]
