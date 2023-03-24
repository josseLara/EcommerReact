import './style.css'
import Lottie from "lottie-react";
import animEcoomer from '../../resouces/login.json';
import animIncorrect from '../../resouces/incorrect.json';
import animWelcome from '../../resouces/welcome.json';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux'
import { setProfile } from '../../features/user/userSlice';
import { Link } from 'react-router-dom';
import { getTokenSave } from '../../services/auth';
import { FormEvent } from 'react';
import { RootState, store } from '../../store';
import Loading from '../../components/Loading';

interface animation {
     animation: string
}

function Login() {
     // animation alert sucess
     let [alertSucess, setAlertSucess] = useState(false);
     let animationAlert: animation = alertSucess ?
          { animation: 'alertSucess 1s alternate forwards ease-in-out' } :
          { animation: 'alertSucess 1s alternate-reverse forwards ease-in-out' };
     const keyAlert = alertSucess ? "1" : "0";
     // login 
     let [user, setUser] = useState({});
     const navigate = useNavigate();
     const dispatch = useDispatch();
     let user11 = useSelector((state: RootState) => state.user);
     let [incorrect, setIncorrect] = useState(false);
     let handleIncorrect = () => setIncorrect(true);
     let [showLoading, setShowLoading] = useState(false);
     let [boolToken, setBoolToken] = useState(false);

     let handletNavigator = () => {
          window.location.href = "https://ecommer-react.vercel.app/home"

     };

     // submit login
     let handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
          setShowLoading(true);
          e.preventDefault();
          const form = e.currentTarget;
          const formData = new FormData(form);
          try {
               getTokenSave(dispatch, setProfile, formData, handletNavigator, handleIncorrect)
               setShowLoading(false)
          } catch (err) {
               setIncorrect(true)
               setShowLoading(false)

          }
     }
     
     useEffect(() => {
         
            const token = localStorage.getItem('token');
            if (token) {
              try {
                setShowLoading(true);
                getTokenSave(dispatch, setProfile);
               
              } catch (err) {
                setShowLoading(false);
              }
          }
        }, [user]);

     return (
          <div className="login">
               {showLoading && <Loading />}
               <div className="login__content">
                    {/* logo */}
                    <div className="logo">
                         <img src="https://seeklogo.com/images/E/e-commerce-concept-logo-5146F23CC5-seeklogo.com.png" alt="llogo" />
                         <span>E-commerce {user11.profileGoogle.email}</span>
                    </div>
                    {/* waves */}
                    <div style={{ height: "100%", overflow: "hidden" }} className="wave"><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}><path d="M208.09,0.00 C152.69,67.20 262.02,76.08 200.80,150.22 L-0.00,150.22 L-0.00,0.00 Z" style={{ stroke: "none", fill: "#08f" }}></path></svg></div>
                    <div className="wave1"><svg viewBox="0 0 500 150" preserveAspectRatio="none" style={{ height: "100%", width: "100%" }}><path d="M208.09,0.00 C152.69,67.20 262.02,76.08 200.80,150.22 L-0.00,150.22 L-0.00,0.00 Z" ></path></svg></div>
                    {/* animation */}
                    <Lottie animationData={animEcoomer} loop={true} className="animation" />
                    {/* text */}
                    <p><i className='bx bxs-user-check'></i> Ingresa tus credenciales para acceder a tu cuenta.</p>
               </div>
               <div className="content__form">
                    <h1>Bienvenido a E-commer</h1>
                    <p>Ingresa tu correo electrónico y contraseña para acceder a tu cuenta. ¡Estamos emocionados de tenerte de vuelta!</p>

                    {/* form */}
                    <form method="post" onSubmit={handleSubmit}>
                         <div className="form__input">
                              <label htmlFor="email">Email</label>
                              <div className="input">
                                   <input type="email" name="email" id="email" />
                                   <i className='bx bxs-user'></i>
                              </div>
                         </div>
                         <div className="form__input">
                              <label htmlFor="pass">Contraseña</label>
                              <div className="input">
                                   <input type="password" name="pass" id="pass" />
                                   <i className='bx bxs-key'></i>
                              </div>
                         </div>
                         {incorrect &&
                              <div className="incorrect">
                                   <Lottie animationData={animIncorrect} className="animIncorrect" />
                                   <p className="form__incorrect">La contraseña o el email es incorrecta</p>
                              </div>
                         }
                         <button type='submit'>Ingresar</button>
                    </form>

                    {/* registrate */}
                    <Link to="/signUp" className='registrate'>¿No tienes cuenta? Regístrate aquí</Link>
               </div>


          </div>
     );
}

export default Login;
