const mongoose  = require('mongoose')

const bookingSchema = new mongoose.Schema({
    userID : {
        type : mongoose.Schema.ObjectId,
        ref : "users",
        required : true 
    },
    theatreID : {
        type : mongoose.Schema.ObjectId,
        ref : "theatres",
        required : true
    },
    movieID : {
        type : mongoose.Schema.ObjectId,
        ref : "movies",
        required : true
    },
    numberOfSeats : {
        type : Number,
        required : true
    },
    totalPrice : {
        type : Number,
        required : true
    },
    paymentStatus : {
        type : String,
        enum : ['Paid' , 'Unpaid'],
        default : 'Unpaid'
    }
})

module.exports = mongoose.model("Booking" , bookingSchema)