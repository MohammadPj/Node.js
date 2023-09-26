const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

const Movie = mongoose.model(
  "Movie",
  new mongoose.Schema({
    title: { type: String, required: true, minLength: 3 },
    numberInStock: { type: Number },
    dailyRentalRate: Number,
    genre: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Genre",
    },
  })
);

const validateMovie = (movie) => {
  const schema = Joi.object({
    title: Joi.string().required().min(3),
    numberInStock: Joi.number(),
    dailyRentalRate: Joi.number(),
    genreId: Joi.string().required(),
  });
  return schema.validate(movie);
};

// ----------------------------------  Get  --------------------------------------
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find().populate("genre" , 'name -_id');
    res.send(movies);
  } catch (e) {
    console.log("Error",e);
  }
});

router.get("/:id", async (req, res) => {
  const movie = await Movie.findById(req.params.id);

  if (!movie) return res.status(404).send("Movie not found");

  res.send(movie);
});

// ----------------------------------  Post  --------------------------------------
router.post("/", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let movie = new Movie({ ...req.body, genre: req.body.genreId });

  movie = await movie.save();

  res.send(movie);
});

// ----------------------------------  Put  -----------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movie = await Movie.findByIdAndUpdate(
    req.params.id,
    { ...req.body, genre: req.body.genreId },
    { new: true }
  );
  // const genre = await Genre.findById(req.params.id)
  if (!movie) return res.status(404).send("Movie not found");

  const result = await movie.save();
  res.send(result);
});

// ----------------------------------  Delete  -----------------------------------------
router.delete("/:id", async (req, res) => {
  const genre = await Movie.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send("Movie not found");

  res.send(genre);
});

module.exports = router;
