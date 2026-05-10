import type { RootState } from '@/redux/rootReducer'
import type { AppDispatch } from '@/redux/store'
import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

export const useAppDispatch: () => AppDispatch = useDispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
