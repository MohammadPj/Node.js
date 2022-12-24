const mongoose = require("mongoose") ;

const genreSchema = new mongoose.Schema({
  name: {type: String, minLength: 3, maxLength: 25}
})

const Genre = mongoose.model("genre", genreSchema)

module.exports.Genre = Genre
module.exports.genreSchema = genreSchema