const express = require("express")
const mongoose = require("mongoose")
const joi = require("joi")

const Creator = require("../utils/creator");

const router = express.Router() // create a route for genres to use in app -- app.use('/api/genres', genresRouter)

const genresSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3
  }
})

const validateGenre = (genre) => {
  const schema = joi.object({
    name: joi.string().required().min(3),
  });
  return schema.validate(genre);
};

// create user model
const Genres = mongoose.model("Genres", genresSchema);

const genreAPIs = new Creator(router, Genres);
genreAPIs.run(validateGenre);

module.exports = router