const express = require('express')
const router = express.Router()
const {Genre, validateGenre} = require("../models/genre")

// -----------------------------------------  Get ------------------------------------------------
router.get(`/`, async (req, res) => {
  try {
    const collection = await Genre.find();
    res.send(collection);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

router.get(`/:id`, async (req, res) => {
  const id = req.params.id;

  try {
    const document = await Genre.findById(id);
    res.send(document);
  } catch (e) {
    res.status(404).send(`The item with the given ID was not found!!! `);
  }
});

// -----------------------------------------  Post ------------------------------------------------
router.post(`/`, async (req, res) => {
  const { body } = req;

  //  Validate
  if (validateGenre) {
    const { error } = validateGenre(body);
    if (error) return res.status(400).send(error.details[0].message);
  }

  //  Create new document in Model database
  const document = new Genre(body);

  try {
    await document.save();
    res.send(document);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// -----------------------------------------  Put ------------------------------------------------

router.put(`/:id`, async (req, res) => {
  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  try {
    const document = await Genre.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    );

    res.send(document);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// -----------------------------------------  Delete ------------------------------------------------
router.delete(`/:id`, async (req, res) => {
  try {
    const genre = await Genre.findByIdAndRemove(req.params.id);
    res.send(genre);
  } catch (e) {
    res.status(500).send(e.message);
  }
});

module.exports = router