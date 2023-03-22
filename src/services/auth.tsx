import axios from "axios";


export function getTokenSave(dispatch: any, setProfile: any,formData?: FormData) {

     let email =formData ? formData.get('email'): "";
     let pass = formData ? formData.get('pass'): "";
     let token = localStorage.getItem('token')

     if (!token) {

          let url: string = process.env.REACT_APP_URL_LOGIN || "";
          axios.post(url, { email, pass })
               .then(response => {
                    console.log(response.data);
                    localStorage.setItem('token', response.data.token)

               })
               .catch(error => {
                    console.error(error);


               });
     } else {
          let urlVerf: string = process.env.REACT_APP_URL_TOKENVERF || "";

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
                    localStorage.removeItem ("token");
                    console.error(error);
               });
     }


}