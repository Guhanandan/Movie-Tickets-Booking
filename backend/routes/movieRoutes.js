const express = require('express');

const { searchMovies, bookingMovies , getAllMovies} = require('../controller/movieController');

const router = express.Router();

// get all movies
router.get('/get-movies' , getAllMovies);

// Search movies route
router.get('/search',searchMovies);

// user booking the movie
router.post('/booking' , bookingMovies);

module.exports = router;
