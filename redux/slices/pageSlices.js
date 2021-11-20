import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  prevTab:0,
  tab: 1,
}

export const pageSlice = createSlice({
  name: 'Tab',
  initialState,
  reducers: {
    openTab: (state, action) => {
      state.prevTab = state.tab
      state.tab = action.payload
      
    },
  },
})

// Action creators are generated for each case reducer function
export const { openTab } = pageSlice.actions

export default pageSlice.reducer