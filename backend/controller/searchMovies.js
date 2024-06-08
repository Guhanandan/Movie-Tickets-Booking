const Movie = require('../models/movieModel');
const Theatre = require('../models/theatreModel');
const Booking = require('../models/bookingModel');

const searchMovies =  async (req, res) => {
    try {
      const { movieName, releaseDate, theatreName } = req.query;
      const query = {}
      if (movieName) {
        query['movies.movieID.movie_name'] = { $regex: movieName, $options: 'i' };
      }
      if (releaseDate) {
        query['movies.movieID.release_date'] = releaseDate;
      }
      if (theatreName) {
        query.name = { $regex: new RegExp('^' + theatreName + '$', 'i') }
      }
      const availableTheatres = await Theatre.find(query).populate('movies.movieID')
      res.status(200).json(availableTheatres)
      
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
}

const bookingMovies = async (req,res)=>{
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
}

// get all the movies
const getAllMovies = async (req , res) => {
  try{
    console.log(req.url);
    const movies = await Movie.find();
    res.status(200).json(movies);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({error : err.message});
  }
}

module.exports = {searchMovies , bookingMovies , getAllMovies};