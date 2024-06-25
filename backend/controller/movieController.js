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
      query['name'] = { $regex: new RegExp('^' + theatreName + '$', 'i') }
    }
    const availableTheatres = await Theatre.find(query).populate('movies.movieID')
    res.status(200).json(availableTheatres)
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
}



const bookingMovies = async (req,res)=>{
    const {userID,theatreID,movieID,numberOfSeats} = req.body;
    const theatre = await Theatre.findById(theatreID);

    //find movie in particular theatre
    const movie = theatre.movies.find(movie => movie.movieID.equals(movieID));

    // calculate for the total amount for the total seats booking
    const totalPrice = numberOfSeats * movie.price;

    //check for the seats available
    if(numberOfSeats > movie.seatsAvailable){
      return res.json({message : "seats not available"});
    }
    else{
      movie.seatsAvailable -=numberOfSeats;
      await theatre.save();
    }
    const booking = await Booking.create({userID,theatreID,movieID,numberOfSeats,totalPrice});
    // const bookingObject = await booking;
    // console.log(booking);
    const bookingObject = await Booking.findById(booking._id).populate('userID').populate('theatreID').populate('movieID');
    res.status(200).json(bookingObject);
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