import { configureStore } from '@reduxjs/toolkit'
import { listenerMiddleware } from '@/redux/listenerMiddleware'
import { rootReducer } from '@/redux/rootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
})

export type AppDispatch = typeof store.dispatch
