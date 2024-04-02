const mongoose = require('mongoose');

const { Schema } = mongoose;

  const MediaSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user' //not necessary to use just for explaining
    },
  
   selectedpic:{
       type:String,
       
   },
   date:{
       type:Date,
       default:Date.now
   }
  });
  const Media=mongoose.model('media',MediaSchema);
  
  module.exports=Media;
