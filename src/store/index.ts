import { configureStore } from '@reduxjs/toolkit'
import cartSlice from '../features/cart/cart.Slice'
import descriptionSlice from '../features/description/descriptionSlice'
import favoriteSlice from '../features/favorite/favoriteSlice'
import productSlice from '../features/productSlice'
import userSlice from '../features/user/userSlice'

export const store = configureStore({
  reducer: {
     user:userSlice,
     product:productSlice,
     cart:cartSlice,
     favorites:favoriteSlice,
     description:descriptionSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch