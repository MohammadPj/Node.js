const express = require('express')
const Joi = require("joi");
const router = express.Router()
const mongoose = require("mongoose")
const {genreSchema, Genre} = require("./genres");

mongoose.connect("mongodb://localhost:27017/vidly-population").then(() => {
  console.log("connected to courses")
}).catch(() => {
  console.log("not connected")
})

const Movie = mongoose.model("movie", new mongoose.Schema({
  title: String,
  numberInStock: Number,
  dailyRentalRate: Number,
  genre: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Genre'
  }
}))

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
    genreId: Joi.string()
  });
  return schema.validate(movie);
};

// ----------------------------------  Get  --------------------------------------
router.get("/", async (req, res) => {
  const movies = await Movie.find({})
  // .populate("title -_id genre")

  if (!movies) return res.status(404).send("movie not found");

  res.send(movies);
});

router.get("/:id",  async (req, res) => {
  const movie = await Movie.findById(req.params.id)

  if (!movie) return res.status(404).send("movies not found");

  res.send(movie);
});

// ----------------------------------  Post  --------------------------------------
router.post("/", async (req, res) => {
  const { value, error } = validateMovie(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({...req.body, genre: req.body.genreId})
  movie = await movie.save()

  res.send(movie);
});

// ----------------------------------  Put  -----------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movies = await Movie.findByIdAndUpdate(req.params.id, {...req.body}, {new: true})
  // const genre = await Genre.findById(req.params.id)
  if (!movies) return res.status(404).send("Genre not found")

  const result = await movies.save()
  res.send(result)
})

// ----------------------------------  Delete  -----------------------------------------
router.delete("/:id", async (req, res) => {
  const movies = await Movie.findByIdAndRemove(req.params.id)

  if (!movies) return res.status(404).send("Genre not found")

  res.send(movies)
})

module.exports = router;