const Joi = require('joi');
const Movie = require('../models/movie');

const mongoose = require('mongoose');
const { ObjectId } = mongoose.Types;

// Joi validation schema for movie data
const movieSchema = Joi.object({
  posterUrl: Joi.string().required(),
  seriesTitle: Joi.string().required(),
  releasedYear: Joi.number().integer().min(1800).max(new Date().getFullYear()).required(),
  certificate: Joi.string(),
  runtime: Joi.string(),
  genre: Joi.string().required(),
  imdbRating: Joi.number().min(0).max(10),
  overview: Joi.string().required(),
  metaScore: Joi.number().min(0).max(100),
  director: Joi.string(),
  starFirst: Joi.string(),
  starSecond: Joi.string(),
  starThird: Joi.string(),
  starFourth: Joi.string(),
  votesCount: Joi.number().integer().min(0),
  gross: Joi.string(),
});

// Get all movies (with pagination support)
const getAllMovies = async (req, res, next) => {
  try{
    const { page=1, limit=25 } = req.query;

    if (limit>50) limit = 50;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
    };

    const movies = await Movie.paginate({}, options);
    const moviesFixed = { ...movies };
    moviesFixed.data = moviesFixed.docs;
    delete moviesFixed.docs;

    return res.status(200).json(moviesFixed)

  } catch (error) {

    next (error);

  }
};
const getRandomMovie = async (req, res, next) => {
    try {
        const count = await Movie.countDocuments();
        const random = Math.floor(Math.random() * count);
        const movie = await Movie.findOne().skip(random);
        res.status(200).json({ data: movie });
    } catch (error) {
        next(error);
    }
}
// Get a single movie by ID
const getMovieById = async (req, res, next) => {
  try {
    const movie = await Movie.findById(new ObjectId(req.params.id));
    
    // Couldn't find movie with this id
    if (!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }

    res.status(200).json({ data: movie });

  } catch (error) {
    next(error);
  }
}

// Create a new movie
const createMovie = async (req, res, next) => {
  try {
    const { error } = movieSchema.validate(req.body);
    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const movie = await Movie.create(req.body);
    res.status(200).json({ created: movie });
  } catch (error) {
    next(error);
  }
}

// Update an existing movie by ID
const updateMovie = async (req, res, next) => {
  try {
    const { error } = movieSchema.validate(req.body);

    if(error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const movie = await Movie.findByIdAndUpdate(new ObjectId(req.params.id), req.body, {
      new:true
    });

    if(!movie) {
      return res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json({ updated: movie });
  } catch (error) {
    next(error);
  }
}

// Delete an existing movie by ID
const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findByIdAndRemove(new ObjectId(req.params.id));

    if(!movie) {
      res.status(404).json({ error: 'Movie not found' });
    }
    res.status(200).json({ deleted: movie });
  } catch (error) {
    next(error)
  }
}

const searchMovies = async (req, res, next) => {
  const { seriesTitle, releasedYear, genres } = req.query;

  const searchQuery = {};

  if (seriesTitle) {
    searchQuery.seriesTitle = { $regex: seriesTitle, $options: 'i' };
  }

  if (releasedYear) {
    searchQuery.releasedYear = parseInt(releasedYear, 10);
  }

  if (genres) {
    const genreArray = genres.split(',');
    const genreRegex = genreArray.map(genre => new RegExp(genre, 'i'));
    searchQuery.genre = { $in: genreRegex };
  }

  try {
    // Define the number of documents you want to fetch
    const limit = 20;

// Aggregation pipeline to shuffle the documents
    const pipeline = [
      { $match: searchQuery },
      { $sample: { size: limit } }
    ];

    const movies = await Movie.aggregate(pipeline);

    if (!movies.length) {
      return res.status(404).json({ error: 'The search query returned no results' });
    }

    return res.status(200).json({ data: movies }) ;
  } catch (error) {
    next(error);
  }
};



module.exports = { getAllMovies, getRandomMovie, getMovieById, createMovie, updateMovie, deleteMovie, searchMovies };