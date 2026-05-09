import { createListenerMiddleware, isAnyOf, isRejectedWithValue } from '@reduxjs/toolkit'
import { saveStoredPetSelection } from '@/features/pets/selectionStorage'
import { fetchPets } from '@/redux/actions/petsActions'
import { showErrorNotification } from '@/redux/helper'
import {
  clearSelection,
  pruneSelectionToValidIds,
  selectAllVisible,
  toggleSelectPet,
} from '@/redux/slices/selectionSlice'

export const listenerMiddleware = createListenerMiddleware()

listenerMiddleware.startListening({
  predicate: (action) => isRejectedWithValue(action),
  effect: (action) => {
    const payload = action.payload
    const message = typeof payload === 'string' ? payload : 'Request failed'
    showErrorNotification(message)
  },
})

listenerMiddleware.startListening({
  actionCreator: fetchPets.fulfilled,
  effect: (action, api) => {
    const ids = action.payload.map((pet) => pet.id)
    api.dispatch(pruneSelectionToValidIds(ids))
  },
})

listenerMiddleware.startListening({
  matcher: isAnyOf(toggleSelectPet, selectAllVisible, clearSelection, pruneSelectionToValidIds),
  effect: (_action, api) => {
    saveStoredPetSelection(api.getState().selection.selectedIds)
  },
})
