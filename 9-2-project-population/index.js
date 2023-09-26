const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup")
const dbDebugger = require("debug")("app:db")


//  middlewares
const log = require("./middleware/logger");
const authentication = require("./middleware/authentication");

//  routes
const home = require("./routes/home")
const genres = require("./routes/Genre")
const movies = require("./routes/Movie")

mongoose.connect("mongodb://localhost:27017/project-population").then(() => {
  console.log("connected to courses")
}).catch(() => {
  console.log("not connected")
})

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());

if (app.get("env") === "development") {
  app.use(morgan("short"));
  startupDebugger("morgan enabled")
}

// Db work ...
dbDebugger("connected to database...")

app.use(log);
app.use(authentication);

// --------------------------- APIs

app.use("/", home)
app.use("/api/genres", genres)
app.use("/api/movies", movies)

const port = process.env.PORT || 3000;
app.listen(port, (socket) => {
  console.log(`listening to port ${port}`);
});
