const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    movies: [{
        movieID: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "movies",
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        seatsAvailable: {
            type: Number,
            required: true
        }
    }],
    location: {
        type: String,
        // required: true
    },
    capacity: {
        type: Number,
        default : 60
    }
});

module.exports = mongoose.model("theatres", theatreSchema);
