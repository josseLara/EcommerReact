import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductInterfece } from '../productSlice'





const initialState: ProductInterfece[] = [

]

export const favoritesSlice = createSlice({
     name: 'favorites',
     initialState,
     reducers: {

          setFavoritesState: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               action.payload.map((e) => {
                    state.push(e)
               })

          },
          setFavoriteRemove: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               let index = state.findIndex(e => e._id == action.payload[0]._id)
               state.splice(index, 1)
          },
         
     },
})

// Action creators are generated for each case reducer function
export const { setFavoritesState, setFavoriteRemove } = favoritesSlice.actions

export default favoritesSlice.reducer