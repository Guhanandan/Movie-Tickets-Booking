const express = require('express');

const { searchMovies, bookingMovies } = require('../controller/searchMovies');

const router = express.Router();

// Search movies route
router.get('/search',searchMovies);

// user booking the movie
router.post('/booking' , bookingMovies)

module.exports = router;
