const mongoose = require("mongoose");

// import data from json file to mongodb ** but it didn't work
// mongoimport --db mongo-exercises --collection courses --file exercise-data.json --jsonArray

mongoose.set("strictQuery", false);
mongoose
  .connect("mongodb://127.0.0.1:27017/exercises")
  .then(() => {
    console.log("mongoose connected");
  })
  .catch(() => {
    console.log("mongoose connection fail");
  });

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: Date,
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

const getCourses1 = async () => {
  return Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 })
    .select("name tags author");
};

const getCourses2 = async () => {
  return (
    Course.find({ isPublished: true, tags: { $in: ["frontend", "backend"] } }) // tags have backend or frontend item
      //.or([{tags: 'frontend'}, {tags: 'backend'}]) // tags have backend or frontend item
      .sort("-price") // sort by price descending order
      .select("name author")
  ); // get only name and author
};

const getCourses3 = async () => {
  return Course.find()
    .or([{ published: true, price: { $gte: 15 } }, { name: /.*by.*/i }]) // get published and expensive than 15$ or have word ((by)) in its name
    .select("name price");
};


const updateCourse1 = async (courseId) => {
  const course = await Course.findById(courseId);

  if (!course) return;

  course.isPublished = !course.isPublished;

  return course.save();
};

const updateCourse2 = async (id) => {
  // update with mongodb update operator
  return (
    Course
      //.update({isPublished: false}) // update all courses that isPublished: false
      //.update({ _id: id }, { $set: { author: "sss", isPublished: false } }); // update course with given id
      .findByIdAndUpdate(
        { _id: id }, // find course with given id
        { $set: { author: "Mosh", isPublished: false } }, // update author and isPublished property
        { new: true } // get updated document -- default is original document
      )
  );
};

const removeCourse = async (id) => {
  const course = await Course
    //.deleteOne({isPublished: true}) // find first course with isPublished: true and delete it without return
    //.deleteMany({isPublished: true}) // find courses with isPublished: true and delete it without return
    //.deleteOne({_id: id}) // delete course with given id
    .findOneAndDelete(id)   // find course with given id and delete it and return deleted course
}

const run = async () => {
  const course = await removeCourse("6519d2298f5b1038dfbea9dd");
  console.log("course =>", course);
};

run();
