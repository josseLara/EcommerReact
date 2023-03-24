import axios from "axios";



export function getTokenSave(dispatch: any, setProfile: any,formData?: FormData,handletNavigator ?:Function,handleIncorrect ?:Function) {

     let email =formData ? formData.get('email'): "";
     let pass = formData ? formData.get('pass'): "";
     let token = localStorage.getItem('token')

     if (!token) {

          let url: string = process.env.REACT_APP_URL_LOGIN || "";
          try{
          axios.post(url, { email, pass })
               .then(response => {
                    localStorage.setItem('token', response.data.token)
                    new Promise((resolve:any) => setTimeout(resolve, 500))
                    .then(() => {
                      if(handletNavigator) handletNavigator();
                    });
               })
               .catch(error => {
                    if(handleIncorrect)handleIncorrect()
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
                   
                    location.href = "https://ecommer-react.vercel.app/home"
                  
                    // return response.data;

               })
               .catch(error => {
                    if(error.response.data == 'El token ha expirado'){
                         localStorage.removeItem("token");
                    }
                    console.error('error en verificar el usuario con el token',error);
               });
          }catch(err){
               console.log('error en la verfifcacion con el token')
          }
     }


}