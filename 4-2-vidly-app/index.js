const express = require("express");
const Joi = require("joi");

const app = express();
app.use(express.json())

const genres = [
  { id: 1, genre: "horror" },
  { id: 2, genre: "comedy" },
  { id: 3, genre: "action" },
];

const validateGenre = (genre) => {
  const schema = Joi.object({
    genre: Joi.string().required().min(3),
  });
  return schema.validate(genre);
};

// ----------------------------------  Get  --------------------------------------
app.get("/api/genres", (req, res) => {
  res.send(genres);
});

app.get("/api/genres/:id", (req, res) => {
  const genre = genres.find((g) => g.id === +req.params.id);

  if (!genre) return res.status(404).send("genre not found");

  res.send(genre);
});

// ----------------------------------  Post  --------------------------------------
app.post("/api/genres", (req, res) => {
  const { value, error } = validateGenre(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  res.send(genre);
});

// ----------------------------------  Put  -----------------------------------------
app.put("/api/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === +req.params.id)
  if (!genre) return res.status(404).send("Genre not found")

  const { error } = validateGenre(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  genre.genre = req.body.genre
  res.send(genre)
})

// ----------------------------------  Delete  -----------------------------------------
app.delete("/api/genres/:id", (req, res) => {
  const genre = genres.find(g => g.id === +req.params.id)
  if (!genre) return res.status(404).send("Genre not found")

  const index = genres.findIndex(g => g.id === +req.params.id)
  genres.splice(index, 1)
  res.send(genre)
})

const port = process.env.PORT || 3000;
app.listen(port, (socket) => {
  console.log(`listening to port ${port}`);
});
