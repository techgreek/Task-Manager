const mongoose = require('mongoose');

const { Schema } = mongoose;

  const ProjectSchema = new Schema({
      user:{
          type:mongoose.Schema.Types.ObjectId,
          ref:'user' //not necessary to use just for explaining
      },
   name:{type:String,
   required:true
   },

  
  });
  module.exports=mongoose.model('project',ProjectSchema);