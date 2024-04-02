import React from 'react'
import about_p from './about_p.png'
function About() {
    return (
        <section id="about">
        <div style={{padding:"30px",backgroundColor:"white"}}>
           <h2 className='text-center py-4'>About Us</h2>
           <hr className='hr' style={{height:"4px"}}/>
           <div className=' flexCenter'>
               <div className="row" style={{width:"70rem"}}>
                   <div className="col-md-5">
                    <img src={about_p} alt="" width="100%"/>
                   </div>
                   <div className="col-md-7">
                   <div className="container"><p style={{fontSize:"x-large"}}><i className="fas fa-hand-point-right"></i> Quick Add help you to manage and organize your daily and upcoming task</p>
          
            <p style={{fontSize:"x-large"}}> <i className="fas fa-hand-point-right"></i>   In this busy world we think of various things and build determination of achieving our daily goals but couldn't set a  deadline for that, so Quick Add helps to schedule tasks and complete on due time</p>
            <p style={{fontSize:"x-large"}}> <i className="fas fa-hand-point-right"></i>  The inspiration for this website is <strong> <a href="https://todoist.com/" target="_blank" rel="noopener noreferrer">Todoist </a></strong>. Tried to replicate some features from it and come up with this site.</p> </div>
                   </div>
               </div>
            
           </div>
        </div>
        </section>
    )
}

export default About
