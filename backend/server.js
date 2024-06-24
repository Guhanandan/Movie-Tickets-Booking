require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const adminRoutes = require('./routes/adminRoutes')
const movieRoutes = require('./routes/movieRoutes')
const bodyParser = require('body-parser')
const app = express()

app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.get('/',(req,res)=>{
    res.status(200).json({message : "Message from node server"})
})

//http://localhost:3000/api/user/signup
//http://localhost:3000/api/user/login
app.use('/api/user',userRoutes);

//
app.use('/api/admin',adminRoutes);

// GET 
app.use('/api/movies' , movieRoutes);

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.CONNECTION_STRING)
        console.log("CONNECTED TO THE DB....")
    }
    catch(err){
        console.log(err)
    }
}
// connect to the database
connectDB()

const PORT = process.env.PORT || 8000

app.listen(PORT,()=>{
    console.log(`Server is Listening on PORT ${PORT}`)
})