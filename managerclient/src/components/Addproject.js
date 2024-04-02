import React,{useContext,useRef,useState,useEffect} from 'react'
import downarrow from './down-arrow.png'
import TasksContext from '../context/tasks/TasksContext';
import { useNavigate } from 'react-router-dom';


import Projects from './Projects'

function Addproject(props) {
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

        
        const ref2=useRef();
        const refClose2=useRef();
        const ref1=useRef();
        const refClose1=useRef();
        const [pro, setpro] = useState({name:""})
        const [epro, setepro] = useState({id:"",ename:""})
        const handleClick=()=>{
          addProject(pro.name)
          refClose1.current.click();
        }
        const updateProject=(currentpro)=>{
          ref2.current.click();
          setepro({id:currentpro._id,ename:currentpro.name});
        }
        const handleUpdate=async()=>{
          await  editProject(epro.id,epro.ename);
            refClose2.current.click();
        }
    const addrotate=()=>{
        var a=document.getElementById('rotatable1');
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
    const handleaddpro=()=>{
            ref1.current.click();

    }
    const context = useContext(TasksContext)
    const {project,addProject,getProject,editProject}=context;
    return (
        <div>
            <div  style={{display:"flex"}}>
                
                <a onClick={addrotate} style={{textDecoration:"none",paddingLeft:"2rem"}}   data-bs-toggle="collapse" href="#collapseExample"  aria-expanded="false" aria-controls="collapseExample">
                <img id='rotatable1'  src={downarrow} alt="down" width="10%"/>
                 <b> Projects </b>
                </a>
                <div style={{paddingRight:"2rem"}}><i onClick={handleaddpro} className="fas fa-plus btnp"></i></div>
              </div>
              <div style={{margin:"1rem"}} className="collapse" id="collapseExample">
                <div style={{backgroundColor:"#f4f1f1",border:"none"}} className="card card-body">
                {project.map((proj)=>{
               return <Projects  key={proj._id} project={proj} updateProject={updateProject} />
           })}
                </div>
              </div>
              

              <button ref={ref1} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#createProject">
  Launch demo modal
</button>


<div  className="modal fade" id="createProject" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content bgquick">
      <div  className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Create Project</h5>
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
        <button ref={refClose1} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button disabled={pro.name.length<1}type="button" className="btn btn-primary"  onClick={handleClick}>Create</button>
      </div>
    </div>
  </div>
</div>
            

            {/* update project */}


            <button ref={ref2} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#updateProject">
  Launch demo modal
</button>


<div  className="modal fade" id="updateProject" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content bgquick">
      <div  className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Update Project</h5>
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
        <button ref={refClose2} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button disabled={epro.ename.length<1}type="button" className="btn btn-primary"  onClick={handleUpdate}>Update</button>
      </div>
    </div>
  </div>
</div>

               
        </div>
    )
}

export default Addproject
