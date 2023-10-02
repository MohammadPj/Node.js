const express = require('express')
const mongoose = require("mongoose")
const Joi = require("joi");
const router = express.Router()

mongoose.connect("mongodb://localhost:27017/genres").then(() => {
  console.log("connected to courses")
}).catch(() => {
  console.log("not connected")
})

const genreSchema = new mongoose.Schema({
  name: {type: String, minLength: 3, maxLength: 25}
})

const Genre = mongoose.model("genre", genreSchema)

const validateGenre = (genre) => {
  const schema = Joi.object({
    name: Joi.string().required().min(3),
  });
  return schema.validate(genre);
};

// ----------------------------------  Get  --------------------------------------
router.get("/", async (req, res) => {
  const genres = await Genre.find({})
  res.send(genres);
});

router.get("/:id",  async (req, res) => {
  const genre = await Genre.findById(req.params.id)

  if (!genre) return res.status(404).send("genre not found");

  res.send(genre);
});

// ----------------------------------  Post  --------------------------------------
router.post("/", async (req, res) => {
  const { value, error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let genre = new Genre({name: req.body.name})
  genre = await genre.save()

  res.send(genre);
});

// ----------------------------------  Put  -----------------------------------------
router.put("/:id", async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id, {name: req.body.name}, {new: true})
  // const genre = await Genre.findById(req.params.id)
  if (!genre) return res.status(404).send("Genre not found")

  const result = await genre.save()
  res.send(result)
})

// ----------------------------------  Delete  -----------------------------------------
router.delete("/:id", async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id)

  if (!genre) return res.status(404).send("Genre not found")

  res.send(genre)
})

module.exports = router;