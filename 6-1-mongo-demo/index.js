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
  const courses = await Course.find({
    isPublished: true,
  })
    .limit(10)
    .sort({ name: 1 })
    .select({name: 1, tags: 1})
    .then();
  console.log("courses", courses);
};

getCourses();
