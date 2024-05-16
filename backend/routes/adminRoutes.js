
const express = require('express');
const jwt = require('jsonwebtoken');
const Movie = require('../models/movieModel');
const Theatre = require('../models/theatreModel');
// const Booking = require('../models/Booking');

const router = express.Router();

// Middleware to verify admin token
// const verifyToken = (req, res, next) => {
//   const token = req.headers.authorization;
//   if (!token) {
//     return res.status(401).json({ message: 'Unauthorized' });
//   }
//   jwt.verify(token, 'your_secret_key', (err, decoded) => {
//     if (err) {
//       return res.status(401).json({ message: 'Unauthorized' });
//     }
//     req.userId = decoded.userId;
//     next();
//   });
// };

// Add movie route
router.post('/add-movie'/*, verifyToken*/, async (req, res) => {
  try {
    const { movie_name,image,discription,languages,director,duration,release_date} = req.body;
    const newMovie = new Movie({ movie_name,image,discription,languages,director,duration,release_date });
    await newMovie.save();
    res.status(201).json({ message: 'Movie added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Add theatre route
router.post('/add-theatre'/*, verifyToken*/, async (req, res) => {
  try {
    const { name,movies } = req.body;
    const newTheatre = new Theatre({ name,movies });
    const theatre = await newTheatre.save();
    res.status(201).json({ message: 'Theatre added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// View bookings route
router.get('/view-bookings'/*, verifyToken*/, async (req, res) => {
  try {
    const bookings = await Booking.find().populate('userId').populate('movieId').populate('theatreId');
    res.status(200).json(bookings);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
