import React,{useState} from "react";
import noteContext from "./TasksContext";

const NoteState=(props)=>{
    const host="https://task-manager-xbw3.onrender.com";
    // const host="http://localhost:5000";
   const notesInitial=[
   
  ]
    const [loading, setLoading] = useState(false);
    const [visible, setvisible] = useState(false);
    const [proname, setproname] = useState("");
  const [progress, setProgress] = useState(0);
  const [IsMounted, setIsMounted] = useState(true);
  const [dp1, setDp] = useState([]);

const [notes, setNotes] = useState(notesInitial);

const [project, setProject] = useState(notesInitial);


const getNote=async()=>{
 
   
  setLoading(true);
    setIsMounted(true)
  const response = await fetch(`${host}/api/task/fetchalltasks`, {
     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    
     headers: {
       'Content-Type': 'application/json',
       "auth-token":localStorage.getItem('token'),
      'projectId':localStorage.getItem('projectId')
      
     }
    
     
   });
 //   const json =response.json(); 
     const json =await response.json()
    // console.log(json);
    if (IsMounted) setNotes(json)
    
    setLoading(false);
 }
 const evamount=()=>{
   setIsMounted(false);
 }
const getScheduleNote=async()=>{
  //api call
   
  setProgress(10);
  const response = await fetch(`${host}/api/task/fetchallduetasks`, {
     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    
     headers: {
       'Content-Type': 'application/json',
       "auth-token":localStorage.getItem('token'),
      'schedule':localStorage.getItem('schedule'),
      
     }
    
     
   });
   setProgress(50);
 //   const json =response.json(); 
     const json =await response.json()
     setProgress(100);
    // console.log(json);
    setNotes(json)
    
    // setLoading(false);
 }

const getScheduleNoteweek=async()=>{
  //api call
   
  // setLoading(true);
  setProgress(10);
  const response = await fetch(`${host}/api/task/fetchallduetasksweek`, {
     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    
     headers: {
       'Content-Type': 'application/json',
       "auth-token":localStorage.getItem('token')
      
      
     }
    
     
   });
   setProgress(50);

     const json =await response.json()

     setProgress(100);
    setNotes(json)
    
    // setLoading(false);
 }

//Add a note
const addNote=async(title,description)=>{
 //api call
 setProgress(10);
//  setLoading(true);
 const response = await fetch(`${host}/api/task/addtask`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
      'projectId':localStorage.getItem('projectId'),
      'schedule':localStorage.getItem('schedule'),
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({title,description})
    
  });
  setProgress(50);
  const json = await response.json(); 

  setProgress(100);
  setNotes(notes.concat(json))
  // setLoading(false);
}

//delete a note
const deleteNote=async(id)=>{
  setProgress(10);
  setLoading(true);
    const response = await fetch(`${host}/api/task/deletetask/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
     
      headers: {
        'Content-Type': 'application/json',
        
      }
    });
    setProgress(50);
    const json =await response.json(); 
    setProgress(100);
    console.log(json)
    const newNotes= notes.filter((note)=>{return note._id!==id});
    setNotes(newNotes);
    setLoading(false);
}
//Edit a Note
const editNote=async(id,title,description)=>{
    //api call
    setProgress(10);
    // setLoading(true);
    const response = await fetch(`${host}/api/task/updatetask/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
       
        headers: {
          'Content-Type': 'application/json',
         
          'projectId':localStorage.getItem('projectId'),
         
      'schedule':localStorage.getItem('schedule')
            
        },
       
        body: JSON.stringify({title,description})
      });
      setProgress(50);
      const json =await response.json(); 
      setProgress(100);
      console.log(json);

        let newNotes=JSON.parse(JSON.stringify(notes))
    //logic to edit
    for (let index = 0; index < newNotes.length; index++) {
        const element = newNotes[index];
        if(element._id===id)
        {
          newNotes[index].title=title;
          newNotes[index].description=description;
          newNotes[index].schedule= localStorage.getItem('schedule');
          
          
          break;
        }
       
    }
      setNotes(newNotes)
      // setLoading(false);
}

