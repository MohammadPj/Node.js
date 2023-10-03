const mongoose = require('mongoose')
const Joi = require("joi")

const Genre = mongoose.model("Genre", new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 20
  }
}))

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3).max(20),
  })

  return schema.validate(genre)
}

// exports.Customers = Customers
// exports.validateCustomer = validateCustomer
module.exports = {Genre, validateGenre}