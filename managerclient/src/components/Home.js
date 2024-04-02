import React from 'react'
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom';
import About from './About'
import Contact from './Contact'
import mainp from './mainp.png'
import Footer from './Footer';
function Home() {
  let navigate=useNavigate();

    return (
        <>
        <Navbar/>

                <div className='home_p'>
            <div className='row g-0' style={{maxwidth:"1100px",width:"70rem"}}>
              <div className='col-md-7 text-center'><img className='mainp' src={mainp} alt=""width="100%" /></div>
          
              
              <div className='col-md-5 text-centerpt'><div className='labelp'>Free up your mental space with</div><h1 style={{paddingBottom:"9px",fontSize:"xxx-large"}}>Quick Add</h1><h2> Your Own Reliable <br/> Task and Project Manager</h2> 
           <button onClick={()=>{navigate('/signup')}} className='btn btn-primary my-3'>Get Started</button>
           </div>
           </div>
        </div>
       
        <About/>
       

        <Contact/>
        <Footer/>
        </>
    )
}

export default Home
