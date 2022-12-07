const config = require("config")
const express = require("express");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");

const log = require("./middleware/logger");
const authentication = require("./middleware/authentication");
const Creator = require("./creator");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());

console.log("Application name: ", config.get("name"))
console.log("mail server: ", config.get("mail.host"))
console.log("password: ", config.get("mail.password"))

if (app.get("env") === "development") {
  app.use(morgan("short"));
}

app.use(log);
app.use(authentication);

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

const genreAPIs = new Creator(app, genres);
genreAPIs.run("genres", validateGenre);

const port = process.env.PORT || 3000;
app.listen(port, (socket) => {
  console.log(`listening to port ${port}`);
});
