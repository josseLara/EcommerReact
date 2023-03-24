import './style.css';
import animSignUp from '../../resouces/signUp.json';
import Lottie from "lottie-react";
import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { getTokenSave } from '../../services/auth';
import { setProfile } from '../../features/user/userSlice';
import { RootState } from '../../store';


function SignUp() {
     const navigate = useNavigate();
     const user = (state: RootState) => state.user;
     const nameRef = useRef<HTMLInputElement>(null);
     const emailRef = useRef<HTMLInputElement>(null);
     const passRef = useRef<HTMLInputElement>(null);
     const pass1Ref = useRef<HTMLInputElement>(null);
     const fotoRef = useRef<HTMLInputElement>(null);
     const dispatch = useDispatch();
     const [pass, setPass] = useState<string>("")
     const [pass1, setPass1] = useState<string>("")
     const [file, setFile] = useState<any>("");
     const [base64String, setBase64String] = useState('');
     const styled = { borderColor: pass == pass1 && pass1 != "" && pass.length > 7 ? "green" : "red" };
     const [emailError, setEmailError] = useState(false);
     let handletNavigator = () => {
          window.location.href = "https://ecommer-react.vercel.app/home"
     };
     const handletSubmit = async function (e: React.FormEvent<HTMLFormElement>) {
          e.preventDefault();

          let url: string = process.env.REACT_APP_URL_SING_UP || "";
          const formData = new FormData();
          const name = nameRef.current?.value || "";
          const email = emailRef.current?.value || "";
          const pass = passRef.current?.value || "";
          const pass1 = pass1Ref.current?.value || "";
          const foto = `data:image/jpeg;base64,${base64String}`;

          formData.append('name', name);
          formData.append('email', email);
          formData.append('pass', pass);
          formData.append('foto', foto);

          const data: any = {
               nombre: name,
               email: email,
               pass: pass,
               pass1: pass1,
               foto
          };
          try {
               await axios.post(url, data);
               await getTokenSave(dispatch, setProfile, formData, handletNavigator)
               setEmailError(false) 
               if (handletNavigator) handletNavigator();

          } catch (err:any) {
               const errorMessage = err.response.data.error[0].msg;
               console.log(errorMessage);
               if(errorMessage == "El usuario ya existe en la DB"){
                    setEmailError(true) 
               }
          }

     }

     // foto
     let handleChangeFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
               setFile(URL.createObjectURL(e.target.files[0]));
               const reader = new FileReader();
               reader.readAsBinaryString(e.target.files[0]);
               reader.onload = () => {
                    if (typeof reader.result === 'string') {
                         const base64 = btoa(reader.result);
                         setBase64String(base64);
                    }
               };
          }
     }
     return (
          <div className="singUp">
               <Link to="/">
                    <i className='bx bxs-chevron-left btnLogin'></i>
               </Link>
               <form method="post" onSubmit={(e) => handletSubmit(e)}>
                    <div className="titleForm">
                         <Lottie animationData={animSignUp} loop={true} className="animationSignUp" />
                         <h3>Registrate</h3>
                    </div>

                    <div className="form__input">
                         <label htmlFor="nombre">Nombre Completo</label>
                         <div className="input">
                              <input type="text" name="nombre" id="nombre" ref={nameRef} required={true} />
                              <i className='bx bxs-user'></i>
                         </div>
                    </div>
                    <div className="form__input">
                         <label htmlFor="email">Email</label>
                         <div className="input">
                              <input type="email" name="email" id="email" ref={emailRef} required={true} />
                              <i className='bx bxs-envelope'></i>
                         </div>
                         {emailError && <p className='form__input__err'>Este email ya esta registrado</p>}
                    </div>
                    <div className="form__input">
                         <label htmlFor="pass">Contraseña</label>
                         <div className="input">
                              <input type="password" name="pass" id="pass" ref={passRef} required={true} onChange={(e) => setPass(e.target.value)} />
                              <i className='bx bxs-key'></i>
                         </div>
                    </div>
                    <div className="form__input">
                         <label htmlFor="pass1">Repite la Contraseña</label>
                         <div className="input" style={styled}>
                              <input type="password" name="pass1" id="pass1" ref={pass1Ref} required={true} onChange={(e) => setPass1(e.target.value)} />
                              <i className='bx bxs-key'></i>
                         </div>
                    </div>
                    <div className="form__input">
                         <label htmlFor="foto">Foto</label>
                         <div className="form__input__foto">
                              <img src={file ? file : "https://objetivoligar.com/wp-content/uploads/2017/03/blank-profile-picture-973460_1280.jpg"} alt="foto" />
                              <div className="form__input__file">
                                   <label htmlFor="foto"><i className='bx bx-upload'></i> subir imagen</label>
                                   <input type="file" name="foto" id='foto' ref={fotoRef} onChange={handleChangeFoto} />
                              </div>
                         </div>
                    </div>
                    <button type='submit'>Ingresar</button>
               </form>

               <svg className="waveSing" style={{ transform: "rotate(0deg)", transition: "0.3s" }} viewBox="0 0 1440 490" version="1.1" xmlns="http://www.w3.org/2000/svg"><defs><linearGradient id="sw-gradient-0" x1="0" x2="0" y1="1" y2="0"><stop stopColor="rgba(0, 0, 0, 1)" offset="0%"></stop><stop stopColor="rgba(54, 80, 208, 1)" offset="100%"></stop></linearGradient></defs><path style={{ transform: "translate(0, 0px)", opacity: "1" }} fill="url(#sw-gradient-0)" d="M0,294L40,285.8C80,278,160,261,240,261.3C320,261,400,278,480,285.8C560,294,640,294,720,269.5C800,245,880,196,960,179.7C1040,163,1120,180,1200,179.7C1280,180,1360,163,1440,163.3C1520,163,1600,180,1680,204.2C1760,229,1840,261,1920,269.5C2000,278,2080,261,2160,245C2240,229,2320,212,2400,236.8C2480,261,2560,327,2640,343C2720,359,2800,327,2880,310.3C2960,294,3040,294,3120,294C3200,294,3280,294,3360,285.8C3440,278,3520,261,3600,220.5C3680,180,3760,114,3840,114.3C3920,114,4000,180,4080,179.7C4160,180,4240,114,4320,81.7C4400,49,4480,49,4560,73.5C4640,98,4720,147,4800,204.2C4880,261,4960,327,5040,294C5120,261,5200,131,5280,122.5C5360,114,5440,229,5520,302.2C5600,376,5680,408,5720,424.7L5760,441L5760,490L5720,490C5680,490,5600,490,5520,490C5440,490,5360,490,5280,490C5200,490,5120,490,5040,490C4960,490,4880,490,4800,490C4720,490,4640,490,4560,490C4480,490,4400,490,4320,490C4240,490,4160,490,4080,490C4000,490,3920,490,3840,490C3760,490,3680,490,3600,490C3520,490,3440,490,3360,490C3280,490,3200,490,3120,490C3040,490,2960,490,2880,490C2800,490,2720,490,2640,490C2560,490,2480,490,2400,490C2320,490,2240,490,2160,490C2080,490,2000,490,1920,490C1840,490,1760,490,1680,490C1600,490,1520,490,1440,490C1360,490,1280,490,1200,490C1120,490,1040,490,960,490C880,490,800,490,720,490C640,490,560,490,480,490C400,490,320,490,240,490C160,490,80,490,40,490L0,490Z"></path></svg>
          </div>
     );
}

export default SignUp;
