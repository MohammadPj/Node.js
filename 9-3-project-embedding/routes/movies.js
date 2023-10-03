const express = require("express");
const router = express.Router();
const { Movie, validateMovie } = require("../models/movie");
const { Genre } = require("../models/genre");

// ----------------------------------  Get  --------------------------------------
router.get("/", async (req, res) => {
  try {
    const movies = await Movie.find(
      {},
      { title: 1, _id: 0, genre: { name: 1 } }
    );

    if (!movies) return res.status(404).send("movie not found");

    res.send(movies);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const movie = await Movie.findById(id);

    if (!movie) return res.status(404).send("movies not found");

    res.send(movie);
  } catch (e) {
    res.status(404).send(`The item with the given ID was not found!!! `);
  }
});

// ----------------------------------  Post  --------------------------------------
router.post("/", async (req, res) => {
  const { body } = req;

  //  Validate
  const { error } = validateMovie(body);
  if (error) return res.status(400).send(error.details[0].message);

  let genre = undefined

  try {
  genre = await Genre.findById(req.body.genreId)
  } catch (e) {
    return res.status(404).send(e.message);
  }

  //  Create new document in Model database
  let movie = new Movie({
    ...req.body,
    genre: new Genre({ _id: genre._id, name: genre.name }),
  });

  try {
    movie = await movie.save();

    res.send(movie);
  } catch (e) {
    res.status(500).send(e.message);
  }

});

// ----------------------------------  Put  -----------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const movies = await Movie.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  // const genre = await Genre.findById(req.params.id)
  if (!movies) return res.status(404).send("Genre not found");

  const result = await movies.save();
  res.send(result);
});

// ----------------------------------  Delete  -----------------------------------------
router.delete("/:id", async (req, res) => {
  const movies = await Movie.findByIdAndRemove(req.params.id);

  if (!movies) return res.status(404).send("Genre not found");

  res.send(movies);
});

module.exports = router;
