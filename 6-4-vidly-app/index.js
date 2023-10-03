const express = require("express");
const helmet = require("helmet"); // security
const morgan = require("morgan"); // log in every request
const mongoose = require("mongoose")

const app = new express();

// --------------------------------------------  Database --------------------------------
mongoose
  .connect("mongodb://127.0.0.1:27017/vidly")
  .then(() => {
    console.log("connected to test-project");
  })
  .catch(() => {
    console.log("not connected");
  });

// --------------------------------------------  Routes --------------------------------
const genres = require("./routes/genres");
const customers = require("./routes/customers");

// --------------------------------------------  Third-party middleware --------------------------------
app.use(express.json()); // parse req.body from json to object
app.use(express.urlencoded({ extended: true })); //key=value&key=value
app.use(express.static("public")); // serve static files in public folder
app.use(helmet()); // secure application by set varios header in request

// -------------------------------------------- debugg  --------------------------------
if (app.get("env") === "development") {
  app.use(morgan("short")); // log per request
}

// -------------------------------------------- APIs  --------------------------------
app.use("/api/genres", genres); // any api with (/api/genres) route should use genres router
app.use("/api/customers", customers); // any api with (/api/genres) route should use genres router

const port = process.env.PORT || 4000; // get port from environment or set it to 4000
app.listen(port, (socket) => {
  console.log(`listening to port ${port}`);
});
