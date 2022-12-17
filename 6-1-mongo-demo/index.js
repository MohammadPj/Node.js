const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost/playground")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch((err) => {
    console.log("could not connect to mongodb...");
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now() },
  isPublished: Boolean,
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
  const course = new Course({
    name: "Angular js Course",
    author: "Mohammad",
    tags: ["Angular", "Front end"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

const getCourses = async () => {

  const pageNumber = 1
  const pageSize = 20

  const courses = await Course
    .find()
    .skip((pageNumber - 1) * pageSize)
    .limit(pageSize)
    .sort({ name: 1 })
    .count()
    .then();
  console.log("courses", courses);
};

getCourses();
