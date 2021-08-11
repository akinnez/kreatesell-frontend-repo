import { createSlice } from '@reduxjs/toolkit'



export const authSlice = createSlice({
  name: 'auth',
  initialState:{
    auth:{},
    loading:false
  },
  reducers: {
    login: (state,action) => {
      state.auth = action.payload
    },
    update: (state,action) => {
        state.auth = action.payload
    },
    setLoading: (state, action) => {
        state.loading = action.payload
    },
  },
})

export const { login, update, setLoading } = authSlice.actions

export default authSlice.reducer