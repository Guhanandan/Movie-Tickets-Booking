const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movie_name: {
        type: String,
        required: true
    },
    image: {
        type: String
    },
    description: {
        type: String
    },
    languages: [{
        type: String
    }],
    director: {
        type: String
    },
    duration: {
        type: String
    },
    release_date: {
        type: Date
    }
});

module.exports = mongoose.model("movies", movieSchema);
