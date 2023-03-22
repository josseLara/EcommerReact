import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCartState } from '../../features/cart/cart.Slice';
import { setDescriptionRemplace } from '../../features/description/descriptionSlice';
import { setFavoritesState } from '../../features/favorite/favoriteSlice';
import { RootState } from '../../store';
import './style.css';

function ProductDescription() {
     let description = useSelector((state: RootState) => state.description)
   
     let [imagenFull,setImagenFull] = useState<string>(description[0].img[0]);
     let [amountTotal,setAmountTotal] = useState<number>(0);
     let dataCopi = {...description[0]};
     
  
     // add cart
     let dispatch = useDispatch();
     const handletAddCart = () => {
          dispatch(setCartState([dataCopi]))
     }
     // add favorites
     let handletAddFavorites = () => {
          dispatch(setFavoritesState(description))
     }
     
     // handle decrement - increment
      let handletIncrement = ()=>{
           dataCopi.amount = `${amountTotal +1}`;
           dispatch(setDescriptionRemplace([dataCopi]))
           setAmountTotal( amountTotal + 1)
          }
          let handleDecrement = ()=>{
        
          if(parseInt(dataCopi.amount) != 0){
               dataCopi.amount = `${amountTotal - 1}`;
               dispatch(setDescriptionRemplace([dataCopi]))
               setAmountTotal( amountTotal - 1)
          }

     }
     return (
          <>
               <div className="productDescription">
                    <div className="imagen">
                         <img src={imagenFull || "https://http2.mlstatic.com/D_NQ_NP_921497-MLA49406947387_032022-O.jpg"} alt="product" />
                         <div className="imagen__list">
                              {
                                   description[0].img.map((e) => {
                                       return <img src={e} alt="" onClick={()=>setImagenFull(e)} />
                                   })
                              }
                             
                         </div>
                    </div>
                    {/* description */}
                    <div className="description">
                         <span>{description[0].type.toUpperCase()}</span>
                         <h1>{description[0].name}</h1>
                         <div className="description__precio">
                              <span className="precio">${description[0].price}</span>
                              <span className="alerta">Nuevo</span>
                         </div>
                         <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ut asperiores nesciunt quae eaque, architecto omnis odit doloremque minus cupiditate consectetur alias doloribus velit neque, vel, veritatis itaque! Beatae, quia officia.</p>
                         <div className="color">
                              <h3>Color</h3>
                              {
                                   description[0].color.map((e)=>{
                                        return  <span className={e}></span>
                                   })
                              }
                              {/* <span className="red"></span>
                              <span className="blue"></span>
                              <span className="black"></span> */}
                         </div>
                         <div className="talla">
                              <h3>Talla</h3>
                              {
                                   description[0].talla.map(e=>{
                                        return <button>{e}</button>
                                   })
                              }
          
                         </div>
                         <div className="btns">
                              <div className="amount">
                                   <button onClick={handleDecrement}>-</button>
                                   <span>{dataCopi.amount}</span>
                                   <button onClick={handletIncrement}>+</button>
                              </div>
                              <button onClick={handletAddCart}><i className='bx bx-cart-add' ></i> Agregar al Carro</button>
                         </div>
                         <hr />
                         <button className="heart" onClick={handletAddFavorites}><i className='bx bxs-heart'></i> Agregar a favoritos</button>
                    </div>
                    {/* comments */}
               </div>
          </>
     );
}

export default ProductDescription;