const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost/playground").then(() => {
  console.log("connected to mongodb");
}).catch(err => {
  console.log("could not connect to mongodb...")
})

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: {type: Date, default: Date.now()},
  isPublished: Boolean
})