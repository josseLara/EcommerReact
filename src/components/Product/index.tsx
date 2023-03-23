import './style.css';
import { useEffect, useRef, useState } from 'react';
import Lottie, { LottieRef, LottieRefCurrentProps } from 'lottie-react';
import CartAnim from '../../resouces/cart.json'
import CartColorAnim from '../../resouces/cartColor.json'
import HeartAnim from '../../resouces/heart.json'
import HeartColorAnim from '../../resouces/heartColor.json'
import IconRemoveAnim from '../../resouces/remove.json';
import { ProductInterfece } from "../../features/productSlice"
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setCartState, setCartRemove } from '../../features/cart/cart.Slice';
import { setFavoriteRemove, setFavoritesState } from '../../features/favorite/favoriteSlice';
import { setDescriptionState } from '../../features/description/descriptionSlice';
import { RootState } from '../../store';
import CardProduct from '../Menu/CartProduct';
import { setFavorites } from '../../services/api';
interface Animation {
     animation: string
}


function Product(data: ProductInterfece & { hiddenF: boolean }) {
     let [productAnim, setProductAnim] = useState<boolean>(false);
     const [iconHeartColor, setIconHeartColor] = useState<boolean>(false);
     const [iconCartColor, setIconCartColor] = useState<boolean>(false);
     const cartProd = useSelector((state: RootState) => state.cart);
     const cartHeart = useSelector((state: RootState) => state.favorites);
     const user = useSelector((state: RootState) => state.user);

     useEffect(() => {
          let iconCartHave = cartProd.findIndex((e) => e._id == data._id);
          setIconCartColor(iconCartHave != -1 ? true : false)
     }, [cartProd])
     useEffect(() => {
          let iconHeartHave = cartHeart.findIndex((e) => e._id == data._id);
          setIconHeartColor(iconHeartHave != -1 ? true : false)
          // console.log(data._id);

     }, [cartHeart])

     // animation Product 
     let animationProduct: Animation = productAnim ?
          { animation: 'productHoverAnim .5s alternate forwards ease-in-out' } :
          { animation: 'productHoverAnim .5s alternate-reverse forwards ease-in-out' }
     let productKey = productAnim ? '1' : '0';
     // animation Hover
     const CartAnimRef = useRef<LottieRefCurrentProps | null>(null);
     const HeartAnimRef = useRef<LottieRefCurrentProps | null>(null);
     const removeAnimRef = useRef<LottieRefCurrentProps | null>(null);

     const playAnimation = (lotRef: any) => {
          if (lotRef.current) {
               lotRef.current?.play();
          }
     };

     const pauseAnimation = (lotRef: any) => {
          if (lotRef.current) {
               lotRef.current?.pause();
          }
     };
     useEffect(() => pauseAnimation(removeAnimRef), [])
     // add cart
     let dispatch = useDispatch();
     const handletAddCart = () => {
          if (iconCartColor) {
               dispatch(setCartRemove([data]))
          } else {
               dispatch(setCartState([data]))
          }
          setIconCartColor(!iconCartColor);
     }
     // add favorites
     let handletAddFavorites = () => {
          if (iconHeartColor) {
               hendletRemoveFavorite()
          } else {
               dispatch(setFavoritesState([data]))
               setFavorites('add', data._id, user.profileGoogle.email)
          }
          setIconHeartColor(!iconHeartColor)
     }
     let hendletRemoveFavorite = () => {
          dispatch(setFavoriteRemove([data]))
          setFavorites('remove', data._id, user.profileGoogle.email)
     }
     // add description
     let handletAddDescription = () => {
          dispatch(setDescriptionState([data]));
     }
     return (
          <div className="product" onMouseMove={() => setProductAnim(true)} onMouseOut={() => setProductAnim(false)}>
               {data.hiddenF && <Lottie animationData={IconRemoveAnim} className="iconRemove" lottieRef={removeAnimRef} onMouseEnter={() => playAnimation(removeAnimRef)} onMouseLeave={() => pauseAnimation(removeAnimRef)} onClick={hendletRemoveFavorite} />}
               <div className="product__head">
                    <span>Nike</span>
                    <p>Toon Ford</p>
               </div>
               <img src={data.img[0]} alt="product" />
               <div className="product__footer">
                    <div className="product__footer__price">
                         <p>Nike</p>
                         <span>${data.price}</span>
                         <Link to="/description" className="product__footer__more" onClick={handletAddDescription}>
                              <span>Ver mas</span>
                              <i className='bx bxs-chevron-right'></i>
                         </Link>
                    </div>
                    <img src={data.logo} alt="logo" />
               </div>
               {/*  */}
               <div className="productHover" style={animationProduct} key={productKey} onMouseOver={() => setProductAnim(true)} onMouseOut={() => setProductAnim(false)}>
                    <span>Hoy</span>
                    <span>Zapatilla</span>
                    <div className="productHover__btn" onMouseMove={() => setProductAnim(true)}>
                         <button onClick={handletAddCart}>
                              {!iconCartColor ?
                                   <Lottie animationData={CartAnim} loop={true} className="animationLottie" lottieRef={CartAnimRef} onMouseEnter={() => playAnimation(CartAnimRef)} onMouseLeave={() => pauseAnimation(CartAnimRef)} /> :
                                   <Lottie animationData={CartColorAnim} loop={true} className="animationLottie" lottieRef={CartAnimRef} onMouseEnter={() => playAnimation(CartAnimRef)} onMouseLeave={() => pauseAnimation(CartAnimRef)} />}
                              <span>Agregar</span>
                         </button>
                         {!data.hiddenF &&
                              <button onClick={handletAddFavorites}>
                                   {!iconHeartColor ?
                                        <Lottie animationData={HeartAnim} loop={true} className="animationLottie" lottieRef={HeartAnimRef} onMouseEnter={() => playAnimation(HeartAnimRef)} onMouseLeave={() => pauseAnimation(HeartAnimRef)} /> :
                                        <Lottie animationData={HeartColorAnim} loop={true} className="animationLottie" lottieRef={HeartAnimRef} onMouseEnter={() => playAnimation(HeartAnimRef)} onMouseLeave={() => pauseAnimation(HeartAnimRef)} />
                                   }
                                   <span>Favoritos</span>
                              </button>
                         }
                    </div>

               </div>
          </div>
     );
}

export default Product;