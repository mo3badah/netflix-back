const express = require('express');
const router = express.Router();

const { getMyMovieList, addMovieToList, updateStatusAndRating, deleteMovieFromList } = require('../controllers/movieListController');
const { authenticateUser, authorizeUser } = require('../middleware/authentication');

router.get('/', authenticateUser, authorizeUser(['user']), getMyMovieList);
router.post('/', authenticateUser, authorizeUser(['user']), addMovieToList);
router.put('/:id', authenticateUser, authorizeUser(['user']), updateStatusAndRating);
router.delete('/:id', authenticateUser, authorizeUser(['user']), deleteMovieFromList);

module.exports = router;