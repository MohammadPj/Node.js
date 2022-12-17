const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/exercise")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log("not connected");
  });

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: new Date() },
  price: Number,
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "Vue with Mohammad",
    author: "Mohammad",
    tags: ["Mohammad", "vue"],
    price: 120,
    isPublished: true,
  });

  const result = await course.save();
  console.log("result", course);
};

const getCourses = async () => {
  return Course.find({isPublished: true, tags: {$in: ["backend", "frontend"]}})
    .sort('-price')
    .select('name author price');
};

const run = async () => {
  const courses = await getCourses()
  console.log("courses", courses)
}
run()
