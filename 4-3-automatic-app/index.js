const config = require("config")
const express = require("express");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup")
const dbDebugger = require("debug")("app:db")

//  middlewares
const log = require("./middleware/logger");
const authentication = require("./middleware/authentication");
const Creator = require("./utils/creator");

//  routes
const genres = require("./routes/genres")
const home = require("./routes/home")

const app = express();

//  use pg
app.set('view engine', 'pug')
//  optional
app.set('views', './views')  // default

app.use(express.json());
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public"));
app.use(helmet());

console.log('password', config.get('hiddenMessage')) // inside hiddenMessage in config is name of env property (my_message)
console.log('name', config.get('name')) // first name property in config folder

if (app.get("env") === "development") {
  app.use(morgan("short"));
  startupDebugger("morgan enabled")
}

// Db work ...
dbDebugger("connected to database...")

app.use(log);
app.use(authentication);

// --------------------------- APIs
app.use("/api/genres", genres) // any api with (/api/genres) route should use genres router
app.use("/", home)

const port = process.env.PORT || 3000;
app.listen(port, (socket) => {
  console.log(`listening to port ${port}`);
});
