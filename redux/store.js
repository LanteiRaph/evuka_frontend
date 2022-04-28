import { configureStore } from '@reduxjs/toolkit'
import AuthState from '../redux/Slice/Auth'

//Compile the store for the usage, currenly it anly has the authstate.
export const store = configureStore({
  reducer: {
      auth:AuthState
  },
})