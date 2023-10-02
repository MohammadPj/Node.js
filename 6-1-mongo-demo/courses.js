const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://localhost:27017/exercise")
  .then(() => {
    console.log("connected to mongodb");
  })
  .catch(() => {
    console.log("not connected");
  });

const courseSchema = new mongoose.Schema({
  name: { type: String, minLength: 5, maxLength: 255, required: true },
  category: {
    type: String,
    enum: ["mobile", "web", "network"],
    required: true,
    // convert to lowercase
    lowercase: true,
    // uppercase: true
    trim: true
  },
  author: String,
  tags: {
    type: Array,
    validate: {
      validator: (v) => v && v.length > 1,
      message: "A course should have at least one tag",
    },
  },
  date: { type: Date, default: new Date() },
  price: {
    type: Number,
    required: function () {
      return this.isPublished;
    },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  },
  isPublished: Boolean,
});

const Course = mongoose.model("course", courseSchema);

const createCourse = async () => {
  const course = new Course({
    name: "course new 2",
    category: "Web",
    author: "Mohammad",
    tags: ["web", "learn"],
    price: 15.123,
    isPublished: true,
  });

  try {
    // const result = await course.save();
    await course.save();
    console.log("result", course);
  } catch (e) {
    for(field in e.errors) {
      console.log("error", e.errors[field].message)
    }
  }
};

const getCourses = async () => {
  return Course.findById("63a0d15d109c3599d2c535d4")
};

const updateCourse = async (id) => {
  //  Approach: Query first
  //  find by id
  //  Modify its properties
  //  save

  //  Approach: Update first
  //  Update directly
  //  Optionally: get the updated document

  const course = await Course.findById(id);
  if (!course) return;

  // course.isPublished = true
  // course.author = 'Another Author'

  course.set({
    isPublished: true,
    author: "Mohammad",
  });

  const result = await course.save();
  console.log(result);
};

const run = async () => {
  const courses = await getCourses();
  console.log("courses", courses);
};
// createCourse();

run();

// updateCourse("5a68fdc3615eda645bc6bdec")
