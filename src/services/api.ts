import { ProductInterfece } from "../features/productSlice";

export const getDataAPI = (dispatch:any,setProductState:any):ProductInterfece[]=>{
     let dataProd:ProductInterfece[] = []
     fetch('http://localhost:3001/product')
     .then(response => response.json())
     .then(data => { 
           console.log(data)    
           dataProd = data
           dispatch(setProductState(data))
           
     });
     return dataProd;
}