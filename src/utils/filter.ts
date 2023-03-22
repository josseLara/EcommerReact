import { ProductInterfece } from "../features/productSlice";

export const filtrarForm = function (productListaCopy: ProductInterfece[], formData: FormData) {
     let categoria: string = `${formData.getAll('categoria')}`;
     let precioMin: number = parseInt(`${formData.getAll('precioMin')}`);
     let precioMax: number = parseInt(`${formData.getAll('precioMax')}`);
     let genero: string = `${formData.getAll('genero')}`;
     let color: string = `${formData.get('color')}`
     let productList;


          // console.log('es este:',color == "null",color)
     
     productList = (categoria != 'todos') ?
          productListaCopy.filter(product => product.type === categoria)
          : productListaCopy;

     productList = productList.filter(product => {

          if (parseInt(product.price) <= precioMax && parseInt(product.price) >= precioMin) {
               return product
          }

     })
    
     if(genero != 'todos'){
          productList = productList.filter(product => {
     
               if (genero == product.gender) {
                    return product
               }
     
          })
     }
     if(color != "null" && color.search("todos") != 0 ){
          productList = productList.filter(product => {
               
               let productSelected = product.color.filter((colorP)=>{
                    if(color == colorP){
                         return true
                    }
               })
               // console.log("color->",productSelected)
               if(productSelected.length != 0){
                    return product
               }
          })
     }
     return productList;
}