const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/exercises")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch(() => {
    console.log("mongoose connection fail");
  });

// document validation for integrate with mongo
const coursesSchema = new mongoose.Schema({
  tags: {
    type: [String],
    validate: { // custom validator
      validator(v) {
        return  v.length > 0 // tags should have at least one item
      },
      message: 'course should have at least one tag'
    }
  },
  date: Date,
  name: { type: String, required: true, minLength: 3, maxLength: 24 }, // name is required with minLength 3 and maxLength 24
  author: String,
  category: {
    type: String,
    enum: ["web", "mobile"], // category most be web or mobile
  },
  isPublished: Boolean,
  price: {
    type: Number,
    required() {
      return this.isPublished;
    }, // make price required if course is published
  },
});

const Course = new mongoose.model("Course", coursesSchema);

const createCourse = async () => {
  const course = new Course({
    name: "learn js",
    date: new Date(),
    author: "Mohammad",
    isPublished: true,
    category: "web",
  });

  try {
    await course.validate(); // just validate course
    console.log("validation pass");
    // await course.save() // validate and create course
  } catch (e) {
    console.log("e", e.message);
  }
};

createCourse();
