import { combineReducers } from '@reduxjs/toolkit'
import { petsReducer } from '@/redux/slices/petsSlice'
import { authReducer } from '@/redux/slices/authSlice'
import { selectionReducer } from '@/redux/slices/selectionSlice'

export const rootReducer = combineReducers({
  auth: authReducer,
  pets: petsReducer,
  selection: selectionReducer,
})

export type RootState = ReturnType<typeof rootReducer>
