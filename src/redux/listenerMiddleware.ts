import { saveStoredPetSelection } from '@/features/pets/selectionStorage'
import { fetchPets } from '@/redux/actions/petsActions'
import { showErrorNotification } from '@/redux/helper'
import type { RootState } from '@/redux/rootReducer'
import {
  clearSelection,
  pruneSelectionToValidIds,
  selectAllVisible,
  toggleSelectPet,
} from '@/redux/slices/selectionSlice'
import { createListenerMiddleware, isAnyOf, isRejectedWithValue } from '@reduxjs/toolkit'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  predicate: (action) => isRejectedWithValue(action),
  effect: (action) => {
    const payload: unknown = action.payload
    const message = typeof payload === 'string' && payload.length > 0 ? payload : 'Request failed'
    showErrorNotification(message)
  },
})

listenerMiddleware.startListening({
  actionCreator: fetchPets.fulfilled,
  effect: (action, api) => {
    const ids = action.payload.items.map((pet) => pet.id)
    api.dispatch(pruneSelectionToValidIds(ids))
  },
})

listenerMiddleware.startListening({
  matcher: isAnyOf(toggleSelectPet, selectAllVisible, clearSelection, pruneSelectionToValidIds),
  effect: (_action, api) => {
    const state = api.getState() as RootState
    saveStoredPetSelection(state.selection.selectedIds)
  },
})
