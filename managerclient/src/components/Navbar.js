import React from 'react'
import {Link,useNavigate} from 'react-router-dom';
import {HashLink} from 'react-router-hash-link'
// import noteContext from '../context/notes/NoteContext';

function Navbar() {
    let navigate=useNavigate();
    return (
        <div>
                <nav style={{backgroundColor:"rgb(200 28 57)"}} className="navbar navbar-expand-lg navbar-dark ">
  <div className="container-fluid">
    <Link  className="navbar-brand headerfam" to="/">Quick Add</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link  className="nav-link active" aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <HashLink  className="nav-link active" to="/#about">About</HashLink>
        </li>
        <li className="nav-item">
          <HashLink  className="nav-link active"to="/#contact">Contact</HashLink>
        </li>
       
       
       
      </ul>
    
     {(!localStorage.getItem("token"))? <form className="d-flex">
      <Link  className="btn btn-primary mx-1" to="/login" role="button">Login</Link>
      <Link   className="btn btn-primary mx-1" to="/signup" role="button">SignUp</Link>
      </form>:<button onClick={()=>{navigate('/user')}} className='btn btn-primary'>Dashboard</button>}
              
    </div>
  </div>
 
</nav>
        </div>
    )
}

export default Navbar
