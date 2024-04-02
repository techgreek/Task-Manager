const connectToMongo=require("./db");
var cors = require('cors')
const express = require('express')
connectToMongo();
require('dotenv').config()
const bodyParser =require('body-parser');



const app = express()
const port =process.env.PORT|| 5000
app.use(cors())
// app.use(express.json());
//heroku

//Available routes
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))

app.use('/api/auth',require('./routes/auth'));
app.use('/api/project',require('./routes/project'));
app.use('/api/task',require('./routes/task'));
app.use('/api/media',require('./routes/media'));
// app.use('/api/media',require('./routes/media'))

app.listen(port, () => {
  console.log(`project manager  listening at http://localhost:${port}`)
})