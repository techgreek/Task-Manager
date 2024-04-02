import React,{useContext,useEffect,useRef,useState} from 'react'
import inbox from './inbox.png'
import calender from './calendar.png'
import upcoming from './upcoming.png'
import home from './home.png'
import Addtask from './Addtask';
import FileBase from 'react-file-base64';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import TasksContext from '../context/tasks/TasksContext';
import Tasks from './Tasks';
import {Link} from 'react-router-dom'
import Addproject from './Addproject'
import Dp from './Dp'
import CreateProject from './CreateProject'
import {useNavigate} from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'
import dash from './dash.png'
import Dpp from './Dpp'
import Spinner from './Spinner'
function Userdashboard() {
 
  let navigate=useNavigate()
  
  const [value, onChange1] = useState(new Date());
  const [quick, setQuick] = useState(false);
       const gettoday=()=>{
         var date=new Date().toDateString();
         return date;
         
       }
       function getBackToDescription() { window.scrollTo({
        top: 0,
        left: 0, behavior: 'smooth'
        });        }
      
        let date=new Date();
            date=date.toDateString()
            const ref=useRef(null)
            const refquick=useRef(null)
           
            const [dp, setDp] = useState("");
    const refClose=useRef(null)
    const [note, setnote] = useState({id:"",etitle:"",edescription:""})
           const context = useContext(TasksContext)
           const {updatemedia,deletemedia,dp1,getdp,addMedia,handlec,visible,handleaddtask,notes,getNote,editNote,getScheduleNote,getScheduleNoteweek,loading,setNotes,progress,setProgress}=context;
          
  
    const onchange=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
    }
    const updateNote=(currentnote)=>{
        ref.current.click()
        setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description})
        
    }
    const handleClick=async()=>{
      if(localStorage.getItem('schedule')==="")
      localStorage.setItem('schedule',"");
      else
      localStorage.setItem("schedule", value.toDateString());
       

       await editNote(note.id,note.etitle,note.edescription);
        if(localStorage.getItem('projectname')==="Today"){
       localStorage.setItem("schedule", new Date().toDateString());
       getScheduleNote();}
        refClose.current.click()                                         
        
      }
     
      
    useEffect(() => {
      getBackToDescription();
     
      document.body.style.overflow="hidden";
      
        if(localStorage.getItem('token')){
          localStorage.setItem("projectname","Inbox");
          localStorage.setItem("projectId","61d1719194c87b7ff0486240");
          getNote();
            getdp();
        }
        else{
          navigate("/login")
        }
        return () => {
          setNotes([]);
          document.body.style.overflowY="scroll";
        }
        
        
          // eslint-disable-next-line
      }, [])
    
    return (
      <>{loading && <Spinner/>}
        <div>
        <LoadingBar
        color='white'
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
            <div className="sidebar">
            
            <div  style={{padding:"3px",borderRadius:"0.3rem",backgroundColor:"#ed8076",position:"absolute",top:"0.45rem",left:"1rem",zIndex:900}}   data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
            <svg className="menu_icon" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" fillRule="evenodd" d="M4.5 5h15a.5.5 0 1 1 0 1h-15a.5.5 0 0 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1zm0 6h15a.5.5 0 1 1 0 1h-15a.5.5 0 1 1 0-1z"></path></svg>
</div>

<div  style={{zIndex:1055,width:"300px"}} className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
  <div className="offcanvas-header">
    <h5 className="offcanvas-title  headerfam" id="offcanvasExampleLabel">Quick Add</h5>
    <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
  </div>
  <div className="offcanvas-body">
    <div>
    <div style={{height:"100vh",width:"264px",backgroundColor:"#f4f1f1"}}>
            <div style={{display:"flex",flexDirection:"column",padding:"2rem"}}>
                   <div className='d-flex my-2'> <div><img src={inbox} alt="inbox" /></div>&emsp;
                   <div onClick={()=>{localStorage.setItem("projectId","61d1719194c87b7ff0486240");
                                        getNote();
                                       localStorage.setItem("projectname","Inbox")}}  style={{fontWeight:"bold",marginTop:"auto"}} className='addtask'>
                     Inbox
                     </div></div>
                  
                     <div className="d-flex my-2">
                    <div><img src={calender} alt="calender" /></div>&emsp;
                    <div onClick={()=>{
                      localStorage.setItem("projectname","Today")
                      localStorage.setItem("schedule",gettoday());
                      getScheduleNote();
                      localStorage.setItem("projectId","61d1719194c87b7ff0486240");
 
                            // getNote();

                    }}   style={{fontWeight:"bold",marginTop:"auto"}} className='addtask'>
                    Today
                     </div></div>
                    <div className="d-flex my-2"><div><img src={upcoming} alt="upcoming" /></div>&emsp;
                    <div onClick={()=>{ getScheduleNoteweek();
                      localStorage.setItem("projectname","In a Week")
                    }} style={{fontWeight:"bold",marginTop:"auto"}} className='addtask'>
                    In a Week
                     </div></div>
                    
                </div>
                <CreateProject campusId={"offcanvasExample"}/>

            </div>
    </div>
    
  </div>
  
</div>

            </div>
              
            <nav  style={{display:"flex",alignItems:"center",position:"sticky",top:"0px",zIndex:100,height:"44px",backgroundColor:"#db4c3f"}}>
              
            <div style={{position:"relative",left:"5em"}}><Link  to="/"><img  src={home} alt="home" width="24px" /></Link></div>
          
            <div onClick={()=>{document.getElementById("ep").style.display="flex"}} style={{position:"absolute",right:"13.5em",height:"34px",overflow:"hidden",borderRadius:"26rem"}} id="profile" className='dp' >
                  {JSON.stringify(dp1)!=="[]"?dp1.map((dp)=>{
                     
                    

                   return <Dp key={dp._id} image={dp.selectedpic} small={true}/>

                  }):<Dpp/>}
                  
                 
            </div>
           
            
           <div id="ep" className='editprofile' >
             <h6 className='labelava' onClick={()=>{ 
               const curfile=document.getElementById('fileo').files;
              console.log(curfile)
              const image = document.createElement('img');
                  var binaryData = [];
                  binaryData.push(curfile);
image.src=window.webkitURL.createObjectURL(curfile[0])
image.style.width="10%";
console.log(window.webkitURL.createObjectURL(curfile[0]))

   
        document.getElementById('ep').appendChild(image);
}}>Change Avatar</h6>
          <div style={{display:"flex",alignItems:"center",width:"7em"}}>
            <h5 style={{position:"relative",right:"-19rem",cursor:"pointer",top:"-4rem"}} onClick={()=>{document.getElementById("ep").style.display="none"}}>X</h5>
            {JSON.stringify(dp1)!=="[]"?dp1.map((dp)=>{
                     
                     
 
                    return <Dp key={dp._id} image={dp.selectedpic}/>
 
                   }):<Dpp/>}</div>
                   <div style={{display:"flex",flexDirection:"column",marginLeft:"2em",width:"172px"}}>
              <FileBase type="file" id="fileupload"  multiple={false} onDone={( base64 ) => setDp(base64.base64)} />
          
             <br />
              <div>
                
                               {JSON.stringify(dp1)==='[]'? <button className='btn btn-success'  onClick={()=>{addMedia(dp);
                                       }} >Upload</button>:
                <button className='btn btn-success'  onClick={()=>{updatemedia(dp1[0]._id,dp);
                                       }} >Change</button>}&emsp;
                <button className='btn btn-danger'  onClick={()=>{deletemedia(dp1[0]._id);
                                       }} >Delete</button>
              </div>
              </div>
             
           
           </div>
            <div onClick={()=>{refquick.current.click();handlec();setQuick(true)}} className="btnp1"><i className="fa fa-plus"  aria-hidden="true"></i></div>
            <button style={{position:"absolute",right:"1em"}} onClick={()=>{localStorage.removeItem('token');navigate('/');}} className='btn btn-primary'>Logout</button>
            </nav>
            <div   className='d-flex '>
            <div className='mainnav' style={{overflow:"scroll",height:"100vh",width:"289px",backgroundColor:"#f4f1f1"}}>
            <div style={{display:"flex",flexDirection:"column",padding:"2rem"}}>
                   <div className='d-flex my-2'> <div><img src={inbox} alt="inbox" /></div>&emsp;
                   <div onClick={()=>{localStorage.setItem("projectId","61d1719194c87b7ff0486240");
                                        getNote();
                                       localStorage.setItem("projectname","Inbox")}}  style={{fontWeight:"bold",marginTop:"auto"}} className='addtask'>
                     Inbox
                     </div></div>
                  
                     <div className="d-flex my-2">
                    <div><img src={calender} alt="calender" /></div>&emsp;
                    <div onClick={()=>{
                      localStorage.setItem("projectname","Today")
                      localStorage.setItem("schedule",gettoday());
                      getScheduleNote();
 localStorage.setItem("projectId","61d1719194c87b7ff0486240");


                    }}   style={{fontWeight:"bold",marginTop:"auto"}} className='addtask'>
                    Today
                     </div></div>
                    <div className="d-flex my-2"><div><img src={upcoming} alt="upcoming" /></div>&emsp;
                    <div onClick={()=>{getScheduleNoteweek();
                    localStorage.setItem("projectname","In a Week")}} style={{fontWeight:"bold",marginTop:"auto"}} className='addtask'>
                    In a Week
                     </div></div>
                </div>
                <Addproject />

            </div>
            <div  style={{position:"sticky",top:0,zIndex:2,height:"100vh",width:"100vw",padding:"2rem 2rem 13rem 2rem",overflow:"scroll"}}>
                    <h3>{localStorage.getItem("projectname")}&emsp;</h3>{date}
                    <hr  />

                    {notes.map((task)=>{
                    
               return <Tasks   key={task._id} task={task} updateNote={updateNote}/>
           })}
                    {/* {scheduletask.map((scheduletask)=>{
               return <Tasks   key={scheduletask._id} task={scheduletask} updateNote={updateNote}/>
           })} */}


                {visible &&<Addtask visible={visible} />}
                {!visible&&<div onClick={handleaddtask} className='d-flex'>
                    <div><i className="fa fa-plus"  aria-hidden="true"></i></div>&emsp;
                    <div  className='addtask'>
                     Add Task
                     </div>
                </div>}
              
                {notes.toString()==="" &&<div className='default'>
                  
                  <img src={dash} alt="" width="100%" />
                  <div className='defaultfam text-center'>No due tasks!!! Enjoy</div>
                </div>}
            </div>
            </div>

           
<button ref={refquick} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#quickadd">
  Launch demo modal
</button>


<div className="modal fade" id="quickadd" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content bgquick">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Quick Add</h5>
        <button  type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div style={{height:"19em"}} className="modal-body">
        <Addtask quick={quick}/>
      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        
      </div>
    </div>
  </div>
</div>



            <button ref={ref} type="button" className="btn btn-primary d-none"  data-bs-toggle="modal" data-bs-target="#updatee">
  Launch demo modal
</button>


<div  className="modal fade" id="updatee" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content bgquick">
      <div  className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Task</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div  className="modal-body">
      <form style={{height:"26em"}}>
  <div className="mb-3">
    <label  htmlFor="etitle" className="form-label ">Title</label>
    <input type="text" value={note.etitle} className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp"onChange={onchange}/>
    
  </div>
  <div className="mb-3">
  <label htmlFor="edescription" className="form-label  ">Description</label>
    <textarea name="edescription" id="edescription" className="form-control" cols="30" rows="10"  value={note.edescription} onChange={onchange} minLength={2} required/>
   
  </div>
  <span  onClick={()=>{document.getElementById('calenderr1').classList.remove('dipnone1')
                              }} className="badge bg-primary hover-cursor">Schedule</span>
    <div
        className="calendar1 dipnone1"
        id="calenderr1"
        
        
      >
        <span
          onClick={() => {
            
            localStorage.setItem("schedule", "");
            document.getElementById("calenderr1").classList.add("dipnone1");
          }}
          className="badge bg-success hover-cursor m-3"
        >
          No due date
        </span>
        <span className="hover-cursor p-3" style={{color:"black",position:"relative",left:"7em" ,fontWeight:"bold"}} onClick={() => {
             
             document.getElementById("calenderr1").classList.add("dipnone1");
           }}>X</span>
        <div
         
        >
          <Calendar onChange={onChange1} value={value} />
        </div>
      </div>
  
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-danger" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<1}type="button" className="btn btn-primary"  onClick={handleClick}>Update Note</button>
      </div>
    </div>
  </div>
</div>
       

        </div>
        </>
    )
}

export default Userdashboard
