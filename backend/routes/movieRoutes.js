const express = require('express');
const Movie = require('../models/movieModel');
const Theatre = require('../models/theatreModel');
// const Booking = require('../models/Booking');

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

module.exports = router;
