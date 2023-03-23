import axios from "axios";
import { ProductInterfece } from "../features/productSlice";

export const getDataAPI =  (dispatch: any, setProductState: any): ProductInterfece[] => {
      let dataProd: ProductInterfece[] = []
      let token = localStorage.getItem('token');
      try{

            axios.post(`${process.env.REACT_APP_URL_PRODUCT}`, { token })
            .then((dataProduct) => {
                  dataProd = dataProduct.data
                  dispatch(setProductState(dataProduct.data))
                  return dataProd;
            })
      }catch(error){
            console.log('error de obtener product')
      }
     
      return dataProd
}

export const setFavorites = (type:string,productId:string,email:string)=>{
      let obj = {
            "product":productId,
            "email":email
          }      
      if(type == 'add'){
            axios.post(`${process.env.REACT_APP_URL_ABSOLUTE}/favorites/add`,obj)
      }else{
            axios.delete(`${process.env.REACT_APP_URL_ABSOLUTE}/favorites?product=${productId}&email=${email}`)
      }    
}