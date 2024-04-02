const mongoose = require('mongoose');

const { Schema } = mongoose;

  const UserSchema = new Schema({
   name:{type:String,
   required:true
   },
   email:{
       type:String,
       required:true
    //    ,unique:true  //it is used to check whether there is no duplicates and i found internal server error if there is no handler in index.js
   },
   password:{
       type:String,
       required:true
   },
  
   date:{
       type:Date,
       default:Date.now
   }
  });
  const User=mongoose.model('user',UserSchema);
  
  module.exports=User;
