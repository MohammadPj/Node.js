const express = require('express')
const Joi = require("joi");
const router = express.Router()
const mongoose = require("mongoose")
const {genreSchema, Genre} = require("./genres");

mongoose.connect("mongodb://localhost:27017/vidly").then(() => {
  console.log("connected to courses")
}).catch(() => {
  console.log("not connected")
})

const Movie = mongoose.model("movie", new mongoose.Schema({
  title: String,
  numberInStock: Number,
  dailyRentalRate: Number,
  genre: genreSchema
}))

const validateGenre = (movie) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
    genre: Joi.object({
      name: Joi.string().required()
    })
  });
  return schema.validate(movie);
};

// ----------------------------------  Get  --------------------------------------
router.get("/", async (req, res) => {
  const movies = await Movie.find({}, {'title': 1, '_id': 0, 'genre': {'name': 1}})

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
  const { value, error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({...req.body, genre: new Genre({...req.body.genre})})
  movie = await movie.save()

  res.send(movie);
});

// ----------------------------------  Put  -----------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
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