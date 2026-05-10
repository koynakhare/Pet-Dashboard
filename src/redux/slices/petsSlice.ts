import type { Pet } from '@/features/pets/petsTypes'
import { fetchPets } from '@/redux/actions/petsActions'
import { createAddCaseHandler } from '@/redux/helper'
import type { RootState } from '@/redux/rootReducer'
import { createSlice } from '@reduxjs/toolkit'
import orderBy from 'lodash/orderBy'

const initialState = {
  items: [] as Pet[],
  usingFallbackData: false,
  searchQuery: '',
  sortBy: 'newest' as 'newest' | 'oldest' | 'name-asc' | 'name-desc',
  showFavoritesOnly: false,
  hasRequested: false,
  hasFetched: false,
  loading: false,
  error: null as string | null,
}

const petsSlice = createSlice({
  name: 'pets',
  initialState,
  reducers: {
    clearPetsError: (state) => {
      state.error = null
    },
    setSearchQuery: (state, action: { payload: string }) => {
      if (state.searchQuery !== action.payload) {
        state.searchQuery = action.payload
      }
    },
    setSortBy: (state, action: { payload: typeof initialState.sortBy }) => {
      if (state.sortBy !== action.payload) {
        state.sortBy = action.payload
      }
    },
    setShowFavoritesOnly: (state, action: { payload: boolean }) => {
      if (state.showFavoritesOnly !== action.payload) {
        state.showFavoritesOnly = action.payload
      }
    },
    toggleFavorite: (state, action: { payload: number }) => {
      const pet = state.items.find((entry) => entry.id === action.payload)
      if (pet) {
        pet.favorite = !pet.favorite
      }
    },
    clearAllFavorites: (state) => {
      for (const pet of state.items) {
        pet.favorite = false
      }
    },
  },
  extraReducers: (builder) => {
    createAddCaseHandler(builder, fetchPets, {
      onPending: (state) => {
        state.hasRequested = true
      },
      onFulfilled: (state, action) => {
        state.items = action.payload.items
        state.usingFallbackData = action.payload.usingFallbackData
        state.hasFetched = true
      },
    })
  },
})

export const {
  clearPetsError,
  setSearchQuery,
  setShowFavoritesOnly,
  setSortBy,
  toggleFavorite,
  clearAllFavorites,
} = petsSlice.actions
export const petsReducer = petsSlice.reducer

export function selectPetsSlice(state: RootState): typeof initialState {
  return state.pets
}

export function selectSortedPets(items: Pet[], sortBy: typeof initialState.sortBy): Pet[] {
  switch (sortBy) {
    case 'oldest':
      return orderBy(items, ['createdAt'], ['asc'])
    case 'name-asc':
      return orderBy(items, ['title'], ['asc'])
    case 'name-desc':
      return orderBy(items, ['title'], ['desc'])
    default:
      return orderBy(items, ['createdAt'], ['desc'])
  }
}
