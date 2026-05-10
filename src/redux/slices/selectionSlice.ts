import { loadStoredPetSelection } from '@/features/pets/selectionStorage'
import type { RootState } from '@/redux/rootReducer'
import { type PayloadAction, createSlice } from '@reduxjs/toolkit'

export type SelectionState = {
  selectedIds: number[]
}

const initialState: SelectionState = {
  selectedIds: loadStoredPetSelection(),
}

const selectionSlice = createSlice({
  name: 'selection',
  initialState,
  reducers: {
    toggleSelectPet: (state, action: PayloadAction<number>) => {
      const id = action.payload
      const exists = state.selectedIds.includes(id)
      state.selectedIds = exists
        ? state.selectedIds.filter((entry) => entry !== id)
        : [...state.selectedIds, id]
    },
    selectAllVisible: (state, action: PayloadAction<number[]>) => {
      state.selectedIds = action.payload
    },
    clearSelection: (state) => {
      state.selectedIds = []
    },
    pruneSelectionToValidIds: (state, action: PayloadAction<number[]>) => {
      const valid = new Set(action.payload)
      state.selectedIds = state.selectedIds.filter((id) => valid.has(id))
    },
  },
})

export const { toggleSelectPet, selectAllVisible, clearSelection, pruneSelectionToValidIds } =
  selectionSlice.actions
export const selectionReducer = selectionSlice.reducer

export function selectSelectionState(state: RootState): SelectionState {
  return state.selection
}
