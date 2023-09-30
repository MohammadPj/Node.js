const config = require("config") // define config settings in config folder
const express = require("express");
const Joi = require("joi");
const helmet = require("helmet");
const morgan = require("morgan");
const startupDebugger = require("debug")("app:startup") // to modularize and beautify debug
const dbDebugger = require("debug")("app:db")

// --------------------------------------------  Middlewares --------------------------------
const logger = require("./middleware/logger");
const authentication = require("./middleware/authentication");
const Creator = require("./utils/creator");

// --------------------------------------------  Routes --------------------------------
const genres = require("./routes/genres")
const home = require("./routes/home")

const app = express();

// -------------------------------------------- Pug --------------------------------
app.set('view engine', 'pug')
app.set('views', './views')  // default

// --------------------------------------------  Third-party middleware --------------------------------
app.use(express.json()); // parse req.body from json to object
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public")); // serve static files in public folder
app.use(helmet()); // secure application by set varios header in request

// -------------------------------------------- Custom middlewares --------------------------------
app.use(logger);
app.use(authentication);

// -------------------------------------------- debugg  --------------------------------
if (app.get("env") === "development") {
  app.use(morgan("short")); // log per request
  startupDebugger("morgan enabled")
}
dbDebugger("connected to database...")

// -------------------------------------------- Configuration  --------------------------------
console.log('Application Name: ' + config.get('name'));
console.log('Mail Server: ' + config.get('mail'));

// --------------------------- APIs
app.use("/api/genres", genres)
app.use("/", home)

const port = process.env.PORT || 4000;
app.listen(port, (socket) => {
  console.log(`listening to port ${port}`);
});
