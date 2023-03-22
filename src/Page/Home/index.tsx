import { useEffect, useState, FormEvent } from 'react';
import Product from '../../components/Product';
import './style.css'
import { SyntheticEvent, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ProductInterfece, setProductState } from '../../features/productSlice';
import { RootState } from '../../store';
import { getDataAPI } from '../../services/api';
import { filtrarForm } from '../../utils/filter';
import noResultAnim from '../../resouces/noResult.json';
import Lottie from 'lottie-react';
import { convertToObject } from 'typescript';
import { render } from '@testing-library/react';


// types
interface Animation {
     animation: string;
}
const animationArrow = (bool: boolean) => {
     let animation: Animation =
          bool ?
               { animation: 'arrowCircle 1s forwards alternate ease-in-out' } :
               { animation: 'arrowCircle 1s forwards alternate-reverse ease-in-out' };
     return animation
}

const animationOption = (bool: boolean) => {
     let animation: Animation =
          bool ?
               { animation: 'selectOption .8s forwards alternate ease-in-out' } :
               { animation: 'selectOption .8s forwards alternate-reverse ease-in-out' };
     return animation
}

const animationStyle = (bool: boolean, nameAnim: string, durationAnim: string) => {
     let animation: Animation =
          bool ?
               { animation: `${nameAnim} ${durationAnim}s forwards alternate ease-in-out` } :
               { animation: `${nameAnim} ${durationAnim}s forwards alternate-reverse ease-in-out` };
     return animation
}
let generateKey = (bool: boolean) => {
     return bool ? '1' : '0';
}


