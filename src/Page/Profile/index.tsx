import { useState } from 'react';
import './style.css'
import { useSelector, useDispatch } from 'react-redux'
import type { RootState } from '../../store';
import { Link } from 'react-router-dom';

interface Animation {
     animation: string
}

const handletAnimation = (bool: boolean, nameAnim: string) => {
     let animation: Animation =
          bool ?
               { animation: `${nameAnim} 1s forwards alternate ease-in-out` } :
               { animation: `${nameAnim} 1s forwards alternate-reverse ease-in-out` };
     return animation
}
let generateKey = (bool: boolean) => {
     return bool ? '1' : '0';
}

function Profile() {
     let [editarToggle, setEditarToggle] = useState(false);
     let title = !editarToggle ? 'Perfil' : 'Editar perfil';

     // profile data
     const profileData = useSelector((state: RootState) => state.user.profileGoogle)
     console.log(profileData)
     return (
          <div className="profile">
               <h1>{title}</h1>
               <div className="profile__content">
                    <div className="content__img">
                         <div className="imagen">
                              <img src={profileData.imageUrl} alt="user" />
                              <i className='bx bxs-camera'></i>
                         </div>

                    </div>
                    {/* data */}
                    <div className="profile_data" style={handletAnimation(!editarToggle, 'showBox')} key={generateKey(!editarToggle)}>
                         <div className="data__user">
                              <span>Nombre</span>
                              <span>{profileData.name || '..'}</span>
                         </div>
                         <div className="data__user">
                              <span>Correo</span>
                              <span>{profileData.email || '..'}</span>
                         </div>
                         { !profileData.change &&
                              <>
                                   <div className="data__user">
                                        <span>Telefono</span>
                                        <span>+54 38122212</span>
                                   </div>
                                   <div className="data__user">
                                        <span>Dirección</span>
                                        <span>Av. Roca 222 - Tucuman - Argentina</span>
                                   </div>
                                   {/* btn */}
                                   <button className="BtnEditar" onClick={() => setEditarToggle(!editarToggle)} ><i className='bx bxs-pencil'></i>Editar Perfil</button>
                              </>
                         }
                    </div>
                    {/* form */}
                    <form method="post" className="profile__form" style={handletAnimation(editarToggle, 'showBoxForm')} key={generateKey(editarToggle)}>
                         <div className="content__input">
                              <label htmlFor="Nombre">Nombre</label>
                              <input type="text" name='nombre' title='nombre' placeholder='Nombre' />
                         </div>
                         <div className="content__input">
                              <label htmlFor="Correo">Correo</label>
                              <input type="email" name='Correo' title='Correo' placeholder='Correo' />
                         </div>
                         <div className="content__input">
                              <label htmlFor="Telefono">Telefono</label>
                              <input type="text" name='Telefono' title='Telefono' placeholder='Telefono' />
                         </div>
                         <div className="content__input">
                              <label htmlFor="Direccion">Dirección</label>
                              <input type="text" name='Direccion' title='Direccion' placeholder='Dirección' />
                         </div>

                         <div className="form__btns">
                              <button type='submit'>Guardar</button>
                              <button type='button' onClick={() => setEditarToggle(!editarToggle)}>Cancelar</button>
                         </div>
                    </form>
                  
               </div>

          </div>
     );
}

export default Profile;