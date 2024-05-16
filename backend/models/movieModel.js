
const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
  movie_name: { 
    type: String, 
    required: true 
  },
  image :  {
    type : String
  },
  discription : {
    type : String
  },
  languages : [{
    type : String
  }],
  director : {
    type : String
  },
  duration : {
    type : String
  },
  release_date : {
    type : Date,
  }
})
movieSchema.set('toJSON', {
  virtuals: true,
  transform: (doc, ret) => {
      ret.id = ret._id; // Map _id to id
      delete ret._id; // Remove _id
      delete ret.__v; // Remove __v
      return ret;
  }
});

module.exports = mongoose.model("movies" , movieSchema)