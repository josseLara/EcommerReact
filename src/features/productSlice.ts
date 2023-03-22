import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'


export interface ProductInterfece {
     _id:string,
     name: string,
     price: string,
     img: string[],
     talla: string[],
     color: string[],
     amount:string,
     logo:string,
     type:string,
     gender:string
}


const initialState: ProductInterfece[] = [
    
]

export const productSlice = createSlice({
     name: 'product',
     initialState,
     reducers: {

          setProductState: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               state.splice(0, state.length);
               action.payload.map((e)=>{
                    state.push(e)
                    
               })
               
          },


     },
})

// Action creators are generated for each case reducer function
export const { setProductState } = productSlice.actions

export default productSlice.reducer