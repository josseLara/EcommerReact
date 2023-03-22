import { useSelector } from 'react-redux';
import ProductCart from '../../components/ProductCart';
import { RootState } from '../../store';
import './style.css';


function Cart() {
    let carro = useSelector((state:RootState)=> state.cart);
    let subTotal = carro.reduce((accumulator, currentValue) => accumulator + (parseInt(currentValue.price)*parseInt(currentValue.amount)),0)
 
    return (
          <div className="cart">
               <h1>Tu carro</h1>
               <div className="cart__content">
                    <div className="cart__products">
                         <div className="cart__list">
                              {
                                   carro.map((e,i)=>{
                                        return   <ProductCart {...e} key={i}/>
                                   })
                              }
     
                         </div>
                         {/* cart */}
                         <div className="cart__total">
                              <div className="cart__subtotal">
                                   <div className="cart__subtotal__title">
                                        <span>SubTotal</span>
                                        <span>Envio</span>
                                   </div>
                                   <div className="cart__subtotal__value">
                                        <span>${subTotal}</span>
                                        <span>Gratis</span>
                                   </div>
                              </div>
                              <div className="total">
                                   <span>Total</span>
                                   <span>${subTotal}</span>
                              </div>
                         </div>
                    </div>
                    {/* card */}
                    <form className="cart__card">
                         <h1>Tu casi allí!</h1>
                         <div className="card__method">
                              <span>Forma de pago</span>
                              <div className="radio">
                                   <input id="radio-1" name="radio" type="radio" checked />
                                   <label htmlFor="radio-1" className="radio-label"><i className='bx bx-credit-card-alt' ></i>Credito</label>
                              </div>
                              <div className="radio">
                                   <input id="radio-2" name="radio" type="radio" />
                                   <label htmlFor="radio-2" className="radio-label"><i className='bx bxl-paypal' ></i> Paypal</label>
                              </div>
                         </div>
                         <div className="card__method">
                              <span>Nombre tarjeta</span>
                              <p>Jose Lara</p>
                         </div>
                         <div className="card__method">
                              <span>Numero de Tarjeta</span>
                              <div className="card__number">
                                   <span>****</span>
                                   <span>****</span>
                                   <span>****</span>
                                   <span>2154</span>
                                   <i className='bx bxs-low-vision'></i>
                              </div>
                         </div>
                         <div className="card__methodSelect">
                              <div className="selectExp">
                                   <span>Fecha de Expiracion</span>
                                   <div className="selectExp__selects">
                                        <select name="mes" id="mes" title='Mes'>
                                             <option value="01">01</option>
                                             <option value="02">02</option>
                                             <option value="03">03</option>
                                        </select>
                                        <select name="years" id="years" title='Año'>
                                             <option value="01">2021</option>
                                             <option value="02">2022</option>
                                             <option value="03">2023</option>
                                        </select>
                                   </div>
                              </div>
                              <div className="selectCcv">
                                   <label htmlFor="CCV">CCV</label>
                                   <select name="mes" id="mes" title='Mes'>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                   </select>
                              </div>
                         </div>
                         <button>Enviar</button>
                    </form>
                  
               </div>

          </div>
     );
}

export default Cart;