const deleteUser=async(id)=>{
  setProgress(10);
  const response = await fetch(`${host}/api/notes/fetchallnotes`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    }
   
    
  });
 let json =await response.json();
  json=JSON.stringify(json);
  setProgress(50);
 if(json!=='[]'){
  const response1 = await fetch(`${host}/api/notes/deleteallnote`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token'),
      'projectId':localStorage.getItem('projectId')
    }
  });
  const json1 =await response1.json(); 
  console.log(json1);
}
setProgress(70);
  const response2 = await fetch(`${host}/api/auth/deleteuser/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    }
  });
  const json2 =await response2.json(); 
  console.log(json2);
 
  setProgress(100);
}
const handleaddtask=()=>{
    setvisible(true);
}
const handlesubmittask=(title,description)=>{
    setvisible(false);
    addNote(title,description)
}
const handlesubmitproject=(name)=>{
    setvisible(false);
    addProject(name)
}
const fetchtaskstate=()=>{
  setNotes(notes);
}
//project states

const getProject=async()=>{
  //api call
   
  // setLoading(true);
  const response = await fetch(`${host}/api/project/fetchallproject`, {
     method: 'GET', // *GET, POST, PUT, DELETE, etc.
    
     headers: {
       'Content-Type': 'application/json',
       "auth-token":localStorage.getItem('token')
      
     }
    
     
   });

     const json =await response.json()
   
    setProject(json)
    
    // setLoading(false);
 }

//Add a note
const addProject=async(name)=>{
 //api call
 setproname(name);
 setProgress(10);
//  setLoading(true);
 const response = await fetch(`${host}/api/project/addproject`, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
      
      "auth-token":localStorage.getItem('token')
    },
    body: JSON.stringify({name})
    
  });
  setProgress(50);
  const json = await response.json(); 
  setProgress(100);

  setProject(project.concat(json))
  // setLoading(false);
}


//Edit a Note
const editProject=async(id,name)=>{
    //api call
    setProgress(10);
    setproname(name);
    // setLoading(true);
    const response = await fetch(`${host}/api/project/updateproject/${id}`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
       
        headers: {
          'Content-Type': 'application/json',
          "auth-token":localStorage.getItem('token')
          
        },
       
        body: JSON.stringify({name})
      });
      setProgress(50);
      const json =await response.json(); 
      console.log(json);
      setProgress(100);
        let newProject=JSON.parse(JSON.stringify(project))
    //logic to edit
    for (let index = 0; index < newProject.length; index++) {
        const element = newProject[index];
        if(element._id===id)
        {
          newProject[index].name=name;
          
          break;
        }
       
    }
      setProject(newProject)
      // setLoading(false);
}

const deleteProject=async(id)=>{
  setLoading(true);
  setProgress(10);
  const response = await fetch(`${host}/api/task/fetchalltasks`, {
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token'),
      'projectId':localStorage.getItem('projectId')
    }
   
    
  });
 let json =await response.json();
  json=JSON.stringify(json);
  setProgress(50);
 if(json!=='[]'){
  const response1 = await fetch(`${host}/api/task/deletealltasks`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
     
      'projectId':localStorage.getItem('projectId')
    }
  });
  const json1 =await response1.json(); 
  
    setNotes(notesInitial);
  console.log(json1);
}
setProgress(70);
  const response2 = await fetch(`${host}/api/project/deleteproject/${id}`, {
    method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
   
    headers: {
      'Content-Type': 'application/json',
      "auth-token":localStorage.getItem('token')
    }
  });
  const json2 =await response2.json(); 
  console.log(json2);
  const newProjects= project.filter((pro)=>{return pro._id!==id});
    setProject(newProjects);
    
  setProgress(100);
  setLoading(false);
}
const handlecancel=()=>{
  setvisible(false);
}
//media 
const addMedia=async(selectedpic)=>{
  //api call
  
  let media=selectedpic;

  if(JSON.stringify(selectedpic).slice(0,23).includes('png') ||JSON.stringify(selectedpic).slice(0,23).includes('jpg')||JSON.stringify(selectedpic).slice(0,23).includes('jpeg')||JSON.stringify(selectedpic).slice(0,23).includes('gif')){
  setLoading(true);
  const response = await fetch(`${host}/api/media/addmedia`, {
     method: 'POST', // *GET, POST, PUT, DELETE, etc.
    
     headers: {
       'Content-Type': 'application/json',
     
       "auth-token":localStorage.getItem('token')
     },
     body: JSON.stringify({media})
     
   });
 
   const json = await response.json(); 
 
 setDp(dp1.concat(json));
 console.log(json);
 setLoading(false);
  }
  else
  alert("Please select .jpg, .jpeg, .png or .gif");
 }
 const getdp=async()=>{
  setLoading(true);
  
const response = await fetch(`${host}/api/media/getmedia`, {
   method: 'GET', // *GET, POST, PUT, DELETE, etc.
  
   headers: {
     'Content-Type': 'application/json',
     "auth-token":localStorage.getItem('token'),
   
    
   }
  
   
 });

   const json =await response.json()
  
  setDp(json);
  
  setLoading(false);
 }
 const deletemedia=async(id)=>{
   
  setLoading(true);
    const response = await fetch(`${host}/api/media/deletemedia/${id}`, {
      method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
     
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
       
      }
    });
    const json =await response.json(); 
    console.log(json)
    
    setDp([]);
    setLoading(false);
}
const updatemedia=async(id,selectedpic)=>{
  //api call
 

  if(JSON.stringify(selectedpic).slice(0,23).includes('png') ||JSON.stringify(selectedpic).slice(0,23).includes('jpg')||JSON.stringify(selectedpic).slice(0,23).includes('jpeg')||JSON.stringify(selectedpic).slice(0,23).includes('gif')){
  setLoading(true);
  const response = await fetch(`${host}/api/media/updatemedia/${id}`, {
      method: 'PUT', // *GET, POST, PUT, DELETE, etc.
     
      headers: {
        'Content-Type': 'application/json',
        "auth-token":localStorage.getItem('token')
       
      },
     
      body: JSON.stringify({selectedpic})
    });
    const json =await response.json(); 
    console.log(json);

      let newMedia=JSON.parse(JSON.stringify(dp1))
  //logic to edit
  for (let index = 0; index < newMedia.length; index++) {
      const element = newMedia[index];
      if(element._id===id)
      {
        newMedia[index].selectedpic=selectedpic;
        
        break;
      }
     
  }
    setDp(newMedia)
    setLoading(false);
}
else{
  alert("Please select .jpg, .jpeg, .png or .gif");
}
}

const handlec=()=>{
  setvisible(false);
}
    
    return (
        <noteContext.Provider value={{updatemedia,deletemedia,dp1,getdp,handlec,evamount,project,proname,notes,addMedia,getScheduleNoteweek,handlecancel,addNote,getNote,getScheduleNote,deleteNote,editNote,deleteUser,getProject,addProject,editProject,deleteProject,loading,progress,visible,handleaddtask,handlesubmittask,handlesubmitproject,fetchtaskstate,setNotes,setProgress}}>
            {props.children}
        </noteContext.Provider>
    )
}

export default NoteState;
