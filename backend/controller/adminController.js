const Movie = require('../models/movieModel');
const Theatre = require('../models/theatreModel');
const Booking = require('../models/bookingModel');


const addMovies = async (req, res) => {
    try {
      const { movie_name,image,discription,languages,director,duration,release_date} = req.body;
      const newMovie = new Movie({ movie_name,image,discription,languages,director,duration,release_date });
      await newMovie.save();
      res.status(201).json({ message: 'Movie added successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}


const addTheatre = async (req, res) => {
    try {
      const { name,movies } = req.body;
      const postedTheatre = await Theatre.create({name,movies });
      // console.log(postedTheatre)
      const id = postedTheatre._id.toString()
      const theatres = await Theatre.find({_id : id}).populate('movies.movieID').exec()
      res.status(201).json({ message: 'Theatre added successfully', theatres});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const getTheatres = async (req,res)=>{
    try{
      const theatres = await Theatre.find().populate('movies.movieID').exec()
      res.status(201).json({ message: 'All Theatres are listed ', theatres});
    }
    catch(err){
      console.log(err)
      res.status(500).send({error : err})
    }
}

// view all the bookings
// http://localhost:3000/api/admin/view-bookings

const viewAllBookings = async (req, res) => {
    try {
      const booking = await Booking.find().populate('userID').populate('movieID').populate('theatreID');
      // console.log(booking);
      res.status(200).json({message : booking});
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

// view boookings by userID
//http://localhost:3000/api/admin/view-bookings-by-userID

const viewBookingByuserID = async (req,res) => {
  try{
    const {userID} = req.body; 
    const userBooking = await Booking.find({userID : userID}).populate('userID').populate('movieID').populate('theatreID');
    res.status(200).send(userBooking);
  }
  catch(err){
    console.log({error : err});
    res.status(500).send({error : err});
  }
}


// view boookings by theatreID
//http://localhost:3000/api/admin/view-bookings-by-theatreID

const viewBookingByTheatreID = async (req,res) => {
  try{
    const {theatreID} = req.body; 
    const theatreBooking = await Booking.find({theatreID : theatreID}).populate('userID').populate('movieID').populate('theatreID');
    res.status(200).send(theatreBooking);
  }
  catch(err){
    console.log({error : err});
    res.status(500).send({error : err});
  }
}

// view boookings by userID
// http://localhost:3000/api/admin/view-bookings-by-userID

const viewBookingBymovieID = async (req,res) => {
  try{
    const {movieID} = req.body; 
    const movieBooking = await Booking.find({movieID : movieID}).populate('userID').populate('movieID').populate('theatreID');
    res.status(200).send(movieBooking);
  }
  catch(err){
    console.log({error : err});
    res.status(500).send({error : err});
  }
}

module.exports = {addMovies,getTheatres,addTheatre,viewAllBookings,viewBookingByuserID,viewBookingByTheatreID,viewBookingBymovieID};