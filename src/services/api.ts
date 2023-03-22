import axios from "axios";
import { ProductInterfece } from "../features/productSlice";

export const getDataAPI =  (dispatch: any, setProductState: any): ProductInterfece[] => {
      let dataProd: ProductInterfece[] = []
      let token = localStorage.getItem('token');
      
      axios.post(`${process.env.REACT_APP_URL_PRODUCT}`, { token })
      .then((dataProduct) => {
            dataProd = dataProduct.data
            dispatch(setProductState(dataProduct.data))
            return dataProd;
      })
     
      // dataProd = data
      // dispatch(setProductState(data))
      //      fetch(`${process.env.REACT_APP_URL_PRODUCT}`)
      //      .then(response => response.json())
      //      .then(data => { 
      //            console.log(data)    
      //            dataProd = data
      //            dispatch(setProductState(data))

      //      });
      return dataProd
}