import { Movie, validateMovie } from "../models/Movie";
import { Rental, validateRental } from "../models/Rentals";
import { Customers } from "../models/Customers";

const mongoose = require("mongoose");
const express = require("express");
const Joi = require("joi");

const router = express.Router();

// ----------------------------------  Get  --------------------------------------
router.get("/", async (req: any, res: any) => {
  try {
    const rentals = await Rental.find()
      .sort("-dateOut")

    res.send(rentals);
  } catch (e) {
    console.log("Error", e);
  }
});

router.get("/:id", async (req: any, res: any) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send("Movie not found");

  res.send(rental);
});

// ----------------------------------  Post  --------------------------------------
router.post("/", async (req: any, res: any) => {
  const { error } = validateRental(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const movie = await Movie.findById(req.body.movieId);
  const customer = await Customers.findById(req.body.customerId);

  console.log("movie", movie)
  console.log("customer", customer)

  try {
    let rental = new Rental({ ...req.body, movie, customer });
    rental = await rental.save();

    res.send(rental);
  } catch (e) {
    console.log("e", e)
  }
});

// ----------------------------------  Put  -----------------------------------------
router.put("/:id", async (req: any, res: any) => {
  const { error } = validateMovie(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const rental = await Rental.findByIdAndUpdate(
    req.params.id,
    { ...req.body },
    { new: true }
  );
  // const genre = await Genre.findById(req.params.id)
  if (!rental) return res.status(404).send("Movie not found");

  const result = await rental.save();
  res.send(result);
});

// ----------------------------------  Delete  -----------------------------------------
router.delete("/:id", async (req: any, res: any) => {
  const rental = await Rental.findByIdAndRemove(req.params.id);

  if (!rental) return res.status(404).send("Movie not found");

  res.send(rental);
});

module.exports = router;
export {};
