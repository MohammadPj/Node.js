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
  return Course.find({ isPublished: true })
    .or([{ name: /.*by.*/ }, { price: { $gte: 15 } }])
    .select("name author price");
};

const updateCourse = async (id) => {
  //  Approach: Update first
  //  Update directly
  //  Optionally: get the updated document
  //  use when we haven't any validation


  // const result = await Course.update({_id: id}, {
  //   $set: {author: "Mosh"}
  // })

  const course = await Course.findByIdAndUpdate(
    id,
    {
      $set: { author: "Mosh" },
    },
    // to give new result
    { new: true }
  );

  console.log("course", course);
};

const run = async () => {
  const courses = await getCourses();
  console.log("courses", courses);
};
// run();

updateCourse("639dd47d2515456f93ab2885");
