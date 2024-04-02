import React, { useContext, useState } from "react";
import TasksContext from "../context/tasks/TasksContext";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
function Addtask(props) {
  const [value, onChange1] = useState(new Date());
  

  const context = useContext(TasksContext);
  const { handlesubmittask,handlecancel } = context;

  const [task, settask] = useState({
    title: "",
    description: "",
    selectedproject: "",
  });
  
  const onchange = (e) => {
    settask({ ...task, [e.target.name]: e.target.value });
  };
  return (
    <>
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <input
          type="text"
          className="form-control"
          value={task.title}
          id="title"
          name="title"
          placeholder="title"
          onChange={onchange}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="description" className="form-label">
          Description
        </label>
        <textarea
          className="form-control"
          value={task.description}
          id="description"
          name="description"
          rows="3"
          onChange={onchange}
        ></textarea>
      </div>
      {localStorage.getItem('projectname')!=="Today"&&<span
        onClick={() => {
          
         
          document.getElementById("calenderr").classList.remove("dipnone");
        }}
        className="badge bg-primary hover-cursor"
      >
        Schedule
      </span>}

      <button
        style={{
          border: "2px solid red",
          fontWeight: "bold",
          marginLeft: "1.5rem",
          backgroundColor: "#dc3545",
          borderRadius: "9px",
          padding: "3px",
          color:"white"
        }}
        disabled={task.title.length<1}
        className="hover-cursor"
        onClick={() => {
          if(localStorage.getItem('schedule')==="")
          localStorage.setItem('schedule',"");
          else
          localStorage.setItem("schedule", value.toDateString());
          handlesubmittask(task.title, task.description);
          settask({ title: "", description: "" });
          localStorage.setItem("schedule",new Date().toDateString());
          
        }}
      >
        Add Task
      </button>
     {!props.quick && <button
        style={{
          border: "none",
          fontWeight: "bolder",
          marginLeft: "1.5rem",
          backgroundColor: "antiquewhite",
          borderRadius: "9px",
          padding: "3px",
        }}
        
        className="hover-cursor"
        onClick={
            handlecancel
        }
      >
        Cancel
      </button>}

      <div 
        className="calendar dipnone"
        id="calenderr"
        
        
      >
        <span
          onClick={() => {
            
            localStorage.setItem("schedule", "");
            document.getElementById("calenderr").classList.add("dipnone");
          }}
          className="badge bg-success hover-cursor m-3"
        >
          No due date
        </span>
        <span className="hover-cursor p-3" style={{color:"black",position:"relative",left:"7em",fontWeight:"bold"}} onClick={() => {
             
             document.getElementById("calenderr").classList.add("dipnone");
           }}>X</span>
        <div
          
        >
          <Calendar onChange={onChange1} value={value} />
        </div>
      </div>
    </>
  );
}

export default Addtask;
