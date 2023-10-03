const {genreSchema} = require("../models/genre");
const Joi = require("joi")
const mongoose = require("mongoose")

const movieSchema = new mongoose.Schema({
  title: String,
  numberInStock: Number,
  dailyRentalRate: Number,
  genre: genreSchema
})

const Movie = mongoose.model("movie", movieSchema)


const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
    genreId: Joi.string().required()
  });

  return schema.validate(movie);
};


module.exports = {Movie, validateMovie}