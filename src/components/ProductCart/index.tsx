import { useDispatch } from 'react-redux';
import { setCartAmount, setCartRemove } from '../../features/cart/cart.Slice';
import { ProductInterfece } from '../../features/productSlice';

import './style.css';

function ProductCart(data:ProductInterfece) {
     let dispatch = useDispatch();

     let handleAmountIncrement = ()=>{
          let copyData = {...data};
          let sum = copyData.amount ? parseInt(copyData.amount) + 1 : 0;
          copyData.amount = `${sum}`;
          dispatch(setCartAmount([copyData]))
     }
     let handleAmountDecrement = ()=>{
          let copyData = {...data};
          if(copyData.amount != undefined && parseInt(copyData.amount) != 0){
               let sum = copyData.amount ? parseInt(copyData.amount) - 1 : 0;
               copyData.amount = `${sum}`;
               dispatch(setCartAmount([copyData]))
          }
     }
     let handleRemoveProduct = ()=>{
          dispatch(setCartRemove([data]));
     }
     return ( 
          <div className="productCard">
               <i className='bx bx-x' onClick={handleRemoveProduct}></i>
               <img src={data.img[0]} alt="product" />
               <div className="productCard__data">
                    <h3>{data.name}</h3>
                    <p>Talle <span> 41</span> - Color <span>Negra</span></p>
               </div>
               <span className="precioCu">c/u ${data.price}</span>
               <div className="amount">
                    <button onClick={handleAmountDecrement}>-</button>
                    <span>{data.amount}</span>
                    <button onClick={handleAmountIncrement}>+</button>
               </div>
               <span className="cart__total">${parseInt(data.price) * parseInt(data.amount)}</span>
          </div>
      );
}

export default ProductCart;