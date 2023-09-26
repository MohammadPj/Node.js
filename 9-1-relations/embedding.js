const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/embed-relation")
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

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: {
      type: [authorSchema],
      required: true,
    },
  })
);

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

async function updateAuthor(courseId) {
  // const course = await Course.findById(courseId)
  //
  // course.author.name = "Mosh Hamedani"
  // course.save()

  // update
  // const course = await Course.updateOne({_id: courseId}, {
  //   $set: {
  //     'author.name': 'Mohammad'
  //   }
  // })

  // delete
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $unset: {
        author: "",
      },
    }
  );
}

const removeAuthor = async (courseId, authorId) => {
  const course = await Course.findById(courseId)
  const author = course.authors.id(authorId)
  author.remove()
  course.save()
}

const addAuthor = async (courseId, author) => {
  const course = await Course.findById(courseId)

  course.authors.push(author)
  await course.save()
}

// addAuthor("63a60877902033956344050c", new Author({name: "Sahar"}))

removeAuthor('63a60877902033956344050c', '63a6093faa25fe90f51dc914').then(r => {})

// createCourse("Node Course", [new Author({ name: "Mosh" }), new Author({name: "Mohammad"})]);

// updateAuthor('63a5fa2214a783a7d31ce6bf').then(r => {})
