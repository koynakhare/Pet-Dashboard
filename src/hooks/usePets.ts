import { useCallback, useEffect, useMemo } from 'react'
import {
  selectFilteredPets,
  selectPets,
  selectPetsError,
  selectPetsHasFetched,
  selectPetsHasRequested,
  selectPetsLoading,
  selectShowFavoritesOnly,
  selectSortBy,
} from '@/features/pets/petsSelectors'
import type { Pet } from '@/features/pets/petsTypes'
import { fetchPets } from '@/redux/actions/petsActions'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import {
  clearPetsError,
  setShowFavoritesOnly,
  setSortBy,
} from '@/redux/slices/petsSlice'

export type PetsUiStatus = 'idle' | 'loading' | 'error' | 'empty' | 'success'

export type PetSortOption = 'newest' | 'oldest' | 'name-asc' | 'name-desc'

export type UsePetsResult = {
  catalogPets: Pet[]
  pets: Pet[]
  displayPets: Pet[]
  loading: boolean
  error: string | null
  hasFetched: boolean
  hasRequested: boolean
  uiStatus: PetsUiStatus
  sortBy: PetSortOption
  setSortByOption: (value: PetSortOption) => void
  favoritesOnly: boolean
  setFavoritesOnly: (value: boolean) => void
  ensurePetsLoaded: () => void
  retryFetch: () => void
  galleryStats: {
    visibleCount: number
    favoriteCount: number
  }
}

export function usePets(): UsePetsResult {
  const dispatch = useAppDispatch()
  const catalogPets = useAppSelector(selectPets)
  const pets = useAppSelector(selectFilteredPets)
  const loading = useAppSelector(selectPetsLoading)
  const error = useAppSelector(selectPetsError)
  const hasFetched = useAppSelector(selectPetsHasFetched)
  const hasRequested = useAppSelector(selectPetsHasRequested)
  const sortBy = useAppSelector(selectSortBy)
  const favoritesOnly = useAppSelector(selectShowFavoritesOnly)

  const ensurePetsLoaded = useCallback(() => {
    void dispatch(fetchPets())
  }, [dispatch])

  useEffect(() => {
    ensurePetsLoaded()
  }, [ensurePetsLoaded])

  const retryFetch = useCallback(() => {
    dispatch(clearPetsError())
    void dispatch(fetchPets())
  }, [dispatch])

  const setSortByOption = useCallback(
    (value: PetSortOption) => {
      dispatch(setSortBy(value))
    },
    [dispatch],
  )

  const setFavoritesOnlyFlag = useCallback(
    (value: boolean) => {
      dispatch(setShowFavoritesOnly(value))
    },
    [dispatch],
  )

  const displayPets = useMemo(() => pets, [pets])

  const galleryStats = useMemo(
    () => ({
      visibleCount: displayPets.length,
      favoriteCount: displayPets.reduce(
        (total, pet) => total + (pet.favorite ? 1 : 0),
        0,
      ),
    }),
    [displayPets],
  )

  const uiStatus = useMemo((): PetsUiStatus => {
    if (error) {
      return 'error'
    }
    if (!hasRequested) {
      return 'idle'
    }
    if (loading && !hasFetched) {
      return 'loading'
    }
    if (hasFetched && catalogPets.length === 0) {
      return 'empty'
    }
    if (hasFetched && displayPets.length === 0) {
      return 'empty'
    }
    return 'success'
  }, [error, hasRequested, loading, hasFetched, catalogPets.length, displayPets.length])

  return {
    catalogPets,
    pets,
    displayPets,
    loading,
    error,
    hasFetched,
    hasRequested,
    uiStatus,
    sortBy,
    setSortByOption,
    favoritesOnly,
    setFavoritesOnly: setFavoritesOnlyFlag,
    ensurePetsLoaded,
    retryFetch,
    galleryStats,
  }
}
