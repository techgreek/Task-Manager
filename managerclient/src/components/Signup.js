import React,{useState} from 'react'
import {useNavigate,Link} from 'react-router-dom'
import Navbar from './Navbar';
import Alert from './Alert';
import Footer from './Footer'
const Signup = (props)=> {
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""})
    
        let navigate=useNavigate();
        const[alert,setAlert]=useState(null);
    const host=props.host;
    const handleSubmit=async(e)=>{
        e.preventDefault();
        
        localStorage.removeItem("token");
        

        const {name,email,password,cpassword}=credentials
        if(password===cpassword){
        const response = await fetch(`${host}/api/auth/createUser`, {
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
           
            headers: {
              'Content-Type': 'application/json'
             
            },
            body: JSON.stringify({name:name,email:email,password:password})
            
          });
          const json =await response.json(); 
        
          if(json.success)
          {
              localStorage.setItem('token',json.authToken);
            
              navigate('/user');
             
          }
          else{
             showAlert("Email already exist or format is wrong","danger");
           
          }
        }
        else{
            showAlert("password didnot match","danger");
           
        }
    }
    const onchange=(e)=>{
        setcredentials({...credentials,[e.target.name]:e.target.value})
    }
    const showAlert=(message,type)=>{
      setAlert({
        msg:message,
        type:type
      })
      setTimeout(()=>{
        setAlert(null)
      },2000);
    }
    return (
      <>
      <Navbar/>
      <Alert alert={alert}/>
        <div className="app1">
          <h2 className='text-center my-3'>Create your Account</h2>
         
            <form onSubmit={handleSubmit}>
  <div className="form-group">
    <label className='my-2 bold' htmlFor="name">Name</label>
    <input type="text" className="form-control" id="name" name="name"  onChange={onchange} aria-describedby="emailHelp" minLength={3}  required/>
   
  </div>
  <div className="form-group">
    <label className='my-2 bold' htmlFor="email">Email address</label>
    <input type="email" className="form-control" id="email" name="email" onChange={onchange} aria-describedby="emailHelp" required/>
   
  </div>
  <div className="form-group">
    <label className='my-2 bold' htmlFor="password">Password</label>
    <input type="password" className="form-control" id="password" onChange={onchange} name="password"  minLength={5} required/>
  </div>
  <div className="form-group">
    <label className='my-2 bold' htmlFor="password">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword"  onChange={onchange} name="cpassword"  minLength={5} required/>
  </div>
  <div className='bold'>Already have an Account ? <Link to="/login"> <strong> Login</strong></Link></div>
  <button type="submit" className="btn btn-primary my-3">Signup</button>
</form>
        </div>
      <Footer/>
        </>
    )
}

export default Signup
