const express =require('express');
const router=express.Router();
const Media=require('../models/Media')
const fetchuser=require('../middleware/fetchuser')

router.get("/getmedia",fetchuser,async(req,res)=>{
  try {
    const dp=  await Media.find({user:req.user.id});
    res.json(dp);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error Occured");
  }
})

router.post(
    "/addmedia",fetchuser,
    
    async (req, res) => {
      try {
        const {media} = req.body;
       
            // console.log(media)
        // if there are error,return bad request and the error
       
        const mediap = new Media({
            selectedpic:media,
            user:req.user.id
        });
        const savedMedia = await mediap.save();
  
        res.json(savedMedia);
      } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error Occured");
      }
    }
  );
  router.put("/updatemedia/:id",fetchuser, async (req, res) => {
    const { selectedpic} = req.body;
    try {
      //create a newNote object
      const newProject = {};
      if (selectedpic) {
        newProject.selectedpic = selectedpic;
      }
  
      //find the note to be updated and update it
      let media = await Media.findById(req.params.id);
      if (!media) {
        return res.status(404).send("Not found");
      }
      if (media.user.toString() !== req.user.id) {
        return res.status(401).send("not authorised");
      }
     media = await Media.findByIdAndUpdate(
        req.params.id,
        { $set: newProject },
        { new: true }
      );
      res.json({media });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  });
  //Route 4 to delte a note in User detail using :DELETE: "/api/notes/deletenote".login requiered
  router.delete("/deletemedia/:id",fetchuser, async (req, res) => {
  
    try {
      //find the note to be delted and deleted it
      let media = await Media.findById(req.params.id);
      if (!media) {
        return res.status(404).send("Not found");
      }
      //allow deletion if owner owns the note
      if (media.user.toString() !== req.user.id) {
        return res.status(401).send("not authorised");
      }
      media = await Media.findByIdAndDelete(req.params.id);
      res.json({ success: "media has been deleted" });
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error Occured");
    }
  });

  module.exports=router;