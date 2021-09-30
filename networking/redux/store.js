import { configureStore } from '@reduxjs/toolkit'
import StoreReducer from './slices'

export const store = configureStore({
  reducer: {
      store:StoreReducer
  },
})