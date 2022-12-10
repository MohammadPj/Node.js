const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground").then(() => {
  console.log("connected to mongodb");
}).catch(err => {
  console.log("could not connect to mongodb...")
})
