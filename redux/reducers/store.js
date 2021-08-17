import { createSlice } from '@reduxjs/toolkit'



export const storeSlice = createSlice({
  name: 'store',
  initialState:{
    store:{},
    loading:false
  },
  reducers: {
    addStore: (state,action) => {
      state.store = action.payload
    },
    updateStore: (state,action) => {
        state.store = action.payload
    },
    setLoading: (state, action) => {
        state.loading = action.payload
    },
  },
})

export const { addStore, updateStore, setLoading } = storeSlice.actions

export default storeSlice.reducer