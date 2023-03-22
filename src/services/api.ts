import { ProductInterfece } from "../features/productSlice";

export const getDataAPI = (dispatch:any,setProductState:any):ProductInterfece[]=>{
     let dataProd:ProductInterfece[] = []
     fetch(`${process.env.REACT_APP_URL_PRODUCT}`)
     .then(response => response.json())
     .then(data => { 
           console.log(data)    
           dataProd = data
           dispatch(setProductState(data))
           
     });
     return dataProd;
}