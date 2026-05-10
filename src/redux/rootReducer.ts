import { petsReducer } from '@/redux/slices/petsSlice'
import { selectionReducer } from '@/redux/slices/selectionSlice'
import { combineReducers } from '@reduxjs/toolkit'

export const rootReducer = combineReducers({
  pets: petsReducer,
  selection: selectionReducer,
})

export type RootState = ReturnType<typeof rootReducer>
