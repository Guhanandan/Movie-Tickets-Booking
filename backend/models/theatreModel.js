const mongoose = require('mongoose')
const theatreSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true
    },
    movies : [{
        movie : {
            type : mongoose.Schema.Types.ObjectID,
            ref : "movies",
            required : true
        },
        price : {
            type : Number,
            required : true
        },
        seatsAvailable : {
            type : Number,
            required : true
        }
    }]
})

module.exports = mongoose.model("Theatres" , theatreSchema)