import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ProductInterfece } from '../productSlice'





const initialState: ProductInterfece[] = [
    
]

export const descriptionSlice = createSlice({
     name: 'description',
     initialState,
     reducers: {

          setDescriptionState: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               
               action.payload.map((e)=>{
                    if(state.length != 0)  state.pop()
                    state.push(e)
               })
               
          },
          setDescriptionRemplace: (state: ProductInterfece[], action: PayloadAction<ProductInterfece[]>) => {
               let index = state.findIndex( e => e._id == action.payload[0]._id)
               let statePrev = state[index];
               state.splice(index, 1)  
               state.push(action.payload[0])
            },
           
     },
})

// Action creators are generated for each case reducer function
export const { setDescriptionState,setDescriptionRemplace } = descriptionSlice.actions

export default descriptionSlice.reducer