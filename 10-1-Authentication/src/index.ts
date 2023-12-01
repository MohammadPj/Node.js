const config = require('config')
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup")
const dbDebugger = require("debug")("app:db")

//  routes
const genres = require("./routes/Genre")
const movies = require("./routes/Movie")
const customers = require("./routes/Customers")
const rentals = require("./routes/rentals")
const users = require("./routes/users")
const auth = require("./routes/auth")

mongoose.connect("mongodb://127.0.0.1:27017/rental-project").then(() => {
  console.log("connected to courses")
}).catch(() => {
  console.log("not connected")
})

const app = express();

if(!config.get('jwtPrivateKey')) {
  console.error('FATAL ERROR: jwtPrivateKey is not defined')
  process.exit(1)
}

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

// --------------------------- APIs

app.use("/api/genres", genres)
app.use("/api/movies", movies)
app.use("/api/customers", customers)
app.use("/api/rentals", rentals)
app.use("/api/users", users)
app.use("/api/auth", auth)

const port = process.env.PORT || 4000;
app.listen(port, (socket: any) => {
  console.log(`listening to port ${port}`);
});

export {}