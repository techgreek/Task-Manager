
import {
  BrowserRouter as Router,
  Routes,
  Route,
}from 'react-router-dom';

import About from './components/About';
import Contact from './components/Contact';
import Home from './components/Home';
import Userdashboard from './components/Userdashboard';
import React,{useEffect} from 'react'
import TaskState from './context/tasks/TaskState';
import Login from './components/Login';
import Signup from './components/Signup'

function App() {
  useEffect(() => {
       
    localStorage.setItem("projectId","61d1719194c87b7ff0486240");//for inbox default
  
 
  
    // eslint-disable-next-line
}, [])

// const host="http://localhost:5000";
const host="https://task-manager-xbw3.onrender.com";

  return (
    <TaskState>
    <Router>
   
   <Routes>
   <Route exact path="/" key="home" element={<Home/>}/>
         
         
          
          <Route exact path="/contact" key="contact" element={<Contact/>}/>
          <Route exact path="/login" key="login" element={<Login host={host}/>}/>
          <Route exact path="/signup" key="signup" element={<Signup host={host}/>}/>
          <Route exact path="/about"  key="about" element={<About/>}/>
          <Route exact path="/user"  key="user" element={<Userdashboard/>}/>
   </Routes>
   
   </Router>
   </TaskState>
  );
}

export default App;