function Home() {
     let [categoria, setCategoria] = useState<boolean>(false);
     let [talle, setTalle] = useState<boolean>(false);
     let [genero, setGenero] = useState<boolean>(false);
     const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('todos');
     const [generoSeleccionado, setGeneroSeleccionado] = useState('todos');

     let [color, setColor] = useState<boolean[]>([false, false, false, false]);
     let [progress, setProgress] = useState<number>(0);
     const progressRef = useRef<HTMLProgressElement>(null);

     const progressClick = (e: SyntheticEvent<HTMLProgressElement>) => {
          const progress = progressRef.current;
          if (progress) {
               const rect = progress.getBoundingClientRect();
               const x = (e.nativeEvent as MouseEvent).clientX - rect.left;
               const width = rect.width;
               const percentage = Math.round((x / width) * 100);
               setProgress(percentage)
          }
     }


     let dispatch = useDispatch();
     let productLista = useSelector((state: RootState) => state.product)
     let [productListaCopy, setProductListaCopy] = useState(productLista)
     const typesSet = new Set(productLista.map(item => item.type));
     const listaCategorias: string[] = [...typesSet];


     // precio
     const maxPriceProduct = productLista.reduce((prev, current) => {
          const currentPrice = parseInt(current.price);
          if (currentPrice > prev) {
               return currentPrice;
          }
          return prev;
     }, 0);
     let [minPrice, setMinPrice] = useState<number>(0);
     let [maxPrice, setMaxPrice] = useState<number>(maxPriceProduct);




     useEffect(() => {
          // This code will run only once on mount           
          getDataAPI(dispatch, setProductState);
     }, []);
     useEffect(() => setProductListaCopy(productLista), [productLista])
     // filter event
     const handletFilterSubmit = function (event: FormEvent<HTMLFormElement>) {
          event.preventDefault();
          const form = event.currentTarget;
          const formData = new FormData(form);
          // console.log(formData.getAll('color'))
          let dataProd =filtrarForm(productLista, formData);
          // 
       
          setProductListaCopy(dataProd);
     }
     // color
     let [colorSeleccionado, setColorSeleccionado] = useState<string>("");
     // tab
     let [tabMin, setTabMin] = useState<number>(0);
     let [tabMax, setTabMax] = useState<number>(6);

     // 
     return (
          <>
               <div className="backgroundColor">
                    <h1>Zapatos de estilo de vida de los hombres</h1>
                    <div className="direction"><span>Home</span> <span>Zapatillas</span></div>
               </div>

               {/* content */}
               <div className="content">
                    <div className="contentTop">
                         <div className="contentTop__imgLeft">
                              <span>Oferta</span>
                              <span>Zapatillas</span>
                              <h2>Zapatillas Nike</h2>
                              <button>Ver mas info</button>
                         </div>
                         <div className="contentTop__imgRight">
                              <span>Oferta</span>
                              <span>Zapatillas</span>
                              <h2>Zapatillas Nike</h2>
                              <button>Ver mas info</button>
                         </div>
                    </div>
                    <div className="contentShop">
                         {/* contentShop__filter */}
                         <div className="contentShop__filter">
                              <form method="post" onSubmit={handletFilterSubmit}>
                                   {/* categoria */}
                                   <div className="select" >
                                        <div className="select__btnToggle" onClick={() => setCategoria(!categoria)}>
                                             Categorias
                                             <i className='bx bx-chevron-down' style={animationArrow(categoria)} key={generateKey(categoria)}></i>
                                        </div>
                                        <div className="select__option" style={animationOption(categoria)} key={generateKey(categoria)}>
                                             {
                                                  listaCategorias.map((e, i) => {
                                                       return (
                                                            <div className="radio" key={i}>
                                                                 <input id={`radio-${i}`} name="categoria" type="radio" value={e} checked={categoriaSeleccionada === e} onChange={(event) => setCategoriaSeleccionada(event.target.value)} />
                                                                 <label htmlFor={`radio-${i}`} className="radio-label">{e}</label>
                                                            </div>
                                                       )
                                                  })
                                             }

                                             <div className="radio">
                                                  <input id="radio-3" name="categoria" type="radio" value="todos" checked={categoriaSeleccionada === 'todos'} onChange={(event) => setCategoriaSeleccionada(event.target.value)} />
                                                  <label htmlFor="radio-3" className="radio-label">Todos</label>
                                             </div>
                                        </div>

                                   </div>
                                   {/* Talle */}
                                   {/* <div className="select" >
                                        <div className="select__btnToggle" onClick={() => setTalle(!talle)}>
                                             Talle
                                             <i className='bx bx-chevron-down' style={animationArrow(talle)} key={generateKey(talle)}></i>
                                        </div>
                                        <div className="select__option" style={animationOption(talle)} key={generateKey(talle)}>
                                             <div className="radio">
                                                  <input id="talle-1" name="talle" type="radio" />
                                                  <label htmlFor="talle-1" className="radio-label">41</label>
                                             </div>
                                             <div className="radio">
                                                  <input id="talle-2" name="talle" type="radio" />
                                                  <label htmlFor="talle-2" className="radio-label">42</label>
                                             </div>
                                        </div>

                                   </div> */}
                                   {/* genero */}
                                   <div className="select" >
                                        <div className="select__btnToggle" onClick={() => setGenero(!genero)}>
                                             Genero
                                             <i className='bx bx-chevron-down' style={animationArrow(genero)} key={generateKey(genero)}></i>
                                        </div>
                                        <div className="select__option" style={animationOption(genero)} key={generateKey(genero)}>
                                             <div className="radio">
                                                  <input id="genero-1" name="genero" type="radio" value="male" checked={generoSeleccionado === 'male'} onChange={(event) => setGeneroSeleccionado('male')} />
                                                  <label htmlFor="genero-1" className="radio-label">Hombre</label>
                                             </div>
                                             <div className="radio">
                                                  <input id="genero-2" name="genero" type="radio" value="female" checked={generoSeleccionado === 'female'} onChange={(event) => setGeneroSeleccionado('female')} />
                                                  <label htmlFor="genero-2" className="radio-label">Mujer</label>
                                             </div>
                                             <div className="radio">
                                                  <input id="genero-3" name="genero" type="radio" value="todos" checked={generoSeleccionado === 'todos'} onChange={(event) => setGeneroSeleccionado('todos')} />
                                                  <label htmlFor="genero-3" className="radio-label">Todos</label>
                                             </div>
                                             {/* <div className="radio">
                                                  <input id="genero-3" name="genero" type="radio" />
                                                  <label htmlFor="genero-3" className="radio-label">Niño</label>
                                             </div>
                                             <div className="radio">
                                                  <input id="genero-4" name="genero" type="radio" />
                                                  <label htmlFor="genero-4" className="radio-label">Niña</label>
                                             </div> */}
                                        </div>

                                   </div>
                                   {/* color */}
                                   <div className="content-color" >
                                        <h3>Color</h3>
                                        <div className="color__list">

                                             <div className="color" onMouseOver={() => setColor([true, false, false, false])} onMouseOut={() => setColor([false, false, false, false])} onClick={() => setColorSeleccionado("rojo")}>
                                                  <i className='bx bxs-down-arrow' style={animationStyle(color[0], 'arrowColor', '1')} key={generateKey(color[0])}></i>
                                                  <span className="red"></span>
                                                  <input type="radio" name="color" value="rojo" checked={colorSeleccionado === 'rojo'} onChange={()=>{}}/>
                                             </div>
                                             <div className="color" onMouseOver={() => setColor([false, true, false, false])} onMouseOut={() => setColor([false, false, false, false])} onClick={() => setColorSeleccionado("azul")}>
                                                  <i className='bx bxs-down-arrow' style={animationStyle(color[1], 'arrowColor', '1')} key={generateKey(color[1])}></i>
                                                  <span className="blue" ></span>
                                                  <input type="radio" name="color" value="azul" checked={colorSeleccionado === 'azul'} onChange={()=>{}}/>

                                             </div>
                                             <div className="color" onMouseOver={() => setColor([false, false, true, false])} onMouseOut={() => setColor([false, false, false, false])} onClick={() => setColorSeleccionado("negro")}>
                                                  <i className='bx bxs-down-arrow' style={animationStyle(color[2], 'arrowColor', '1')} key={generateKey(color[2])}></i>
                                                  <span className="black"></span>
                                                  <input type="radio" name="color" value="negro" checked={colorSeleccionado === 'negro'} onChange={()=>{}}/>

                                             </div>
                                             <div className="color" onMouseOver={() => setColor([false, false, false, true])} onMouseOut={() => setColor([false, false, false, false])} onClick={() => setColorSeleccionado("blanco")}>
                                                  <i className='bx bxs-down-arrow' style={animationStyle(color[3], 'arrowColor', '1')} key={generateKey(color[3])}></i>
                                                  <span className="blanco"></span>
                                                  <input type="radio" name="color" value="blanco" checked={colorSeleccionado === 'blanco'} onChange={()=>{}}/>
                                             </div>
                                             <div className="color" onClick={() => setColorSeleccionado("todos")}>
                                                  <span className="todosColor"><i className={colorSeleccionado == "todos" ? 'bx bxs-color' : 'bx bx-color'}></i></span>
                                                  <input type="radio" name="color" value="todos" checked={colorSeleccionado === 'todos'} onChange={()=>{}}/>
                                             </div>
                                        </div>
                                   </div>
                                   {/* precio */}
                                   <div className="progress-element">
                                        <h3>Precio</h3>
                                        <div className="progress-label">
                                             <p className="progress">Precio desde</p>
                                             <span>US${minPrice}</span>
                                        </div>
                                        <div className="progress-label">
                                             <p className="progress">Precio hasta</p>
                                             <span>US${maxPrice}</span>
                                        </div>
                                        <div className="wrapper">
                                             <fieldset className="filter-price">

                                                  <div className="price-field">
                                                       <input type="range" name='precioMin' min="0" max={maxPriceProduct - 100} value={minPrice} id="lower" onChange={(e) => setMinPrice(parseInt(e.target.value))} />
                                                       <input type="range" name='precioMax' min="0" max={maxPriceProduct} value={maxPrice} id="upper" onChange={(e) => setMaxPrice(parseInt(e.target.value))} />
                                                  </div>
                                                  <div className="price-wrap">
                                                       <span className="price-title">FILTRAR</span>
                                                       <div className="price-wrap-1">
                                                            <input id="one" />
                                                            <label htmlFor="one">${minPrice}</label>
                                                       </div>
                                                       <div className="price-wrap_line">-</div>
                                                       <div className="price-wrap-2">
                                                            <input id="two" />
                                                            <label htmlFor="two">${maxPrice}</label>
                                                       </div>
                                                  </div>
                                             </fieldset>
                                        </div>
                                   </div>
                                   {/* btn */}
                                   <button type='submit' className="btn-filter">Filtrar</button>
                              </form>
                         </div>
                         {/* contentShop__products */}
                         <div className="contentShop__products">
                              {
                                   productListaCopy.length != 0 ?
                                        productListaCopy.slice(tabMin,tabMax).map((data, i) => {
                                             return <Product {...data} key={data._id} hiddenF={false} />
                                        })
                                        :
                                        <div className="contentShop__noResult">
                                             <h2>Sin Resultados</h2>
                                             <Lottie animationData={noResultAnim} className="noResultAnim" />
                                        </div>

                              }
                         </div>

                    </div>
                    {/* tab enum */}
                    <div className="contentTab">
                         <span className="arrow" onClick={() => {
                              let max = tabMax - 6;
                              let min = tabMin - 6;
                              if (productListaCopy.slice(min, max).length != 0) {
                                   setTabMin(min)
                                   setTabMax(max)

                              }
                         }}><i className='bx bx-chevron-left'></i></span>

                         {/* <span className="active" onClick={() => { }}>1</span>
                         <span onClick={() => { }}>2</span> */}
                         <span className="arrow" onClick={() => {
                              let max = tabMax + 6;
                              let min = tabMin + 6;
                              if (productListaCopy.slice(min, max).length != 0) {
                                   setTabMin(min)
                                   setTabMax(max)

                              }
                         }}><i className='bx bx-chevron-right' ></i></span>
                    </div>
               </div>
          </>
     );
}

export default Home;
