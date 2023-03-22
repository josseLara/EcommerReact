import axios from "axios";


export function getTokenSave(dispatch: any, setProfile: any,formData?: FormData) {

     let email =formData ? formData.get('email'): "";
     let pass = formData ? formData.get('pass'): "";
     let token = localStorage.getItem('token')

     if (!token) {

          let url: string = process.env.REACT_APP_URL_LOGIN || "";
          try{
          axios.post(url, { email, pass })
               .then(response => {
                    localStorage.setItem('token', response.data.token)

               })
               .catch(error => {
                    console.error(error);
               });
               
          }catch(err){
               console.log('URL del login error para obtener el token')
          }
     } else {
          let urlVerf: string = process.env.REACT_APP_URL_TOKENVERF || "";
          try{

          axios.post(urlVerf, { email, pass, token })
               .then(response => {
                    console.log('tiene token pueede pasar', response.data)
                    dispatch(setProfile({
                         name: response.data.name,
                         email: response.data.email,
                         imageUrl: response.data.img,
                         change: true
                    }))
                    return response.data;
                    //     cambiar de ruta a home
                    // window.location.href = `${process.env.REACT_APP_URL}`

               })
               .catch(error => {
                    
                    console.error('error en verfificar el usuario con el token',error);
               });
          }catch(err){
               console.log('error en la verfifcacion con el token')
          }
     }


}