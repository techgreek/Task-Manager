const mongoose=require("mongoose");
require('dotenv').config()

const mongoURI=`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.retqbhs.mongodb.net/manager`
// const mongoURI="mongodb://127.0.0.1:27017/manager"
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("connected to mongo successfully");
    })
}
module.exports=connectToMongo;
