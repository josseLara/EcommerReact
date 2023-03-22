import './style.css';
import { setCartAmount, setCartRemove} from '../../../features/cart/cart.Slice';
import { useDispatch } from 'react-redux';
import { useState } from 'react';
import { ProductInterfece } from '../../../features/productSlice';

function CardProduct(data:ProductInterfece) {
     let [amountTotal,setAmountTotal] = useState(1);
  
     // remove cart 
     let dispatch = useDispatch();
     const handletRemover = ()=>{
          dispatch(setCartRemove([data]))
     }
     if(amountTotal == 0){
          handletRemover()
     }
     // amount cart
     let handletIncrement = ()=>{
        
          let dataCopi = {...data};
          dataCopi.amount = `${parseInt(data.amount)+1}`;   
          dispatch(setCartAmount([dataCopi]))
     }
     let handleDecrement = ()=>{
          if(parseInt(data.amount) == 1){
               handletRemover()
          }else{
               let dataCopi = {...data};
               dataCopi.amount = `${parseInt(data.amount)-1}`;
               dispatch(setCartAmount([dataCopi]))
          }
     }
     return (
          <div className="cardProduct">
               <img src={data.img[0]} alt="prod" />
               <div className="cardProduct__name">
                    <p>{data.name}</p>
                    <span>{data.type}</span>
               </div>
               {/* amount */}
               <div className="cardProduct__amount">
                    <span>${data.price}</span>
                    <button onClick={handleDecrement}>-</button>
                    <span>{data.amount}</span>
                    <button onClick={handletIncrement}>+</button>
               </div>
               <span className="cardProduct__precio">${parseInt(data.price) * amountTotal}</span>
               <div className="btn_closed">
                    <i className='bx bx-x' onClick={handletRemover}></i>
               </div>
          
          </div>
     );
}

export default CardProduct;