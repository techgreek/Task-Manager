import React from 'react'
import loading from './loading.gif'
function Spinner() {
  return (
    <div className='flexCenter' style={{backgroundColor:"rgb(0,0,0,0.5)",height:"100vh",width:"100vw",position:"fixed",top:"0",zIndex:"1000"}}>

    <div  style={{width:"50px"}}>
        <img src={loading} alt="" width="100%" />
    </div>

    </div>
  )
}

export default Spinner