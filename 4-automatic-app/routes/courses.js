const Creator = require("../utils/creator");

const express = require('express')
const Joi = require("joi");
const router = express.Router('')

const genres = [
  { id: 1, genre: "horror" },
  { id: 2, genre: "comedy" },
  { id: 3, genre: "action" },
];

const validateGenre = (genre) => {
  const schema = Joi.object({
    genre: Joi.string().required().min(3),
  });
  return schema.validate(genre);
};

const genreAPIs = new Creator(router, genres);
genreAPIs.run("genres", validateGenre);

module.exports = router;