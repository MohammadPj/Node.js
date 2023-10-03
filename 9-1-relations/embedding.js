// unRelational database
// if you change an author from Author collection it will change author property of Course collection

const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/playground")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  bio: String,
  website: String,
});

const courseSchema = new mongoose.Schema({
  name: String,
  authors: {
    type: [authorSchema],
    required: true,
  },
});

const Author = mongoose.model("Author", authorSchema);
const Course = mongoose.model("Course", courseSchema);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

const updateAuthor = async (courseId) => {
  const course = await Course.findByIdAndUpdate(courseId, {
    $set: {
      // to set deep nested property without change any other
      "author.name": "Ali",
    },
    // $unset: { // to remove property
    //   'author': ""
    // }
  });

  // course.author.name = 'Mohammad Poorjamal'
  // await course.save()
};

const removeAuthor = async (courseId, authorId) => {
  const course = await Course.findById(courseId);
  const author = course.authors.id(authorId);
  author.remove();
  course.save();
};

const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId);

  course.authors.push(author);
  await course.save();
};

// createCourse("Node Course", [
//   new Author({name: 'Mohammad'}),
//   new Author({name: 'Mosh'})
// ]);

// updateAuthor('651bf54741796b7d63217316').then(r => {})

// addAuthor("63a60877902033956344050c", new Author({name: "Sahar"}))

// removeAuthor('63a60877902033956344050c', '63a6093faa25fe90f51dc914').then(r => {})
