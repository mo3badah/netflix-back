const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

const movieListSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User',
    required: true,
  },
  movieId: {
    type: ObjectId,
    ref: 'Movie',
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['wantToWatch','currentlyWatching','doneWatching'],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  }
});

const MovieList = mongoose.model('MovieList', movieListSchema);

module.exports = MovieList;