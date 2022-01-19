import { createSlice } from '@reduxjs/toolkit'

const initialState = {
data: [],
}

export const storeSlice = createSlice({
  name: 'kreatestore',
  initialState,
  reducers: {
    addItem:(state,action)=>{
        state = state.data.push(action.payload)
    }
  },
})

// Action creators are generated for each case reducer function
export const { addItem } = storeSlice.actions

export default storeSlice.reducer