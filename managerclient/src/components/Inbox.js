import React,{useContext,useEffect} from 'react'
import TasksContext from '../context/tasks/TasksContext';
import Addtask from './Addtask';

import Tasks from './Tasks';
function Inbox() {
    let date=new Date();
    date=date.toDateString()
    
   const context = useContext(TasksContext)
   const {visible,handleaddtask,notes,getNote}=context;
   useEffect(() => {
       
    getNote();
  
 
  
    // eslint-disable-next-line
}, [])
    return (
        <div>
             <div  style={{position:"sticky",top:0,zIndex:2,height:"100vh",width:"75vw",padding:"2rem 2rem 13rem 2rem",overflow:"scroll"}}>
                    <h3>Inbox&emsp;</h3>{date}
                    <hr  />

                    {notes.map((task)=>{
               return <Tasks  key={task._id} task={task}/>
           })}

                {visible &&<Addtask visible={visible} />}
                {!visible&&<div onClick={handleaddtask} className='d-flex'>
                    <div><i className="fa fa-plus"  aria-hidden="true"></i></div>&emsp;
                    <div className='addtask'>
                     Add Task
                     </div>
                </div>}
                
            </div>
        </div>
    )
}

export default Inbox
