import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

interface profile {
  name: string,
  email: string,
  imageUrl: string,
  change:boolean
}

export interface UserState {
  profileGoogle: profile
}

const initialState: UserState = {
  profileGoogle: {
    name: '',
    email: '',
    imageUrl: '',
    change:false
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
 
    setProfile: (state, action: PayloadAction<profile>) => {
      let { name, email, imageUrl } = action.payload;
      state.profileGoogle = { name, email, imageUrl, change:true};
    },
  },
})

// Action creators are generated for each case reducer function
export const { setProfile } = userSlice.actions

export default userSlice.reducer