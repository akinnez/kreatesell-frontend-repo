import { configureStore } from '@reduxjs/toolkit'
import pageSlice from './slices/pageSlices'

const store = configureStore({
  reducer: {
      page: pageSlice
  },
})

export default store