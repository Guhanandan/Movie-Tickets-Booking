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
app.use(bodyParser.json())

// http://localhost:3000/
app.get('/',(req,res)=>{
    res.status(200).json({message : "Message from node server"})
})

// http:localhost:3000/hellow-world
app.get('/hello-world' , (request , responce) => {
    try{
        responce.status(200).json({message : "Hello World"});
    }
    catch(err){
        responce.status(500).json({message : err});
    }
})

// POST request
//http://localhost:3000/api/v1/user/signup
//http://localhost:3000/api/v1/user/login
app.use('/api/v1/user',userRoutes);

//POST request
//http://localhost:3000/api/v1/admin/add-movie
//http://localhost:3000/api/v1/admin/add-theatre

//GET requst
//http://localhost:3000/api/v1/admin/get-theatres
//http://localhost:3000/api/v1/admin/view-bookings
app.use('/api/v1/admin',adminRoutes);

// GET 
//http://localhost:3000/api/v1/movies/get-movies
//http://localhost:3000/api/v1/movies/search

//POST
//http://localhost:3000/api/v1/movies/booking
app.use('/api/v1/movies' , movieRoutes);

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