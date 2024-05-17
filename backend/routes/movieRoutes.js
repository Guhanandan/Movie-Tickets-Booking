const express = require('express');
const Movie = require('../models/movieModel');
const Theatre = require('../models/theatreModel');
const Booking = require('../models/bookingModel');

const router = express.Router();

// Search movies route
router.get('/search', async (req, res) => {
  try {
    const { name, date, theatreName } = req.query;

    if (name) {
      query.name = { $regex: name, $options: 'i' };
    }
    if (date) {
      query.date = date;
    }
    if (theatreName) {
      const theatre = await Theatre.find({ name:{$regex :theatreName , $options : 'i'}});
      if (!theatre) {
        return res.status(404).json({ message: 'Theatre not found' });
      }
      res.status(200).json(theatre)
    }

    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// user booking the movie
router.post('/booking' , async (req,res)=>{
  try{
    const {userID , theatreID , movieID , numberOfSeats} = req.body
    const theatre = await Theatre.findById(theatreID)

    const movie = await theatre.movies.find(movie => movie.movieID.equals(movieID))
    const totalPrice = movie.price * numberOfSeats

    const booking  = await Booking.create({userID , theatreID , movieID , numberOfSeats , totalPrice})

    if(movie.seatsAvailable<numberOfSeats){
      res.status(400).json({message : "Seats are not Available"})
    }
    movie.seatsAvailable -= numberOfSeats
    await theatre.save()
    const bookingId = booking._id.toString()
    const bookingObject = await Booking.find({_id : bookingId}).populate('userID').populate('theatreID').populate('movieID')
    // console.log(bookingObject)
    res.status(201).json(bookingObject)
  }
  catch(err){
    console.log(err)
    res.status(500).json({error : err})
  }
})

module.exports = router;
