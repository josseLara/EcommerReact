import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ProductInterfece {
     _id: string,
     name: string,
     price: string,
     img: string[],
     talla: string[],
     color: string[],
     amount: string,
     logo: string,
     type: string,
     gender: string,
     marca:string
}


const initialState: ProductInterfece[] = [

]

export const cartSlice = createSlice({
     name: 'cart',
     initialState,
     reducers: {

          setCartState: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               let index = state.findIndex(e => e._id == action.payload[0]._id)
               console.log(index)
               if (index) {
                    action.payload.map((e) => {
                         let data = { ...e }
                         data.amount = parseInt(data.amount) != 0 ? data.amount : "1";
                         state.push(data)
                    })
               } else {
                    state.splice(index, 1)
                    state.push({...action.payload[0]})
               }

          },
          setCartRemove: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               let index = state.findIndex(e => e._id == action.payload[0]._id)
               state.splice(index, 1)
          },
          setCartAmount: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               let index = state.findIndex(e => e._id == action.payload[0]._id)
               let statePrev = state[index];
               state.splice(index, 1)
               state.push(action.payload[0])
          },

     },
})

// Action creators are generated for each case reducer function
export const { setCartState, setCartRemove, setCartAmount } = cartSlice.actions

export default cartSlice.reducer