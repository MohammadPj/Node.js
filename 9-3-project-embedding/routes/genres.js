const express = require("express");
const router = express.Router();
const { Genre, validateGenre } = require("../models/genre");

// ----------------------------------  Get  --------------------------------------
router.get("/", async (req, res) => {
  try {
    const genres = await Genre.find();

    if (!genres) return res.status(404).send("genre not found");

    res.send(genres);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get("/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const genre = await Genre.findById(id);

    if (!genre) return res.status(404).send("genres not found");

    res.send(genre);
  } catch (e) {
    res.status(404).send(`The item with the given ID was not found!!! `);
  }
});

// ----------------------------------  Post  --------------------------------------
router.post("/", async (req, res) => {
  const { body } = req;

  //  Validate
  const { error } = validateGenre(body);
  if (error) return res.status(400).send(error.details[0].message);

  //  Create new document in Model database
  let genre = new Genre({
    ...req.body,
  });

  try {
    genre = await genre.save();

    res.send(genre);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// ----------------------------------  Put  -----------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genres = await Genre.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  // const genre = await Genre.findById(req.params.id)
  if (!genres) return res.status(404).send("Genre not found");

  const result = await genres.save();
  res.send(result);
});

// ----------------------------------  Delete  -----------------------------------------
router.delete("/:id", async (req, res) => {
  const genres = await Genre.findByIdAndRemove(req.params.id);

  if (!genres) return res.status(404).send("Genre not found");

  res.send(genres);
});

module.exports = router;
