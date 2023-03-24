import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import CardProduct from './CartProduct';
import './style.css';
import { RootState } from '../../store';
import { ProductInterfece } from '../../features/productSlice';
import { setDescriptionState } from '../../features/description/descriptionSlice';
import Lottie from 'lottie-react';
import cartEmptyAnim from '../../resouces/empty-cart.json'

interface animation {
     animation: string
}
function Menu() {
     let [toggleMenu, setToggleMenu] = useState<boolean>(false);
     let [searchMenu, setSearchMenu] = useState<boolean>(false);
     let [cartMenu, setCartMenu] = useState<boolean>(false);
     let productList = useSelector((state: RootState) => state.product);
     let dispatch = useDispatch();
     let navigator = useNavigate();
     // animation btnToggle menu
     let animationToggle: animation = toggleMenu ?
          { animation: 'menu__contentY 1s alternate forwards ease-in-out' } :
          { animation: 'menu__contentY 1s alternate-reverse forwards ease-in-out' };
     const btnKey = toggleMenu ? "open" : "close";
     // animation search
     let animationSearch: animation = searchMenu ?
          { animation: 'searchAnim 1s alternate forwards ease-in-out' } :
          { animation: 'searchAnim 1s alternate-reverse forwards ease-in-out' };
     const searchKey = searchMenu ? "1" : "0";
     // animation cart
     let animationCart: animation = cartMenu ?
          { animation: 'menuCartAnim 1s alternate forwards ease-in-out' } :
          { animation: 'menuCartAnim 1s alternate-reverse forwards ease-in-out' };
     const cartKey = cartMenu ? "1" : "0";

     // data cart
     let dataCart = useSelector((state: RootState) => state.cart)
     let [total, setTotal] = useState(0);
     useEffect(() => setTotal(dataCart.reduce((acc, curr: any) => acc + (parseInt(curr.price) * parseInt(curr.amount)), 0)), [dataCart])
     // search
     let [searchResult, setSearchResult] = useState<ProductInterfece[]>([]);
     let [serchText, setSearchText] = useState("")
     const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
          let result: ProductInterfece[] = productList.filter((e) => {
               let name = e.name.toLowerCase();
               setSearchText(event.target.value);
               if (!name.search(event.target.value) && event.target.value != "") {
                    return e
               }
          })
          setSearchResult(result)
          console.log(result)
     }
     const handleShowescription = (e: ProductInterfece) => {
          dispatch(setDescriptionState([e]));
          setSearchResult([]);
          setSearchText("")
          navigator('/description')
     }
     const handleOut = () => {
          localStorage.removeItem("token");
          navigator('/')
     }
     return (
          <div className="menu">
               <div className="menu__right">
                    <div className="search">
                         <i className='bx bx-search-alt-2' onClick={() => setSearchMenu(!searchMenu)}></i>
                         <input type="text" style={animationSearch} key={searchKey} placeholder="Buscar" value={serchText} onChange={handleChangeSearch} />

                         <div className="search__Results">
                              {
                                   serchText.length != 0 && (
                                        searchResult.length != 0 ?
                                             searchResult.map((e, i): any => {
                                                  return (
                                                       <div className="search__ResultsItem" style={{ background: "rgba(0, 0, 0, 0.371)" }} key={i} onClick={() => handleShowescription(e)}>
                                                            <img src={e.img[0]} alt="imagen" />
                                                            <div className="search__Results__desc">
                                                                 <p>{e.name}</p>
                                                                 <span>Nike</span>
                                                            </div>
                                                       </div>);
                                             }) :
                                             <div className="search__sinResult" style={{ background: "rgba(0, 0, 0, 0.371)" }}>
                                                  <span>Sin resultados</span>
                                             </div>)
                              }

                         </div>
                    </div>
                    <i className='bx bx-menu' onClick={() => setToggleMenu(!toggleMenu)}></i>
               </div>

               <div className="menu__content" style={animationToggle} key={btnKey}>
                    <i className='bx bx-x' onClick={() => setToggleMenu(!toggleMenu)}></i>
                    <div className="menu__list">
                         <div>
                              <Link to="/home" onClick={() => setToggleMenu(!toggleMenu)}>
                                   Inicio
                              </Link>
                         </div>

                         <div>
                              <Link to="/favorites" onClick={() => setToggleMenu(!toggleMenu)}>
                                   Favoritos
                              </Link>
                         </div>
                         <div>
                              <Link to="/profile" onClick={() => setToggleMenu(!toggleMenu)}>
                                   Mi perfil
                              </Link>
                         </div>

                    </div>
               </div>


               <span className="menuTitle">E-commerce</span>

               <div className="menu__left">
                    <Link to="/profile">
                         <i className='bx bx-user'></i>
                    </Link>
                    <Link to="/favorites">
                         <i className='bx bx-heart'></i>
                    </Link>
                    <div className="cart-content">
                         <span>{dataCart.length}</span>
                         <i className='bx bx-cart' onClick={() => { setCartMenu(!cartMenu) }}></i>
                    </div>
                    <div className="menu__left__out" onClick={handleOut}>
                         <i className='bx bx-log-out-circle'></i>
                    </div>
               </div>

               {/* cart */}

               <div className="menu__cart" style={animationCart} key={cartKey}>
                    <i className='bx bx-x menu__cart__closed' onClick={() => { setCartMenu(!cartMenu) }}></i>
                    <h2>Cart</h2>
                    <div className="list">
                         {
                              dataCart.length != 0 ?
                                   dataCart.map((e, i) => <CardProduct {...e} key={i} />)
                                   :
                                   <div className="list__empty">
                                        <Lottie animationData={cartEmptyAnim} className="cartEmptyAnim" />
                                        <h3>No hay Productos</h3>
                                   </div>
                         }
                    </div>
                    <div className="card__checkout">
                         <div className="card__checkout__total">
                              <span>Total</span>
                              <span>${total}</span>
                         </div>

                         <Link to="/cart" onClick={() => setCartMenu(!cartMenu)}>
                              <button>
                                   Verificar
                              </button>
                         </Link>

                    </div>
               </div>


          </div>
     );
}

export default Menu;