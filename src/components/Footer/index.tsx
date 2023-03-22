import './style.css';

function Footer() {
     return (
          <footer>
               <div className="box">
                    <h3>E-COMMER</h3>
                    <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Consequatur doloremque</p>
                    <div className="links">
                         <a href="">Productos</a>
                         <a href="">Terminos</a>
                         <a href="">Mas</a>
                    </div>
               </div>
               <div className="box">
                    <h4>Consigue Ayuda</h4>
                    <div className="box_a">
                         <a href="" >Contactanos</a>
                         <a href="" >Servicio Cliente</a>
                    </div>
               </div>
               <div className="contact">
                    <i className='bx bxl-facebook-circle'></i>
                    <i className='bx bxl-twitter'></i>
                    <i className='bx bxl-instagram'></i>
                    <i className='bx bxl-youtube'></i>
               </div>
          </footer>
     );
}

export default Footer;