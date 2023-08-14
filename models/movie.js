const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const movieSchema = new mongoose.Schema({
    // Define movie schema fields
    posterUrl: String,
    seriesTitle: String,
    releasedYear: Number,
    certificate: String,
    runtime: String,
    genre: String,
    imdbRating: Number,
    overview: String,
    metaScore: Number,
    director: String,
    starFirst: String,
    starSecond: String,
    starThird: String,
    starFourth: String,
    votesCount: Number,
    gross: String,
    movieId: Number,
    videos: [
        // {
        //     iso_639_1: String,
        //     iso_3166_1: String,
        //     name: String,
        //     key: String,
        //     site: String,
        //     size: Number,
        //     type: String,
        //     official: Boolean,
        //     published_at: Date,
        //     id: String
        // }
    ]
});

movieSchema.plugin(mongoosePaginate);

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;