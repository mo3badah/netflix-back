const Joi = require('joi');
const MovieList = require('../models/movieList');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Get the movie list of the logged-in user
const getMyMovieList = async (req, res, next) => {
  
  const { id } = req.user;

  const movieList = await MovieList.find({userId: new ObjectId(id)});

  if (!movieList.length) {
    return res.status(404).json({ error: 'Could not find a movie list for this user' });
  }

  return res.status(200).json({ data: movieList });

}

// Add a movie to the user's list
const addMovieToList = async (req, res, next) => {

  const schema = Joi.object({
    movieId: Joi.string().required(),
    status: Joi.string()
      .valid('wantToWatch','currentlyWatching','doneWatching')
      .default('wantToWatch'),
    rating: Joi.number().min(0).max(5)  // 0 = rating not set !
      .default(0)
  });

  const { error } = schema.validate(req.body);
  if(error) {
    return res.status(400).json({ error: error.details[0].message });
  };

  const userId = req.user.id;

  const { movieId, status='wantToWatch', rating=0 } = req.body;

  try {

    // does movie exists in database ?
    const foundMovie = await MovieList.find({movieId});
    if (!foundMovie) {
      return res.status(400).json({ error: 'This movie does not exists in database' });
    };

    // is movie already in the user's movie list ?
    const movieAlreadyInUserList = await MovieList.find({userId: new ObjectId(userId), movieId: new ObjectId(movieId)});

    if (movieAlreadyInUserList.length) {
      return res.status(400).json({ error: 'This movie is already in your list' });
    };

    // add the movie to the list
    const addedMovie = await MovieList.create({
      userId,
      movieId,
      status,
      rating,
    });

    return res.status(200).json({ created: addedMovie });
    
  } catch (error) {
    next(error);
  }


}

// Update status & rating
const updateStatusAndRating = async (req, res, next) => {

  const schema = Joi.object({
    status: Joi.string().valid('wantToWatch','currentlyWatching','doneWatching').optional(),
    rating: Joi.number().min(1).max(5).optional()
  });

  const { error } = schema.validate(req.body);
  if(error) {
    return res.status(400).json({ error: error.details[0].message });
  };

  const objectId = req.params.id;

  const { status, rating } = req.body;

  if (!(status||rating)) {
    return res.status(400).json({error: 'You must supply at least one parameter: status or rating'});
  };

  let payload = {}
  if(status) {
    payload.status = status;
  }
  if(rating) {
    payload.rating = parseInt(rating,10);
  }

  try {

    const updatedObject = await MovieList.findByIdAndUpdate(
      new ObjectId(objectId),
      payload,
      { new: true },
    );
  
    if (!updatedObject) {
      return res.status(400).json({ error: 'Could not update this object' });
    }
  
    return res.status(200).json({ data: updatedObject });

  } catch (error) {
    next(error)
  }
};

// Delete a movie from the user's list
const deleteMovieFromList = async (req, res, next) => {

  const userId = req.user.id;
  const { id } = req.params;

  try {

    const deletedMovie = await MovieList.findByIdAndRemove({_id: new ObjectId(id)});
    if(!deletedMovie) {
      return res.status(404).json({ error: 'This object id does not exist' });
    }
  
    return res.status(200).json({ deleted: deletedMovie });

  } catch(error) {
    next(error);
  }

}

module.exports = { getMyMovieList, addMovieToList, updateStatusAndRating, deleteMovieFromList }