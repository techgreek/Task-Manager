import React,{useContext} from 'react'
import TasksContext from '../context/tasks/TasksContext'
function Projects(props) {
  const context = useContext(TasksContext);
  const {deleteProject,getNote}=context;
 
    return (
        <div  className='hover-cursor'>
            <div onClick={()=>{
              localStorage.removeItem("projectId");
                                localStorage.setItem("projectId",props.project._id);
                                getNote();
                               localStorage.setItem("projectname",props.project.name)}} className="card" >
  <div className="card-body">
    <h5 className="card-title">{props.project.name}</h5>
   
    <i onClick={async()=>{ localStorage.setItem("projectId",props.project._id);
      await deleteProject(props.project._id);
                              localStorage.setItem("projectname","Inbox");
                             localStorage.setItem("projectId","61d1719194c87b7ff0486240");
                             getNote();}} className="fas fa-trash"></i>
    <i onClick={()=>{props.updateProject(props.project)}} className="fas fa-edit mx-3"></i>
   
  </div>
</div>
<hr />
        </div>
    )
}

export default Projects
