const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Task = require("../models/Task");
const { body, validationResult } = require("express-validator");
const fetchproject = require("../middleware/fetchproject");
const fetchschedule = require("../middleware/fetchschedule");
const fetchscheduleweek = require("../middleware/fetchscheduleweek");

//Route 1 get all the notes in User detail using :GET "/api/notes/fetchallnotes".login requiered
router.get("/fetchalltasks",fetchproject,fetchuser, async (req, res) => {
  try {
    const tasks = await Task.find({project:req.project,user:req.user.id});
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
//Route 1 get all the notes in User detail using :GET "/api/notes/fetchallnotes".login requiered
router.get("/fetchallduetasks",fetchuser,fetchschedule, async (req, res) => {
  try {
    const tasks = await Task.find({schedule:req.schedule,user:req.user.id});
    res.json(tasks);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});

  // const d1=new Date();
  
  //     for(i=0;i<7;i++){
  // d1.setDate(d1.getDate() + 1);}
  // console.log(d1.toDateString())
  // const d2=new Date();
      
  // d2.setDate(d2.getDate() + 2);
  // const d3=new Date();
      
  // d3.setDate(d3.getDate() + 3);
  // const d4=new Date();
      
  // d4.setDate(d4.getDate() + 4);
  // const d5=new Date();
      
  // d5.setDate(d5.getDate() + 5);
  // const d6=new Date();
      
  // d6.setDate(d6.getDate() + 6);
  // const d7=new Date();
      
 
  // d7.setDate(d7.getDate() + 7);
  const d=new Date();
let week=()=>{
//  if(d.setDate(d.getDate() )<d.setDate(d.getDate() + 7))
  d.setDate(d.getDate() + 1);
}

let total=[],i;
router.get("/fetchallduetasksweek",fetchuser,fetchscheduleweek, async (req, res) => {
  try {
    // const a=[Sun,Mon,Tue,Wed,Thu,Fri,Sat];
    
    for(i=0;i<7;i++){
      week();
     let tasks = await Task.find({schedule:d.toDateString(),user:req.user.id })
     total=total.concat(tasks)
   
    //  console.log(d.toDateString())
   }
   d.setDate(new Date().getDate());
   
    res.json(total);
    total=[]
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
//Route 2 to add new notes in User detail using :POST "/api/notes/addnote".login requiered
router.post(
  "/addtask",fetchuser,fetchproject,
  
  [
    body("title", "enter the valid title").isLength({ min: 1 }),
    
    
  ],
  async (req, res) => {
    try {
      // console.log("done",req.user.id)
      const { title, description} = req.body;
      const schedule = req.header('schedule');

      // if there are error,return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const task = new Task({
        title,
        description,
        schedule,
        project: req.project,
        user:req.user.id,
      });
      const savedTask = await task.save();

      res.json(savedTask);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);
//Route 3 to update  notes in User detail using :PUT: "/api/notes/updatenote".login requiered
router.put("/updatetask/:id", async (req, res) => {
  const { title, description} = req.body;
  const { schedule} = req.headers;
  try {
    //create a newNote object
    const newTask = {};
    if (title) {
      newTask.title = title;
    }
    if (description) {
      newTask.description = description;
    }
    if(schedule){
      newTask.schedule = schedule;
    }
    

    //find the note to be updated and update it
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not found");
    }
    // if (task.project.toString() !== req.project) {
    //   return res.status(401).send("not authorised");
    // }
   task = await Task.findByIdAndUpdate(
      req.params.id,
      { $set: newTask },
      { new: true }
    );
    res.json({task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
//Route 4 to delte a note in User detail using :DELETE: "/api/notes/deletenote".login requiered
router.delete("/deletetask/:id", async (req, res) => {

  try {
    //find the note to be delted and deleted it
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).send("Not found");
    }
    // allow deletion if owner owns the note
    // if (task.project.toString() !== req.project) {
    //   return res.status(401).send("not authorised");
    // }
    task = await Task.findByIdAndDelete(req.params.id);
    res.json({ success: "note has been deleted", task: task });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
router.delete("/deletealltasks", fetchproject, async (req, res) => {

  try {
    //find the note to be delted and deleted it
    let tasks = await Task.find({project:req.project});
    if (!tasks[0]) {
      return res.status(404).send("Not found");
    }
    // allow deletion if owner owns the note
    if (tasks[0].project.toString() !== req.project) {
      return res.status(401).send("not authorised");
    }
   
    while(tasks!==null)
    tasks = await Task.findOneAndDelete({project:req.project}) ;
    res.json({ success: "all note has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
module.exports = router;
