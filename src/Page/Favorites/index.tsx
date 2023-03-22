import { useDispatch, useSelector } from 'react-redux';
import './style.css';
import {RootState} from '../../store'
import Product from '../../components/Product';
import { ProductInterfece } from '../../features/productSlice';
import { useState,useEffect } from 'react';
import Lottie from 'lottie-react';
import AstronautAnim from '../../resouces/astronaut.json';

function Favorites() {
     let favorites = useSelector( (state:RootState) => state.favorites);
     let [search,setSearch] = useState<string>("");
     let [favoritesCopy,setFavoritesCopy] = useState([...favorites]);
     let [refreshRemove,setRefreshRemove] = useState(false);
     useEffect(()=> setFavoritesCopy([...favorites]),[favorites])     
     const handleChangeSearch = (event: React.ChangeEvent<HTMLInputElement>)=>{
          setFavoritesCopy( favorites.filter((e)=> {
               let name = e.name.toLowerCase();
               if(!name.search(event.target.value)  && event.target.value != ""){
                    return e
               }else if( event.target.value == ""){
                    return e
               }
          }));
     }
   // tabs
//    let [tabMin, setTabMin] = useState<number>(0);
//    let [tabMax, setTabMax] = useState<number>(6);

     return (
          <div className="favorites">
               <div className="title">
                    <h1>Favoritos</h1>
                    <span>Productos</span>
               </div>
               {/* filter */}
               <div className="favorites__filter">
                    <div className="favorites__search">
                         <input type="search" name="filterF" id="filterF" title="filterF" placeholder='Buscar' onChange={handleChangeSearch} />
                         <label htmlFor="filterF"><i className='bx bx-search' ></i></label>
                    </div>
               </div>
               {/* time */}
               <div className="favorites__time">
                    <span className="timeActive">Todos</span>
                  
               </div>
               {/* products */}
               <div className="favorites__products">
                   {
                    favoritesCopy.length != 0 ?
                    favoritesCopy.map((e,i)=> <Product {...e} key={i} hiddenF={true} />)
                    :
                    <div className="favorites__products__empty">
                    <Lottie animationData={AstronautAnim} className="astronautAnim"/>
                    <h1>No hay Favoritos</h1>
                    </div>
               }
               </div>

               {/* tab enum */}
              
          </div>
     );
}

export default Favorites;