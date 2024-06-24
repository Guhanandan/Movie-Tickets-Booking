
const express = require('express');

const router = express.Router();
const {addMovies,getTheatres,addTheatre,viewAllBookings,viewBookingByuserID,viewBookingByTheatreID,viewBookingBymovieID} = require('../controller/adminController')
// Add movie route
router.post('/add-movie', addMovies);

// GET theatres
router.get('/get-theatres' , getTheatres)

// Add theatre route
router.post('/add-theatre', addTheatre);

// View bookings route
router.get('/view-bookings', viewAllBookings);

// view bookings by userID
router.get('/view-bookings-by-userID' , viewBookingByuserID);

// view booking by theatreID
router.get('/view-bookings-by-theatreID' , viewBookingByTheatreID);

// view booking by movieID
router.get('/view-bookings-by-movieID' , viewBookingBymovieID);

module.exports = router;

