import { configureStore } from '@reduxjs/toolkit'
import storeReducer from './reducers/store'
import authReducer from './reducers/auth'



export const store = configureStore({
  reducer: {
      store:storeReducer,
      auth:authReducer
  },
})