import React,{useContext} from 'react'
import TasksContext from '../context/tasks/TasksContext'

function Tasks(props) {
  const context = useContext(TasksContext);
  const {deleteNote}=context;

var getdate=()=>{
  var date=props.task.schedule;
  var date1;
  if(date!==""){
   date1= date;
  }
 else
 date1="No due date"
return date1;
}

    return (
      <>
        <div >
            <div className="card" >
  <div className="card-body">
    <h5 className="card-title">{props.task.title}</h5>
   
    <p className="card-text">{props.task.description}</p>
   
    
    <i onClick={()=>{deleteNote(props.task._id)}} className="far fa-check-circle"></i>
    <i onClick={()=>{props.updateNote(props.task)}} className="fas fa-edit mx-3"></i>
    <span className="badge bg-success  m-3">{getdate()}</span>
   
      </div>
</div>
<hr />
        </div>
  
      </>
    )
}

export default Tasks
