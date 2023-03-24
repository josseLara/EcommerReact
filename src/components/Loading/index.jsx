import './style.css'
import Lottie from 'lottie-react';
import loadingAnim from '../../resouces/loading.json'

function Loading() {
     return ( 
          <div className='loading'>
               <Lottie animationData={loadingAnim} className="loadingAnim" />
          </div>
      );
}

export default Loading;