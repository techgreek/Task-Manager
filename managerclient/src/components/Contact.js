import React,{useState} from 'react'

import contact_p from './contact_p.png'
function Contact() {
 
    const [info, setinfo] = useState({name:"",email:"",subject:"",description:""})
    const onchange=(e)=>{
        setinfo({...info,[e.target.name]:e.target.value})
    }
    return (
        <section id="contact" >
            <div style={{padding:"30px",backgroundColor:"white",backgroundImage:`url(${contact_p})`,backgroundSize:"cover"}}>  
        <h2 className='text-center my-4'>Contact</h2>      
        <hr style={{height:"4px"}}/>
<div className='App my-5'>
      <div className="card mb-3" style={{backgroundColor:"transparent",maxWidth:"576px",margin:"auto"}}>
      <div className="row g-0">
        
        <div className="col-md-12 query">
          <div style={{border:"3px solid black",borderRadius:"5px"}} className="card-body">
            <h5 className="card-title text-center  headerfam">Contact Me</h5>
           
            <div  className='App'>
            <form action="https://formsubmit.co/sksachin7z2@gmail.com" method="POST">
  <div className="form-group">
    <label className=' my-2 font-weight' htmlFor="name">Name</label>
    <input type="text" className="form-control "  style={{backgroundColor:"white"}} id="name" name="name"  onChange={onchange} aria-describedby="emailHelp"   required/>
   
  </div>
  <div className="form-group">
    <label className=' my-2 font-weight' htmlFor="email">Email address</label>
    <input type="email" className="form-control "  style={{backgroundColor:"white"}} id="email" name="email" onChange={onchange} aria-describedby="emailHelp" required/>
   
  </div>
  <div className="form-group">
  <label className=' my-2 font-weight' htmlFor="subject">Subject</label>
    <input type="text" className="form-control "  style={{backgroundColor:"white"}} id="subject" onChange={onchange} name="subject"   required/>
  </div>
  <div className="form-group">
  <label className=' my-2 font-weight' htmlFor="description">Description</label><br />
    <textarea name="description" style={{backgroundColor:"white"}} id="description" className='form-control' cols="50" rows="10"></textarea>
  </div>
  
  <button type="submit" className="btn btn-primary my-3">Send</button>
</form>
        </div>




           
          </div>
        </div>
      </div>
    </div>

  
           
        </div>
        </div>
        </section>

    )
}

export default Contact
