const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Project = require("../models/Project");
const { body, validationResult } = require("express-validator");

//Route 1 get all the notes in User detail using :GET "/api/notes/fetchallnotes".login requiered
router.get("/fetchallproject",fetchuser, async (req, res) => {
  try {
    const project = await Project.find({ user: req.user.id });
    res.json(project);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
//Route 2 to add new notes in User detail using :POST "/api/notes/addnote".login requiered
router.post(
  "/addproject",
  fetchuser,
  [
    body("name", "enter the valid name").isLength({ min: 1 }),
   
    
  ],
  async (req, res) => {
    try {
      const { name} = req.body;
      // if there are error,return bad request and the error
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const project = new Project({
       name,
        user: req.user.id,
      });
      const savedProject = await project.save();

      res.json(savedProject);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  }
);
//Route 3 to update  notes in User detail using :PUT: "/api/notes/updatenote".login requiered
router.put("/updateproject/:id",fetchuser, async (req, res) => {
  const { name} = req.body;
  try {
    //create a newNote object
    const newProject = {};
    if (name) {
      newProject.name = name;
    }

    //find the note to be updated and update it
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not found");
    }
    if (project.user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
   project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: newProject },
      { new: true }
    );
    res.json({project });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
//Route 4 to delte a note in User detail using :DELETE: "/api/notes/deletenote".login requiered
router.delete("/deleteproject/:id",fetchuser, async (req, res) => {

  try {
    //find the note to be delted and deleted it
    let project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).send("Not found");
    }
    //allow deletion if owner owns the note
    if (project.user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
    project = await Project.findByIdAndDelete(req.params.id);
    res.json({ success: "Project has been deleted", project: project });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
router.delete("/deleteallprojects",fetchuser, async (req, res) => {

  try {
    //find the note to be delted and deleted it
    let projects = await Project.find();
    if (!projects[0]) {
      return res.status(404).send("Not found");
    }
    //allow deletion if owner owns the note
    if (projects[0].user.toString() !== req.user.id) {
      return res.status(401).send("not authorised");
    }
   
    while(projects!==null)
    projects = await Project.findOneAndDelete() ;
    res.json({ success: "all project has been deleted" });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
});
module.exports = router;
