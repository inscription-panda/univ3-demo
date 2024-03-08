import { configureStore } from '@reduxjs/toolkit'
import root from './slices/root'

export const store = configureStore({
  reducer: {
    root,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})
