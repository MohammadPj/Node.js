const mongoose = require("mongoose") ;
const Joi = require("joi");

const genreSchema = new mongoose.Schema({
  name: {type: String, minLength: 3, maxLength: 25}
})

const Genre = mongoose.model("Genre", genreSchema)

const validateGenre = (movie) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3)
  });

  return schema.validate(movie);
};
module.exports = {Genre, genreSchema, validateGenre}