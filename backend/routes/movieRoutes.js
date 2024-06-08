const express = require('express');

const { searchMovies, bookingMovies , getAllMovies} = require('../controller/searchMovies');

const router = express.Router();

// get all movies
router.get('/' , getAllMovies);

// Search movies route
router.get('/search',searchMovies);

// user booking the movie
router.post('/booking' , bookingMovies)

module.exports = router;
