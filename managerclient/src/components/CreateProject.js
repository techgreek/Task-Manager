import React,{useContext,useRef,useState,useEffect} from 'react'
import downarrow from './down-arrow.png'
import TasksContext from '../context/tasks/TasksContext';
import { useNavigate } from 'react-router-dom';

import Projects from './Projects'
function CreateProject(props) {
  let navigate=useNavigate();

        useEffect(() => {
          if(localStorage.getItem('token')){
            getProject();
          }
          else{
            navigate('/login')
          }
             // eslint-disable-next-line
        }, [])

        
        const ref5=useRef();
        const refClose5=useRef();
        const ref4=useRef();
        const refClose4=useRef();
        const [pro, setpro] = useState({name:""})
        const [epro, setepro] = useState({id:"",ename:""})
        const handleClick=()=>{
          addProject(pro.name)
          refClose4.current.click();
        }
        const updateProject=(currentpro)=>{
          ref5.current.click();
          setepro({id:currentpro._id,ename:currentpro.name});
        }
        const handleUpdate=()=>{
            editProject(epro.id,epro.ename);
            refClose5.current.click();
        }
    const addrotate=()=>{
        var a=document.getElementById('rotatable');
        if(a.classList.contains('rotate'))
        a.classList.remove('rotate');
        else{
            a.classList.add('rotate')
        }
    }
    const onchange=(e)=>{
        setpro({...pro,[e.target.name]:e.target.value})
    }
    const onechange=(e)=>{
        setepro({...epro,[e.target.name]:e.target.value})
    }
    const handleaddpro1=()=>{
            ref4.current.click();
            
            
    }
    const context = useContext(TasksContext)
    const {project,addProject,getProject,editProject}=context;
    return (
        <div>
            <div  style={{display:"flex"}}>
                
                <a onClick={addrotate} style={{textDecoration:"none",paddingLeft:"2rem"}}   data-bs-toggle="collapse" href="#collapseExample"  aria-expanded="false" aria-controls="collapseExample">
                <img id='rotatable'  src={downarrow} alt="down" width="10%"/>
                 <b> Projects </b>
                </a>
                <div style={{paddingRight:"2rem"}}><i onClick={handleaddpro1} className="fas fa-plus btnp"></i></div>
              </div>
              <div style={{margin:"1rem"}} className="collapse" id="collapseExample">
                <div style={{backgroundColor:"#f4f1f1",border:"none"}} className="card card-body">
                {project.map((proj)=>{
               return <Projects  key={proj._id} project={proj} updateProject={updateProject} />
           })}
                </div>
              </div>
             
        
              

              <button ref={ref4} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#create">
  Launch demo modal
</button>


<div  className="modal" id="create" tabIndex="-1" aria-labelledby="exampleModa" aria-hidden="true">
  <div className="modal-dialog">
    <div  className="modal-content bgquick">
      <div  className="modal-header">
        <h5 className="modal-title" id="exampleModa">Create Project</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div  className="modal-body">
      <form>
  <div className="mb-3">
    <label  htmlFor="name" className="form-label ">Name</label>
    <input type="text" value={pro.name} className="form-control" id="name" name="name" onChange={onchange}/>
    
  </div>
  
  
  
</form>
      </div>
      <div  className="modal-footer">
        <button ref={refClose4} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button disabled={pro.name.length<2}type="button" className="btn btn-primary"  onClick={handleClick}>Create</button>
      </div>
    </div>
  </div>
</div>
    

            {/* update project */}


            <button ref={ref5} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#update">
  Launch demo modal
</button>

<div  className="modal" id="update" tabIndex="-1" aria-labelledby="exampleModalL" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content bgquick">
      <div  className="modal-header">
        <h5 className="modal-title" id="exampleModalL">Update Project</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div  className="modal-body">
      <form>
  <div className="mb-3">
    <label  htmlFor="ename" className="form-label ">Name</label>
    <input type="text" value={epro.ename} className="form-control" id="ename" name="ename" onChange={onechange}/>
    
  </div>
  
  
  
</form>
      </div>
      <div  className="modal-footer">
        <button ref={refClose5} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button disabled={epro.ename.length<2}type="button" className="btn btn-primary"  onClick={handleUpdate}>Update</button>
      </div>
    </div>
  </div>
</div>

</div>     
        
    )
}

export default CreateProject
